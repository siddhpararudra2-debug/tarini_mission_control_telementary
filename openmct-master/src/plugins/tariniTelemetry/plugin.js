import TariniObjectProvider from './TariniObjectProvider.js';
import TariniTelemetryProvider from './TariniTelemetryProvider.js';

export default function TariniTelemetryPlugin(options = {}) {
    let url = options.url;
    if (!url && typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        url = params.get('ws') || window.localStorage?.getItem('tarini_ws_url');
    }
    if (!url) {
        url = 'ws://localhost:8085/datalink';
    }

    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: 'tarini',
            key: 'root'
        });

        openmct.objects.addProvider('tarini', TariniObjectProvider());
        
        openmct.types.addType('tarini.telemetry', {
            name: 'Tarini Vessel',
            description: 'Telemetry from a Tarini Mission Control vessel',
            cssClass: 'icon-telemetry',
            creatable: true
        });

        openmct.telemetry.addProvider(TariniTelemetryProvider(url));
    };
}
