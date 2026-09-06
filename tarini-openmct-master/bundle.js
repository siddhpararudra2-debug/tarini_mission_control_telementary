define([
    "../../../platform/commonUI/formats/src/FormatProvider",
    "./src/TariniTimeFormat",
    './src/TariniTelemetryServerAdapter.js',
    './src/TariniTelemetryInitializer.js',
    './src/TariniTelemetryModelProvider.js',
    './src/TariniTelemetryProvider.js',
    'legacyRegistry'
], function (
    FormatProvider,
    TariniTimeFormat,
    TariniTelemetryServerAdapter,
    TariniTelemetryInitializer,
    TariniTelemetryModelProvider,
    TariniTelemetryProvider,
    legacyRegistry) {
    legacyRegistry.register("example/tarini", {
        "name": "Tarini Telemetry Adapter",
        "extensions": {
            "types": [
                {
                    "name": "Tarini Spacecraft",
                    "key": "tarini.spacecraft",
                    "cssclass": "icon-object"
                },
                {
                    "name": "Subsystem",
                    "key": "tarini.subsystem",
                    "cssclass": "icon-object",
                    "model": {"composition": []}
                },
                {
                    "name": "Measurement",
                    "key": "tarini.measurement",
                    "cssclass": "icon-telemetry-panel",
                    "model": {"telemetry": {}},
                    "telemetry": {
                        "source": "tarini.source",
                        "domains": [
                            {
                                "name": "Tarini Time",
                                "key": "timestamp",
                                "format": "tarini"
                            }
                        ]
                    }
                }
            ],
            "roots": [
                {
                    "id": "tarini:sc",
                    "priority": "preferred",
                    "model": {
                        "type": "tarini.spacecraft",
                        "name": "Tarini Spacecraft",
                        "composition": []
                    }
                }
            ],
            "services": [
                {
                    "key": "tarini.adapter",
                    "implementation": TariniTelemetryServerAdapter,
                    "depends": ["$q", "$http", "$interval", "KERBAL_HTTP_API_URL"]
                }
            ],
            "constants": [
                {
                    "key": "KERBAL_HTTP_API_URL",
                    "priority": "fallback",
                    "value": "/proxyUrl?url=" + encodeURIComponent("http://localhost:8085/tarini/datalink")
                },
                {
                    "key": "DEFAULT_TIME_FORMAT",
                    "value": "tarini"
                }
            ],
            "runs": [
                {
                    "implementation": TariniTelemetryInitializer,
                    "depends": ["tarini.adapter", "objectService"]
                }
            ],
            "components": [
                {
                    "provides": "modelService",
                    "type": "provider",
                    "implementation": TariniTelemetryModelProvider,
                    "depends": ["tarini.adapter", "$q"]
                },
                {
                    "provides": "telemetryService",
                    "type": "provider",
                    "implementation": TariniTelemetryProvider,
                    "depends": ["tarini.adapter", "$q"]
                },
                {
                    "provides": "formatService",
                    "type": "provider",
                    "implementation": FormatProvider,
                    "depends": [
                        "formats[]"
                    ]
                }
            ],
            "formats": [
                {
                    "key": "tarini",
                    "implementation": TariniTimeFormat
                }
            ]
        }
    });
});