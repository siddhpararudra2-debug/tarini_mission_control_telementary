import dictionary from './dictionary.js';

export default function TariniObjectProvider() {
    return {
        get: function (identifier) {
            if (identifier.key === 'root') {
                return Promise.resolve({
                    identifier: identifier,
                    name: 'Tarini Telemetry',
                    type: 'folder',
                    location: 'ROOT',
                    composition: [
                        { namespace: 'tarini', key: 'vessel' },
                        { namespace: 'tarini', key: 'dashboards' }
                    ]
                });
            }

            if (identifier.key === 'dashboards') {
                return Promise.resolve({
                    identifier: identifier,
                    name: 'Pre-configured Layouts',
                    type: 'folder',
                    location: 'tarini:root',
                    composition: [
                        { namespace: 'tarini', key: 'ascent_plot' },
                        { namespace: 'tarini', key: 'resources_plot' }
                    ]
                });
            }

            if (identifier.key === 'ascent_plot') {
                return Promise.resolve({
                    identifier: identifier,
                    name: 'Ascent Profile',
                    type: 'telemetry.plot.overlay',
                    location: 'tarini:dashboards',
                    composition: [
                        { namespace: 'tarini', key: 'vessel' }
                    ],
                    configuration: {
                        series: [
                            { identifier: { namespace: 'tarini', key: 'vessel' }, value: 'v.altitude' },
                            { identifier: { namespace: 'tarini', key: 'vessel' }, value: 'v.surfaceVelocity' }
                        ]
                    }
                });
            }

            if (identifier.key === 'resources_plot') {
                return Promise.resolve({
                    identifier: identifier,
                    name: 'Vessel Resources',
                    type: 'telemetry.plot.stacked',
                    location: 'tarini:dashboards',
                    composition: [
                        { namespace: 'tarini', key: 'vessel' }
                    ],
                    configuration: {
                        series: [
                            { identifier: { namespace: 'tarini', key: 'vessel' }, value: 'r.resource[LiquidFuel]' },
                            { identifier: { namespace: 'tarini', key: 'vessel' }, value: 'r.resource[Oxidizer]' },
                            { identifier: { namespace: 'tarini', key: 'vessel' }, value: 'r.resource[ElectricCharge]' }
                        ]
                    }
                });
            }

            if (identifier.key === 'vessel') {
                return Promise.resolve(dictionary);
            }

            return Promise.reject(new Error("Object not found: " + identifier.key));
        }
    };
}
