import KSPObjectProvider from './KSPObjectProvider.js';
import KSPTelemetryProvider from './KSPTelemetryProvider.js';

export default function KSPTelemetryPlugin(options = {}) {
    let url = options.url || 'ws://localhost:8085/datalink';

    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: 'ksp',
            key: 'root'
        });

        openmct.objects.addProvider('ksp', KSPObjectProvider());
        
        openmct.types.addType('ksp.telemetry', {
            name: 'KSP Vessel',
            description: 'Telemetry from a Kerbal Space Program vessel',
            cssClass: 'icon-telemetry',
            creatable: true
        });

        openmct.telemetry.addProvider(KSPTelemetryProvider(url));
    };
}
