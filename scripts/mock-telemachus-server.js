const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8085 });

console.log("Mock Telemachus WS server listening on ws://localhost:8085");
console.log("Waiting for Open MCT to connect...");

wss.on('connection', function connection(ws) {
  let interval;
  console.log("Client connected to mock Telemachus server.");

  // Simulation state: starting on the launchpad
  let state = {
      time: 0,
      altitude: 0,
      surfaceVelocity: 0,
      orbitalVelocity: 174, // Approximate surface rotation velocity at Kerbin equator
      apoapsis: 0,
      periapsis: -600000,
      period: 0,
      liquidFuel: 3000,
      oxidizer: 3666,
      electricCharge: 1000,
      eccentricity: 0,
      inclination: 0,
      dynamicPressure: 0,
      throttle: 100,
      monopropellant: 100,
      temperature: 20
  };

  ws.on('message', function message(data) {
    try {
        const msg = JSON.parse(data);
        if (msg['+']) {
            // Start broadcasting at the requested rate
            if (!interval) {
                interval = setInterval(() => {
                    // Update simulation (simple ascent profile)
                    state.time += 1;
                    
                    if (state.liquidFuel > 0) {
                        // Powered ascent
                        state.surfaceVelocity += 15; // Accelerating at 15 m/s^2
                        state.altitude += state.surfaceVelocity;
                        state.orbitalVelocity += 15;
                        state.apoapsis = state.altitude + (state.surfaceVelocity * 100); 
                        state.liquidFuel -= 10;
                        state.oxidizer -= 12.2;
                    } else {
                        // Coasting / falling
                        if (state.altitude > 0) {
                           state.surfaceVelocity -= 9.8; // Gravity
                           state.altitude += state.surfaceVelocity;
                        } else {
                           // Crashed / landed
                           state.altitude = 0;
                           state.surfaceVelocity = 0;
                        }
                    }

                    // Electric charge drains slowly
                    state.electricCharge = Math.max(0, state.electricCharge - 0.5);

                    if (state.liquidFuel <= 0) {
                        state.throttle = 0;
                        state.dynamicPressure = 0;
                        state.temperature = Math.max(-50, state.temperature - 1);
                    } else {
                        state.dynamicPressure = (state.surfaceVelocity * state.surfaceVelocity * Math.max(0, 1.2 - state.altitude / 10000) * 0.5) / 1000;
                        state.temperature = 20 + state.surfaceVelocity * 0.05;
                    }
                    state.monopropellant = Math.max(0, state.monopropellant - 0.05);
                    state.eccentricity = Math.min(1.0, state.apoapsis / 800000);

                    // Build payload mimicking Telemachus format
                    let payload = {
                        't.universalTime': Date.now() / 1000,
                        'v.altitude': Math.max(0, state.altitude),
                        'v.surfaceVelocity': Math.abs(state.surfaceVelocity),
                        'v.orbitalVelocity': state.orbitalVelocity,
                        'o.ApA': Math.max(0, state.apoapsis),
                        'o.PeA': state.periapsis,
                        'o.period': state.period,
                        'r.resource[LiquidFuel]': Math.max(0, state.liquidFuel),
                        'r.resource[Oxidizer]': Math.max(0, state.oxidizer),
                        'r.resource[ElectricCharge]': state.electricCharge,
                        'o.eccentricity': state.eccentricity,
                        'o.inclination': state.inclination,
                        'v.dynamicPressure': state.dynamicPressure,
                        'f.throttle': state.throttle,
                        'r.resource[MonoPropellant]': state.monopropellant,
                        's.sensor.temp': state.temperature
                    };
                    
                    // The WebSocket expects the data formatted as a JSON string
                    ws.send(JSON.stringify(payload));
                }, msg.rate || 1000);
            }
        } else if (msg['-']) {
            // Unsubscribe logic (mock implementation ignores this for simplicity)
        }
    } catch (e) {
        console.error("Invalid message format received:", data);
    }
  });

  ws.on('close', () => {
    console.log("Client disconnected.");
    clearInterval(interval);
    interval = null;
  });
});
