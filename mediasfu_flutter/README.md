# MediaSFU Flutter SpaceTek Final Application

This Flutter project builds upon **SpacesTek Initial**, evolving into a feature-complete MediaSFU-enabled application. The final iteration introduces advanced audio transmission, room management, and participant interaction functionalities. It serves as a modular and scalable foundation for audio-centric applications.

---

## Table of Contents

- [Overview](#overview)
- [From Initial to Final](#from-initial-to-final)
- [Key Features](#key-features)
- [Integration Steps](#integration-steps)
- [Key Components](#key-components)
- [Detailed Integration Steps](./Trans_Public.md)
- [Final Notes](#final-notes)

---

## Overview

This guide explains the transformation of SpacesTek Initial into SpacesTek Final by integrating **MediaSFU SDK**. It outlines key features, major enhancements, and the process of incorporating real-time audio media functionalities.

---

## From Initial to Final

The progression from **SpacesTek Initial** to **SpacesTek Final** includes:

1. **MediaSFU SDK Integration**:
   - Introduced the `mediasfu_sdk` package for seamless audio streaming and room management.

2. **Room Management Enhancements**:
   - Added dynamic room creation and participant controls.

3. **Audio Media Visuals**:
   - Integrated `AudioLevelBars` to represent participant audio levels in real-time.

4. **Backend Communication**:
   - Updated backend integration for actions like muting, removing, and banning participants.

5. **Enhanced State Management**:
   - Used `ValueNotifier` for efficient UI responsiveness and state synchronization with MediaSFU.

6. **Custom Audio Controls**:
   - Implemented audio toggle and participant management functionalities.

---

## Key Features

- **Audio Media Management**:
  - Real-time audio toggle and visualization using `AudioLevelBars`.
  - Dynamic participant control actions.

- **Advanced Backend Integration**:
  - Synchronization with backend states for robust room and participant management.

- **Alert and Error Handling**:
  - Incorporated real-time notifications and feedback for room events.

---

## Integration Steps

### Step 1: Install MediaSFU SDK

Install the `mediasfu_sdk` package for Flutter:

```bash
flutter pub add mediasfu_sdk
```

---

### Step 2: Create MediaSFUHandler

Develop the `MediaSFUHandler` to encapsulate MediaSFU logic. Example:

```dart
import 'package:flutter/material.dart';
import 'package:mediasfu_sdk/mediasfu_sdk.dart';

class MediaSFUHandler extends StatelessWidget {
  const MediaSFUHandler({super.key});

  @override
  Widget build(BuildContext context) {
    return MediasfuGeneric(
      options: MediasfuGenericOptions(
        credentials: Credentials(apiUserName: 'user', apiKey: 'key'),
        connectMediaSFU: true,
      ),
    );
  }
}
```

---

### Step 3: Enhance SpaceDetails Component

Incorporate MediaSFUHandler into `SpaceDetails` for room and participant management. Include `AudioLevelBars` for real-time visuals.

```dart
ValueListenableBuilder<double>(
  valueListenable: audioLevel,
  builder: (context, level, child) {
    return AudioLevelBars(audioLevel: level);
  },
);
```

Add custom methods for toggling audio and managing participants:

```dart
Future<void> toggleAudio() async {
  try {
    await toggleAudio(sourceParameters: mediasfuParams.value);
  } catch (e) {
    print("Error toggling audio: $e");
  }
}
```

---

### Step 4: Configure Backend Integration

Set up a backend server and update `api.dart` to enable server communication:

```dart
const SERVER_URL = 'http://localhost:3001';
const USE_SERVER = true;
```

---

### Step 5: Final Testing and Adjustments

Perform thorough testing for all features:

- **Audio Media Control**:
  - Toggle audio for local and remote participants.
  - Verify `AudioLevelBars` for real-time updates.

- **Participant Management**:
  - Test muting, removing, and banning actions.

- **Room State Synchronization**:
  - Confirm backend and UI state consistency.

---

## Key Components

### MediaSFUHandler
- Integrates with MediaSFU for room and audio management.

### AudioLevelBars
- Displays real-time participant audio levels.

### SpaceDetails
- Central component for room state updates and participant controls.

---

## Final Notes

This final iteration transforms SpacesTek Initial into a robust MediaSFU-enabled application. For further customization, such as screen sharing or video integration, extend the foundation provided here.

For detailed integration steps and examples, refer to the **[public transcript](./Trans_Public.md)**.

*Happy Coding with SpacesTek and MediaSFU! 🚀📱*
