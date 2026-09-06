# Kerbal Space Program Telemetry Integration

To set up this side-by-side workflow—where Kerbal Space Program runs in one window and your custom Open MCT instance runs locally in your web browser, updating live via a WebSocket bridge—follow these step-by-step instructions.

### 1. Install the Telemachus Mod in KSP
**Required for data bridge.**  
Download and install the Telemachus mod (compatible with your version of KSP) into your game's GameData folder. This mod embeds a lightweight server inside the game that exposes flight data over web protocols.

### 2. Launch KSP and Load a Flight
**Start your mission.**  
Boot up Kerbal Space Program and launch a vessel onto the launchpad or into flight. Once the flight scene loads, Telemachus automatically starts hosting a local data feed on port 8085.

### 3. Start Your Open MCT Local Server
**Terminal workflow.**  
Open your project directory in a terminal window where your custom plugin code is located, and boot up Open MCT:
```bash
npm start
```

### 4. Open the Dashboard in Your Browser
**http://localhost:8080**  
Open your web browser (Chrome, Firefox, etc.) and navigate to: http://localhost:8080. You will see your custom Open MCT mission control layout load up.

### 5. Arrange Windows Side-by-Side
**Visual setup.**  
Position your KSP game window on one half of your monitor (or secondary monitor) and your browser window running Open MCT right beside it. As you throttle up, pitch over, or stage in the game, the custom transport layer instantly streams the telemetry over WebSockets, updating your Open MCT charts in real time.

### 6. Build a Custom Dashboard
**1. Open the Display Layout:** In your Open MCT dashboard window, click on your "Unnamed Display Layout" item shown in the left tree menu or main viewport so that you are actively viewing/editing it.
*Verification: Make sure the blank grid canvas fills your central screen area.*

**2. Drag Parameters onto the Canvas:** Expand the Kerbal Space Program folder in the left sidebar tree to reveal all your telemetry parameters (Throttle, Altitude, ApA, etc.). Click and drag the parameters you want to see directly onto the gray display layout canvas.
*Verification: Check that the telemetry panels or readouts appear on the grid layout instead of an empty screen.*

---

### Developer Note: Mocking Data
If you are developing or designing dashboards and do not want to launch the full Kerbal Space Program game, you can run the included mock telemetry server. This server simulates a rocket launch and emits synthetic, physically plausible telemetry data in the exact format Open MCT expects.

To run it, open a terminal in the `scripts` directory and start the server:
```bash
node mock-telemachus-server.js
```
