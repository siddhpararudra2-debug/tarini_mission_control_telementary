const http = require('http');

const options = {
    hostname: 'localhost',
    port: 8085,
    path: '/telemachus/datalink?v.altitude=v.altitude&v.orbitalVelocity=v.orbitalVelocity&o.ApA=o.ApA&o.PeA=o.PeA',
    method: 'GET'
};

function poll() {
    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(`[${new Date().toISOString()}] Response:`, data);
        });
    });

    req.on('error', (e) => {
        console.error(`[${new Date().toISOString()}] Error:`, e.message);
    });

    req.end();
}

let count = 0;
console.log("Starting Telemachus REST probe...");
poll(); // Initial poll
const interval = setInterval(() => {
    count++;
    if (count >= 10) {
        clearInterval(interval);
        console.log("Finished 10 seconds of polling.");
    } else {
        poll();
    }
}, 1000);
