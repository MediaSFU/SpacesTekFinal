# MediaSFU React Native (CLI) SpaceTek Final Application

This **React Native CLI** project builds upon the **SpacesTek Initial** setup, culminating in a fully-featured MediaSFU-enabled application. This final version introduces advanced audio and video functionalities, participant management, and backend synchronization. By leveraging the MediaSFU SDK, SpacesTek Final ensures a robust, scalable communication solution.

---

## Table of Contents

1. [Overview](#overview)
2. [From Initial to Final](#from-initial-to-final)
3. [Key Features](#key-features)
4. [Integration Steps](#integration-steps)
5. [Key Components](#key-components)
6. [Important Notes](#important-notes)
7. [Detailed Integration Steps](../mediasfu_react_native_expo/Trans_Public.md)
8. [Final Notes](#final-notes)

---

## Overview

The **SpacesTek Final Application** demonstrates the integration of **MediaSFU React Native CLI SDK**, enabling real-time audio and video functionalities in a cross-platform environment. By building on the initial setup, this iteration provides features like dynamic room management, participant control, and audio/video visualization.

---

## From Initial to Final

The transition from **SpacesTek Initial** to **SpacesTek Final** includes the following major enhancements:

1. **MediaSFU SDK Integration**:
   - Utilized the `mediasfu-reactnative` package for seamless media handling.
   - Configured `MediaSFUHandler` to encapsulate MediaSFU logic.

2. **Dynamic Room Management**:
   - Enabled room creation and joining with server synchronization.

3. **Audio and Video Media Enhancements**:
   - Introduced `AudioLevelBars` for real-time audio visualization.
   - Added dynamic video toggling and camera switching features.

4. **Participant Management**:
   - Implemented host-level controls for muting, removing, and banning participants.

5. **Backend Synchronization**:
   - Integrated API endpoints for consistent room and participant data management.

6. **Error Handling and Alerts**:
   - Configured real-time alerts for system feedback and room updates.

> **Note**: React Native may encounter issues when building from long path names. To avoid potential errors, it's recommended to copy the `mediasfu_react_native` folder to a shorter directory (e.g., `C:/Projects/mediasfuNative` on Windows) before proceeding with setup and builds.
---

## Key Features

- **Audio and Video Controls**:
  - Mute/unmute functionality for participants.
  - Toggle video streams, switch cameras, and select devices.

- **Dynamic Room Management**:
  - Create or join rooms with customizable settings.

- **Participant Management**:
  - Host-level controls to manage participants effectively.

- **Backend Integration**:
  - Synchronized frontend and backend states for consistent room management.

---

## Integration Steps

### Step 1: Folder Setup

Due to potential path length issues in React Native CLI, it's recommended to rename your folder to a shorter name. For example:

```bash
mv mediasfu_react_native SpacesTekFinal
cd SpacesTekFinal
```

### Step 2: Install MediaSFU React Native CLI SDK

Install the `mediasfu-reactnative` package:

```bash
npm install mediasfu-reactnative
```

---

### Step 3: Implement MediaSFUHandler

Create a `MediaSFUHandler` component to encapsulate MediaSFU functionalities.

**File**: `src/components/MediaSFUHandler.tsx`

```tsx
import React from 'react';
import { MediasfuGeneric } from 'mediasfu-reactnative';

const MediaSFUHandler: React.FC = () => {
  return <MediasfuGeneric />;
};

export default MediaSFUHandler;
```

---

### Step 4: Enhance SpaceDetails Component

Integrate `MediaSFUHandler` into the `SpaceDetails` component for dynamic room management.

**File**: `src/screens/SpaceDetails.tsx`

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MediaSFUHandler from '../components/MediaSFUHandler';
import AudioLevelBars from '../components/AudioLevelBars';

const SpaceDetails: React.FC = () => {
  return (
    <View style={styles.container}>
      <MediaSFUHandler />
      <AudioLevelBars audioLevel={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default SpaceDetails;
```

---

### Step 5: Configure Backend Communication

Update the backend server and application configuration.

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm start
   ```

2. **Update `src/api/index.ts`** with the server URL:
   ```typescript
   const SERVER_URL = 'http://localhost:3001';
   const USE_SERVER = true;
   ```

---

### Step 6: Final Testing and Adjustments

1. **Test Audio and Video Controls**:
   - Join the room using multiple devices.
   - Toggle audio and video streams.
   - Test camera switching and video selection.

2. **Participant Management**:
   - Mute, remove, and ban participants as the host.

3. **Error Handling**:
   - Verify alerts for room and participant actions.

---

## Key Components

### MediaSFUHandler
Handles MediaSFU functionalities like room creation, joining, and media management.

### SpaceDetails
Manages room states, participant interactions, and audio/video controls.

### AudioLevelBars
Displays real-time audio levels for participant interactions.

### Backend Integration
Ensures synchronization between server and frontend for room and participant management.

---

## Important Notes

1. **Android Emulator and H264 Support**:
   - **Emulator Limitation**: Android emulators often have issues rendering H264 videos.
   - **Workaround**:
     - **Option 1**: Comment out H264 support in your MediaSFU server configuration for testing.
     - **Option 2**: Build and run the application on a physical device for H264 compatibility.

2. **Expo Transcript Reference**:
   - Aside from navigation (using **React Navigation**) and font management, the MediaSFU setup and features are identical to those in the Expo version.
   - For a detailed explanation, refer to the **[SpacesTek Expo Transcript](../mediasfu_react_native_expo/Trans_Public.md)**.

---

## Final Notes

This **SpacesTek Final Application** demonstrates the flexibility and scalability of MediaSFU within a React Native CLI environment. While this version focuses on audio and video media handling, further enhancements like virtual backgrounds, breakout rooms, and advanced analytics can be explored in future iterations.

For a detailed explanation of the integration steps and example implementations, refer to the **[Expo Transcript](../mediasfu_react_native_expo/Trans_Public.md)**.

*Happy coding with MediaSFU and SpacesTek! 🚀📱*