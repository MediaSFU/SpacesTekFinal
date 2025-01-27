# MediaSFU Angular SpaceTek Final Application

This **Angular** project builds upon the **SpacesTek Initial** setup, culminating in a fully-featured MediaSFU-enabled application. This final version introduces robust audio functionalities, dynamic room management, and host-level participant controls. By leveraging the **MediaSFU Angular SDK**, this setup ensures a scalable and seamless communication solution.

---

## Table of Contents

1. [Overview](#overview)
2. [From Initial to Final](#from-initial-to-final)
3. [Key Features](#key-features)
4. [Integration Steps](#integration-steps)
5. [Key Components](#key-components)
6. [Important Notes](#important-notes)
7. [Detailed Integration Steps](./Trans_Public.md)
8. [Final Notes](#final-notes)

---

## Overview

The **SpacesTek Final Application** demonstrates the integration of the **MediaSFU Angular SDK**, enabling real-time audio functionalities in a browser-based application. This iteration introduces dynamic room creation, real-time audio visualization, and host-level participant controls.

---

## From Initial to Final

The transition from **SpacesTek Initial** to **SpacesTek Final** includes the following major enhancements:

1. **MediaSFU SDK Integration**:
   - Utilized the `mediasfu-angular` package for seamless audio and participant management.
   - Configured `MediaSFUHandlerComponent` to encapsulate MediaSFU logic.

2. **Dynamic Room Management**:
   - Enabled room creation and joining with server synchronization.

3. **Audio Media Enhancements**:
   - Introduced `AudioLevelBarsComponent` for real-time audio visualization.
   - Added dynamic microphone toggling and participant control features.

4. **Participant Management**:
   - Implemented host-level controls for muting, removing, and banning participants.

5. **Backend Synchronization**:
   - Integrated API endpoints for consistent room and participant data management.

6. **Error Handling and Alerts**:
   - Configured real-time alerts for system feedback and room updates.

---

## Key Features

- **Audio Controls**:
  - Mute/unmute functionality for participants.
  - Visual representation of real-time audio levels.

- **Dynamic Room Management**:
  - Create or join rooms with customizable settings.

- **Participant Management**:
  - Host-level controls to manage participants effectively.

- **Backend Integration**:
  - Synchronized frontend and backend states for consistent room management.

---

## Integration Steps

### Step 1: Folder Setup

To avoid potential long path issues with Angular CLI, rename your project folder to a shorter name:

```bash
mv mediasfu_angular SpacesTekFinal
cd SpacesTekFinal
```

---

### Step 2: Install MediaSFU Angular SDK

Install the `mediasfu-angular` package:

```bash
npm install mediasfu-angular
```

---

### Step 3: Implement MediaSFUHandlerComponent

Create a `MediaSFUHandlerComponent` to encapsulate MediaSFU functionalities.

**File**: `src/app/components/media-sfu-handler/media-sfu-handler.component.ts`

```typescript
import { Component } from '@angular/core';
import { MediasfuGeneric } from 'mediasfu-angular';

@Component({
  selector: 'app-media-sfu-handler',
  templateUrl: './media-sfu-handler.component.html',
  standalone: true,
  imports: [MediasfuGeneric],
})
export class MediaSfuHandlerComponent {}
```

**File**: `src/app/components/media-sfu-handler/media-sfu-handler.component.html`

```html
<div style="width: 0%; height: 0%; overflow: hidden">
  <app-mediasfu-generic></app-mediasfu-generic>
</div>
```

---

### Step 4: Enhance SpaceDetailsComponent

Integrate `MediaSFUHandlerComponent` into the `SpaceDetailsComponent` for dynamic room management.

**File**: `src/app/components/space-details/space-details.component.ts`

```typescript
import { Component } from '@angular/core';
import { MediaSfuHandlerComponent } from '../media-sfu-handler/media-sfu-handler.component';

@Component({
  selector: 'app-space-details',
  templateUrl: './space-details.component.html',
  standalone: true,
  imports: [MediaSfuHandlerComponent],
})
export class SpaceDetailsComponent {}
```

**File**: `src/app/components/space-details/space-details.component.html`

```html
<div class="space-details-container">
  <app-media-sfu-handler></app-media-sfu-handler>
</div>
```

---

### Step 5: Configure Backend Communication

Update the backend server and application configuration.

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm start
   ```

2. **Update `src/app/services/api.service.ts`** with the server URL:
   ```typescript
   const SERVER_URL = 'http://localhost:3001';
   const USE_SERVER = true;
   ```

---

### Step 6: Final Testing and Adjustments

1. **Test Audio Controls**:
   - Toggle the microphone on/off for multiple participants.
   - Test audio level visualization using `AudioLevelBarsComponent`.

2. **Participant Management**:
   - Mute, remove, or ban participants as the host.

3. **Handle Alerts**:
   - Verify alerts for room and participant actions.

---

## Key Components

### MediaSfuHandlerComponent
Handles MediaSFU functionalities like room creation, joining, and audio management.

### SpaceDetailsComponent
Manages room states, participant interactions, and audio controls.

### AudioLevelBarsComponent
Displays real-time participant audio levels for better interaction visibility.

---

## Important Notes

1. **Cross-Browser Compatibility**:
   - Ensure compatibility with major browsers (Chrome, Firefox, Edge, Safari).

---

## Final Notes

This **SpacesTek Final Application** showcases the flexibility and scalability of MediaSFU within an Angular environment. While this version emphasizes audio functionalities, additional features like video integration, screen sharing, and custom UI components can be explored in future iterations.

For detailed integration steps and examples, refer to the **[public transcript](./Trans_Public.md)**.

*Happy coding with MediaSFU and SpacesTek! 🚀🌐*
