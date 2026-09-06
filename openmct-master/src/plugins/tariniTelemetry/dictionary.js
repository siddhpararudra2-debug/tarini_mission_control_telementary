export default {
    name: 'Tarini Vessel',
    identifier: {
        namespace: 'tarini',
        key: 'vessel'
    },
    type: 'tarini.telemetry',
    telemetry: {
        values: [
            {
                key: 'utc',
                source: 'timestamp',
                name: 'Timestamp',
                format: 'utc',
                hints: {
                    domain: 1
                }
            },
            {
                key: 'v.altitude',
                name: 'Altitude',
                units: 'm',
                format: 'number',
                hints: {
                    range: 1
                }
            },
            {
                key: 'v.surfaceVelocity',
                name: 'Surface Velocity',
                units: 'm/s',
                format: 'number',
                hints: {
                    range: 2
                }
            },
            {
                key: 'v.orbitalVelocity',
                name: 'Orbital Velocity',
                units: 'm/s',
                format: 'number',
                hints: {
                    range: 3
                }
            },
            {
                key: 'o.ApA',
                name: 'Apoapsis',
                units: 'm',
                format: 'number',
                hints: {
                    range: 4
                }
            },
            {
                key: 'o.PeA',
                name: 'Periapsis',
                units: 'm',
                format: 'number',
                hints: {
                    range: 5
                }
            },
            {
                key: 'o.period',
                name: 'Orbital Period',
                units: 's',
                format: 'number',
                hints: {
                    range: 6
                }
            },
            {
                key: 'r.resource[LiquidFuel]',
                name: 'Liquid Fuel',
                units: 'units',
                format: 'number',
                min: 0,
                hints: {
                    range: 7
                }
            },
            {
                key: 'r.resource[Oxidizer]',
                name: 'Oxidizer',
                units: 'units',
                format: 'number',
                min: 0,
                hints: {
                    range: 8
                }
            },
            {
                key: 'r.resource[ElectricCharge]',
                name: 'Electric Charge',
                units: 'units',
                format: 'number',
                min: 0,
                hints: {
                    range: 9
                }
            },
            {
                key: 'o.eccentricity',
                name: 'Eccentricity',
                units: '',
                format: 'number',
                hints: {
                    range: 10
                }
            },
            {
                key: 'o.inclination',
                name: 'Inclination',
                units: 'deg',
                format: 'number',
                hints: {
                    range: 11
                }
            },
            {
                key: 'v.dynamicPressure',
                name: 'Dynamic Pressure (Q)',
                units: 'kPa',
                format: 'number',
                hints: {
                    range: 12
                }
            },
            {
                key: 'f.throttle',
                name: 'Throttle',
                units: '%',
                format: 'number',
                hints: {
                    range: 13
                }
            },
            {
                key: 'r.resource[MonoPropellant]',
                name: 'MonoPropellant',
                units: 'units',
                format: 'number',
                min: 0,
                hints: {
                    range: 14
                }
            },
            {
                key: 's.sensor.temp',
                name: 'Temperature',
                units: '°C',
                format: 'number',
                hints: {
                    range: 15
                }
            }
        ]
    }
};
