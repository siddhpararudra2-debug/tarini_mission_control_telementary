export default class TariniTransport {
    constructor(url = 'ws://localhost:8085/datalink') {
        this.url = url;
        this.socket = null;
        this.subscriptions = new Set();
        this.listeners = new Map();
        this.reconnectTimeout = null;
        this.reconnectAttempts = 0;
        this.history = {};
        this.lastUniversalTime = 0;
        this.MAX_HISTORY_LENGTH = 3600; // 1 hour at 1 point/sec
    }

    connect() {
        if (this.socket) return;
        this.socket = new WebSocket(this.url);
        
        this.socket.onopen = () => {
            console.log("Tarini WebSocket connected");
            this.reconnectAttempts = 0;
            if (this.subscriptions.size > 0) {
                this._sendSubscription(Array.from(this.subscriptions));
            }
        };

        this.socket.onmessage = (event) => {
            try {
                let data = JSON.parse(event.data);
                // Extract timestamp from the universal time payload if available
                let timestamp = data['t.universalTime'] ? data['t.universalTime'] * 1000 : Date.now();
                
                // Detect time jumps (e.g. loading a quicksave or reverting flight)
                if (timestamp < this.lastUniversalTime - 5000) {
                    console.log("Time jump detected, clearing telemetry history.");
                    this.history = {};
                }
                this.lastUniversalTime = timestamp;
                
                for (let key in data) {
                    let val = data[key];
                    // Filter out invalid data (NaN, null, undefined)
                    if (val === null || val === undefined || (typeof val === 'number' && isNaN(val))) {
                        continue;
                    }

                    let point = {
                        utc: timestamp,
                        [key]: val
                    };

                    if (!this.history[key]) {
                        this.history[key] = [];
                    }
                    this.history[key].push(point);
                    
                    if (this.history[key].length > this.MAX_HISTORY_LENGTH) {
                        this.history[key].shift();
                    }

                    if (this.listeners.has(key)) {
                        this.listeners.get(key).forEach(cb => cb(point));
                    }
                }
            } catch(e) {
                console.error("Error parsing Tarini message", e);
            }
        };

        this.socket.onclose = () => {
            this.socket = null;
            let backoff = Math.min(30000, 1000 * Math.pow(2, this.reconnectAttempts));
            this.reconnectAttempts++;
            console.log(`Tarini WebSocket disconnected. Reconnecting in ${backoff/1000}s...`);
            this.reconnectTimeout = setTimeout(() => this.connect(), backoff);
        };

        this.socket.onerror = (err) => {
            console.error("Tarini WebSocket error:", err);
            // onclose will be triggered automatically
        };
    }

    _sendSubscription(keys) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                "+": keys,
                "rate": 1000
            }));
        }
    }

    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
            this.subscriptions.add(key);
            
            // Ensure universal time is always requested for accurate timestamps
            if (!this.subscriptions.has('t.universalTime')) {
                this.subscriptions.add('t.universalTime');
                this._sendSubscription(['t.universalTime']);
            }
            this._sendSubscription([key]);
        }
        this.listeners.get(key).add(callback);
        
        if (!this.socket) {
            this.connect();
        }

        return () => {
            this.listeners.get(key).delete(callback);
            if (this.listeners.get(key).size === 0) {
                this.listeners.delete(key);
                this.subscriptions.delete(key);
                if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(JSON.stringify({
                        "-": [key]
                    }));
                }
            }
        };
    }

    requestHistory(key, options) {
        if (!this.history[key]) {
            return Promise.resolve([]);
        }

        let filtered = this.history[key].filter(point => {
            return point.utc >= options.start && point.utc <= options.end;
        });

        return Promise.resolve(filtered);
    }
}
