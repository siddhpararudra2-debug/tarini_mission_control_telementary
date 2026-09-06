import dictionary from './dictionary.js';

export default function KSPObjectProvider() {
    return {
        get: function (identifier) {
            if (identifier.key === 'root') {
                return Promise.resolve({
                    identifier: identifier,
                    name: 'KSP Telemetry',
                    type: 'folder',
                    location: 'ROOT',
                    composition: [
                        { namespace: 'ksp', key: 'vessel' },
                        { namespace: 'ksp', key: 'dashboards' }
                    ]
                });
            }

            if (identifier.key === 'dashboards') {
                return Promise.resolve({
                    identifier: identifier,
                    name: 'Pre-configured Layouts',
                    type: 'folder',
                    location: 'ksp:root',
                    composition: [
                        { namespace: 'ksp', key: 'ascent_plot' },
                        { namespace: 'ksp', key: 'resources_plot' }
                    ]
                });
            }

            if (identifier.key === 'ascent_plot') {
                return Promise.resolve({
                    identifier: identifier,
                    name: 'Ascent Profile',
                    type: 'telemetry.plot.overlay',
                    location: 'ksp:dashboards',
                    composition: [
                        { namespace: 'ksp', key: 'vessel' }
                    ],
                    configuration: {
                        series: [
                            { identifier: { namespace: 'ksp', key: 'vessel' }, value: 'v.altitude' },
                            { identifier: { namespace: 'ksp', key: 'vessel' }, value: 'v.surfaceVelocity' }
                        ]
                    }
                });
            }

            if (identifier.key === 'resources_plot') {
                return Promise.resolve({
                    identifier: identifier,
                    name: 'Vessel Resources',
                    type: 'telemetry.plot.stacked',
                    location: 'ksp:dashboards',
                    composition: [
                        { namespace: 'ksp', key: 'vessel' }
                    ],
                    configuration: {
                        series: [
                            { identifier: { namespace: 'ksp', key: 'vessel' }, value: 'r.resource[LiquidFuel]' },
                            { identifier: { namespace: 'ksp', key: 'vessel' }, value: 'r.resource[Oxidizer]' },
                            { identifier: { namespace: 'ksp', key: 'vessel' }, value: 'r.resource[ElectricCharge]' }
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
