# Tarini Mission Control Telemetry 🚀

A real-time, comprehensive web-based mission control dashboard for Tarini Mission Control (Tarini), built on top of [NASA's Open MCT (Open Mission Control Technologies)](https://nasa.github.io/openmct/).

This project integrates Tarini Mission Control with Open MCT via a custom WebSocket transport layer, allowing you to stream live flight telemetry, visualize orbital mechanics, and scroll back in time to review past mission data—just like a real space agency.

---

## ✨ Features

- **Live Data Streaming**: Receives 1Hz updates for altitude, velocity, dynamic pressure, apoapsis, periapsis, and much more directly from the game engine.
- **Historical Replay**: Automatically buffers up to 1 hour of local flight data. Pause the dashboard and drag the timeline conductor back to analyze past events.
- **Pre-configured Mission Layouts**: Out-of-the-box dashboards including an **Ascent Profile** (overlaid altitude and velocity) and a **Vessel Resources** stacked chart (Fuel, Oxidizer, Electric Charge).
- **Robust Telemetry Engine**: Gracefully handles scene transitions, vessel switching, and quick-saves without crashing the dashboard.
- **Developer Mock Server**: Includes a NodeJS mock telemetry server that simulates physically plausible rocket launches, allowing you to design and test dashboards without needing to boot up Tarini.

---

## 📂 Project Structure

- `/openmct-master` - The core Open MCT application.
  - `src/plugins/tariniTelemetry` - The custom plugin logic that powers the Tarini integration.
    - `dictionary.js` - Defines the telemetry mappings and data types.
    - `TariniTransport.js` - Handles the WebSocket connection, data validation, and historical buffering.
    - `TariniObjectProvider.js` - Defines the folder structure and pre-configured layouts.
    - `TariniTelemetryProvider.js` - Feeds data requests and subscriptions into Open MCT.
- `/scripts` - Contains the mock backend servers for rapid UI development.

---

## 🚀 Getting Started

Follow these steps to run Tarini Mission Control in one window and your custom Open MCT instance locally in your web browser side-by-side.

### 1. Install the Tarini Mod in Tarini
Download and install the **Tarini** mod (compatible with your version of Tarini) into your game's `GameData` folder. This mod embeds a lightweight server inside the game that exposes flight data over web protocols.

### 2. Launch Tarini and Load a Flight
Boot up Tarini Mission Control and launch a vessel onto the launchpad or into flight. Once the flight scene loads, Tarini automatically starts hosting a local WebSocket data feed on port `8085`.

### 3. Start Your Open MCT Local Server
Open a terminal in the `openmct-master` directory and boot up the dashboard:
```bash
cd openmct-master
npm install
npm start
```

### 4. Open the Dashboard in Your Browser
Open your web browser (Chrome, Firefox, etc.) and navigate to: [http://localhost:8080](http://localhost:8080). You will see your custom Open MCT mission control layout load up.

### 5. Build a Custom Dashboard
You can use the pre-configured layouts in the **Dashboards** folder, or build your own:
1. **Open the Display Layout:** Click the `Create` button (+ icon) in the top right, select `Display Layout`, and save it.
2. **Drag Parameters onto the Canvas:** Expand the *Tarini Mission Control > Tarini Vessel* folder in the left sidebar tree. Click and drag the parameters you want to see directly onto the gray layout canvas.

---

## 🛠️ Developer Mode (No Game Required)

If you are developing or designing dashboards and do not want to launch the full Tarini Mission Control game, you can run the included mock telemetry server. This server simulates a rocket launch and emits synthetic, physically plausible telemetry data in the exact format Open MCT expects.

To run it, open a terminal in the `scripts` directory and start the server:
```bash
cd scripts
npm install ws
node mock-tarini-server.js
```
Then start the Open MCT server in a separate terminal as detailed in Step 3 above.

---

## 📄 License
This project extends NASA's Open MCT. Open MCT is released under the Apache 2.0 license. Please refer to the `/openmct-master/LICENSE.md` for more details.