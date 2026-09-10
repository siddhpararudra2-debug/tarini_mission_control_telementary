# Tarini Mission Control [![license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

Tarini Mission Control is a next-generation mission control framework for visualization of flight telemetry data on desktop and mobile devices.

> 🌐 **Live Web Dashboard:** [https://tarini-seven.vercel.app](https://tarini-seven.vercel.app)

---

## Building and Running Locally

Be sure you have [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) installed, then follow the directions below:

1. Install dependencies:
```sh
npm install
```

2. Run a local development server:
```sh
npm start
```

> [!IMPORTANT]
> The dashboard is now running, and can be accessed by pointing a web browser at [http://localhost:8080/](http://localhost:8080/)

---

## Architecture & Plugins

Tarini can be extended via plugins that make calls to the telemetry and view APIs:
- Telemetry table views
- Time conductor and historical playback
- Overlay plots and stacked charts
- Flexible and display layouts
- Custom WebSocket telemetry integrations

---

## Running Automated Tests

Our automated test coverage comes in the form of unit, e2e, and visual tests.

### Unit Tests
Unit Tests are run by Karma:
```sh
npm test
```

---

## License
Licensed under the Apache License, Version 2.0. See [LICENSE.md](./LICENSE.md) for details.
