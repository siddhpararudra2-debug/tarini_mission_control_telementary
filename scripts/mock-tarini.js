const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8085 });

wss.on('connection', function connection(ws) {
  let interval;
  console.log("Client connected!");
  
  ws.on('message', function message(data) {
    console.log("Received: %s", data);
    try {
        const msg = JSON.parse(data);
        if (msg['+']) {
            if (!interval) {
                interval = setInterval(() => {
                let payload = {
                    't.universalTime': Date.now() / 1000,
                    'v.altitude': 100000 + Math.random() * 1000,
                    'v.surfaceVelocity': 2000 + Math.random() * 10,
                    'v.orbitalVelocity': 2200 + Math.random() * 10,
                    'o.ApA': 200000,
                    'o.PeA': 80000,
                    'o.period': 1800,
                    'r.resource[LiquidFuel]': 1500 - (Math.floor(Date.now() / 1000) % 1500),
                    'r.resource[Oxidizer]': 1500 - (Math.floor(Date.now() / 1000) % 1500),
                    'r.resource[ElectricCharge]': 1000
                };
                ws.send(JSON.stringify(payload));
                }, msg.rate || 1000);
            }
        } else if (msg['-']) {
            // In a full implementation, we'd remove keys. For mock, we ignore for simplicity.
        }
    } catch (e) {
        console.error("Invalid message:", data);
    }
  });

  ws.on('close', () => {
    console.log("Client disconnected");
    clearInterval(interval);
    interval = null;
  });
});

console.log("Mock Tarini WS server listening on ws://localhost:8085");
