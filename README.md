# Tarini Mission Control Telemetry 🚀

[![Vercel](https://img.shields.io/badge/Vercel-Live%20Demo-black?logo=vercel&style=for-the-badge)](https://tarini-seven.vercel.app)
[![Tarini](https://img.shields.io/badge/Tarini-Mission%20Control-blue?style=for-the-badge)](https://tarini-seven.vercel.app)

> 🌐 **Live Web Dashboard:** [https://tarini-seven.vercel.app](https://tarini-seven.vercel.app)

A real-time, comprehensive web-based mission control dashboard for Tarini Mission Control (Tarini).

This project integrates Tarini Mission Control via a custom WebSocket transport layer, allowing you to stream live flight telemetry, visualize orbital mechanics, and scroll back in time to review past mission data.

---

## ✨ Features

- **Live Data Streaming**: Receives 1Hz updates for altitude, velocity, dynamic pressure, apoapsis, periapsis, and much more directly from the flight engine.
- **Historical Replay**: Automatically buffers up to 1 hour of local flight data. Pause the dashboard and drag the timeline conductor back to analyze past events.
- **Pre-configured Mission Layouts**: Out-of-the-box dashboards including an **Ascent Profile** (overlaid altitude and velocity) and a **Vessel Resources** stacked chart (Fuel, Oxidizer, Electric Charge).
- **Robust Telemetry Engine**: Gracefully handles scene transitions, vessel switching, and quick-saves without crashing the dashboard.
- **Developer Mock Server**: Includes a NodeJS mock telemetry server that simulates physically plausible rocket launches, allowing you to design and test dashboards without needing to boot up the flight simulator.

---

## 📂 Project Structure

- `/openmct-master` - The core Tarini mission control application.
  - `src/plugins/tariniTelemetry` - The custom plugin logic that powers the Tarini integration.
    - `dictionary.js` - Defines the telemetry mappings and data types.
    - `TariniTransport.js` - Handles the WebSocket connection, data validation, and historical buffering.
    - `TariniObjectProvider.js` - Defines the folder structure and pre-configured layouts.
    - `TariniTelemetryProvider.js` - Feeds data requests and subscriptions into the dashboard.
- `/scripts` - Contains the mock backend servers for rapid UI development.

---

## 🚀 Getting Started

Follow these steps to run Tarini Mission Control and your local dashboard side-by-side.

### 1. Install the Tarini Mod
Download and install the **Tarini** mod into your game/simulator's `GameData` folder. This mod embeds a lightweight server that exposes flight data over web protocols.

### 2. Launch Flight
Launch a vessel onto the launchpad or into flight. Once loaded, Tarini automatically starts hosting a local WebSocket data feed on port `8085`.

### 3. Start Your Local Server
Open a terminal in the `openmct-master` directory and boot up the dashboard:
```bash
cd openmct-master
npm install
npm start
```

### 4. Open the Dashboard in Your Browser
- **Live Vercel App**: [https://tarini-seven.vercel.app](https://tarini-seven.vercel.app) *(Tip: Append `?ws=wss://...` to connect to custom/tunneled telemetry endpoints)*
- **Local Dev Server**: [http://localhost:8080](http://localhost:8080) *(or port configured in webpack dev server)*

### 5. Build a Custom Dashboard
You can use the pre-configured layouts in the **Dashboards** folder, or build your own:
1. **Open the Display Layout:** Click the `Create` button (+ icon) in the top right, select `Display Layout`, and save it.
2. **Drag Parameters onto the Canvas:** Expand the *Tarini Mission Control > Tarini Vessel* folder in the left sidebar tree. Click and drag the parameters you want to see directly onto the layout canvas.

---

## 🛠️ Developer Mode (No Game Required)

If you are developing or designing dashboards and do not want to launch the full simulator, you can run the included mock telemetry server. This server simulates a rocket launch and emits synthetic, physically plausible telemetry data in the exact format Tarini expects.

To run it, open a terminal in the `scripts` directory and start the server:
```bash
cd scripts
npm install ws
node mock-tarini-server.js
```
Then start the dashboard server in a separate terminal as detailed in Step 3 above.

---

## 📄 License
Released under the Apache 2.0 license. Please refer to `/openmct-master/LICENSE.md` for more details.