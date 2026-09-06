import TelemachusTransport from './TelemachusTransport.js';

export default function KSPTelemetryProvider(url) {
    const transport = new TelemachusTransport(url);

    return {
        supportsSubscribe: function (domainObject) {
            return domainObject.type === 'ksp.telemetry';
        },
        subscribe: function (domainObject, callback) {
            let unsubscribes = [];
            
            // Fan out subscriptions for every telemetry value defined on this object
            domainObject.telemetry.values.forEach(val => {
                if (val.key !== 'utc') {
                    unsubscribes.push(transport.subscribe(val.key, callback));
                }
            });

            return function unsubscribe() {
                unsubscribes.forEach(fn => fn());
            };
        },
        supportsRequest: function (domainObject, options) {
            return domainObject.type === 'ksp.telemetry';
        },
        request: function (domainObject, options) {
            // Telemachus WebSocket doesn't support server-side historical requests,
            // so we query the client-side history buffer.
            let promises = [];
            
            domainObject.telemetry.values.forEach(val => {
                if (val.key !== 'utc') {
                    promises.push(transport.requestHistory(val.key, options));
                }
            });

            return Promise.all(promises).then(results => {
                // Flatten the array of arrays into a single array of points
                return [].concat(...results).sort((a, b) => a.utc - b.utc);
            });
        }
    };
}
