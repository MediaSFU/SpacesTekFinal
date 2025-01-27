# Integrating MediaSFU Flutter SDK into Your Project

Welcome to the comprehensive guide on integrating the MediaSFU Flutter SDK into your project. This tutorial will walk you through each step required to add MediaSFU functionalities, enabling audio media transmission within your Flutter application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Install the `mediasfu-flutter` Package](#step-1-install-the-mediasfu-flutter-package)
3. [Step 2: Create a MediaSFU Handler](#step-2-create-a-mediasfu-handler)
4. [Step 3: Test the MediaSFU Integration](#step-3-test-the-mediasfu-integration)
5. [Step 4: Configure MediaSFU for No-UI Usage](#step-4-configure-mediasfu-for-no-ui-usage)
6. [Step 5: Finalize the MediaSFU Integration](#step-5-finalize-the-mediasfu-integration)
7. [Step 6: Finalize Audio Media Transmission](#step-6-finalize-audio-media-transmission)
8. [Step 7: Final Testing and Comments](#step-7-final-testing-and-comments)
9. [Conclusion](#conclusion)

---

## Prerequisites

Before you begin, ensure you have the following:

- **Flutter SDK** installed on your machine.
- A **Flutter project** set up.
- Access to [MediaSFU](https://mediasfu.com/) with necessary credentials.
- A local server running with H264 and VP8 enabled.

---

## Step 1: Install the `mediasfu-flutter` Package

Begin by adding the MediaSFU Flutter SDK to your project.

1. **Open your terminal** and navigate to your Flutter project directory.
2. **Run the following command** to add the MediaSFU SDK:

    ```sh
    flutter pub add mediasfu_sdk
    ```

---

## Step 2: Create a MediaSFU Handler

Create a dedicated handler to manage MediaSFU functionalities.

1. **Create a new Dart file** named `mediasfu_handler.dart` inside the `components` directory of your project.

2. **Add the following code** to `mediasfu_handler.dart`:

    ```dart
    import 'package:flutter/material.dart';
    import 'package:mediasfu_sdk/mediasfu_sdk.dart' show MediasfuGeneric, MediasfuGenericOptions;

    class MediaSFUHandler extends StatelessWidget {
      const MediaSFUHandler({super.key});

      @override
      Widget build(BuildContext context) {
        return SizedBox(
          width: 900,
          height: 600,
          child: MediasfuGeneric(options: MediasfuGenericOptions()),
        );
      }
    }
    ```

---

## Step 3: Test the MediaSFU Integration

Integrate the `MediaSFUHandler` into your existing components to verify the integration.

1. **Open the `SpaceDetails` component** in your project.

2. **Import the `MediaSFUHandler`** by adding the following line below existing imports:

    ```dart
    import 'mediasfu_handler.dart';
    ```

3. **Include the `MediaSFUHandler`** within the `SpaceDetails` widget. Locate the section where modals for join and speak requests are handled and add the `MediaSFUHandler`:

    ```dart
    // Add under the existing SizedBox
    const SizedBox(height: 24.0),
    MediaSFUHandler(),
    ```

4. **Run your Flutter application** and navigate to the `SpaceDetails` component to observe the `MediaSFUHandler` in action.

---

## Step 4: Configure MediaSFU for No-UI Usage

For scenarios where you prefer not to display the MediaSFU UI, configure the handler accordingly.

1. **Modify the `mediasfu_handler.dart`** to disable the UI and provide necessary options programmatically.

    ```dart
    import 'package:flutter/material.dart';
    import 'package:mediasfu_sdk/mediasfu_sdk.dart' hide createRoomOnMediaSFU;

    class MediaSFUHandler extends StatelessWidget {
      const MediaSFUHandler({super.key});

      @override
      Widget build(BuildContext context) {
        Credentials credentials = Credentials(
          apiUserName: 'yourApiUserName',
          apiKey: 'yourApiKey',
        );

        // Define options for creating or joining a room
        final noUIOptions = CreateMediaSFURoomOptions(
          action: "create",
          duration: 10,
          capacity: 5,
          userName: 'yourUserName',
          eventType: EventType.webinar,
        );

        return SizedBox(
          width: 0,
          height: 0,
          child: MediasfuGeneric(
            options: MediasfuGenericOptions(
              credentials: credentials,
              connectMediaSFU: false,
              localLink: "http://localhost:3000",
              returnUI: false,
              noUIPreJoinOptionsCreate: noUIOptions,
            ),
          ),
        );
      }
    }
    ```

2. **Update the `SpaceDetails` component** to handle media without a UI by passing the necessary options to the `MediaSFUHandler`.

---

## Step 5: Finalize the MediaSFU Integration

Enhance the integration by adding functionalities such as toggling audio/video, managing participants, and handling alerts.

1. **Implement Media Control Methods** in the `SpaceDetails` component to manage audio and video streams.

    ```dart
    Future<void> handleToggleMic() async {
      final user = currentUser.value;
      if (user == null) return;

      if (user.role == ParticipantRole.speaker ||
          user.role == ParticipantRole.host ||
          !(space.value?.askToSpeak ?? false)) {
        try {
          await toggleAudio(sourceParameters: mediasfuParams.value);
        } catch (e) {
          setMessage("Error toggling mic.");
        }
      } else {
        setMessage("You do not have permission to toggle your mic.");
      }
    }
    ```

2. **Manage Participant Actions** such as muting or removing participants.

    ```dart
    Future<void> handleMuteParticipant(String participantId) async {
      final spaceId = widget.spaceId;
      if (spaceId == null) return;

      try {
        await restrictMedia(
          sourceParameters: mediasfuParams.value,
          remoteMember: participantId,
          mediaType: 'audio',
        );
        await APIService.instance.muteParticipant(spaceId, participantId, true);
        fetchSpaceDetails();
      } catch (e) {
        setMessage("Error muting participant. Please try again.");
      }
    }

    Future<void> handleRemoveParticipant(String participantId) async {
      final spaceId = widget.spaceId;
      if (spaceId == null) return;

      try {
        await removeMember(
          sourceParameters: mediasfuParams.value,
          remoteMember: participantId,
        );
        setMessage("Participant removed successfully.");
        fetchSpaceDetails();
      } catch (e) {
        setMessage("Error removing participant. Please try again.");
      }
    }
    ```

3. **Handle Alert Messages** from MediaSFU to manage room states.

    ```dart
    void _updateStateParameters(MediasfuParameters? params) {
      if (!mounted) return;
      if (params == null || params.roomName.isEmpty || params.roomName == 'none') {
        return;
      }

      if (params.alertMessage.isNotEmpty && !params.alertMessage.contains('rotate')) {
        setMessage(params.alertMessage);
      }

      if (params.alertMessage.contains('meeting has ended')) {
        if (currentUser.value?.role == ParticipantRole.host && isConnected) {
          handleEndSpace();
        } else {
          handleLeave();
        }
      }
    }
    ```

---

## Step 6: Finalize Audio Media Transmission

Focus on refining audio transmission features within your application.

1. **Create a Service for MediaSFU Methods** by adding a new Dart file.

    - **Create a `services` folder** inside the `lib` directory.
    - **Add a new file** named `use_mediasfu_sdk.dart` within the `services` folder.

2. **Implement Audio Control Functions** in `use_mediasfu_sdk.dart`.

    ```dart
    import 'package:flutter/foundation.dart';
    import 'package:mediasfu_sdk/mediasfu_sdk.dart';

    /// Handles disconnecting the user from the room.
    Future<void> disconnectRoom({
      MediasfuParameters? sourceParameters,
    }) async {
      try {
        if (sourceParameters == null) {
          throw Exception("Source parameters are required.");
        }
        if (sourceParameters.roomName != "") {
          final options = ConfirmExitOptions(
            member: sourceParameters.member,
            socket: sourceParameters.socket,
            localSocket: sourceParameters.localSocket,
            roomName: sourceParameters.roomName,
            ban: false,
          );
          await confirmExit(options);
        }
      } catch (e) {
        if (kDebugMode) {
          print("Error disconnecting room: $e");
        }
      }
    }

    /// Toggles the user's audio state.
    Future<void> toggleAudio({
      MediasfuParameters? sourceParameters,
    }) async {
      try {
        if (sourceParameters == null) {
          throw Exception("Source parameters are required.");
        }
        if (sourceParameters.roomName != "") {
          final options = ClickAudioOptions(
            parameters: sourceParameters.getUpdatedAllParams(),
          );
          await clickAudio(options);
        }
      } catch (e) {
        if (kDebugMode) {
          print("Error toggling audio: $e");
        }
      }
    }

    /// Restricts media (audio, video, or screenshare) for a specific participant.
    Future<void> restrictMedia({
      MediasfuParameters? sourceParameters,
      required String remoteMember,
      String? mediaType,
    }) async {
      try {
        if (sourceParameters == null) {
          throw Exception("Source parameters are required.");
        }
        if (sourceParameters.roomName != "") {
          final updatedParameters = sourceParameters.getUpdatedAllParams();
          final isHost = updatedParameters.islevel == '2';

          if (isHost) {
            final participant = updatedParameters.participants
                .firstWhere((p) => p.name == remoteMember);

            final options = ControlMediaOptions(
              participantId: participant.id!,
              participantName: participant.name,
              type: mediaType ?? "all",
              socket: sourceParameters.socket,
              roomName: sourceParameters.roomName,
              coHostResponsibility: sourceParameters.coHostResponsibility,
              showAlert: sourceParameters.showAlert,
              coHost: sourceParameters.coHost,
              participants: sourceParameters.participants,
              member: sourceParameters.member,
              islevel: sourceParameters.islevel,
            );
            await controlMedia(options);
          } else {
            throw Exception("You are not the host");
          }
        }
      } catch (e) {
        if (kDebugMode) {
          print("Error restricting media: $e");
        }
      }
    }

    /// Removes a participant from the room.
    Future<void> removeMember({
      MediasfuParameters? sourceParameters,
      required String remoteMember,
    }) async {
      try {
        if (sourceParameters == null) {
          throw Exception("Source parameters are required.");
        }
        if (sourceParameters.roomName != "") {
          final updatedParameters = sourceParameters.getUpdatedAllParams();
          final isHost = updatedParameters.islevel == '2';

          if (isHost) {
            final participant = updatedParameters.participants
                .firstWhere((p) => p.name == remoteMember);

            final options = RemoveParticipantsOptions(
              coHostResponsibility: sourceParameters.coHostResponsibility,
              participant: participant,
              member: sourceParameters.member,
              islevel: sourceParameters.islevel,
              showAlert: sourceParameters.showAlert,
              coHost: sourceParameters.coHost,
              participants: sourceParameters.participants,
              socket: sourceParameters.socket,
              roomName: sourceParameters.roomName,
              updateParticipants: sourceParameters.updateParticipants,
            );
            await removeParticipants(options);
          } else {
            throw Exception("You are not the host");
          }
        }
      } catch (e) {
        if (kDebugMode) {
          print("Error removing member: $e");
        }
      }
    }
    ```

3. **Integrate the Service in `SpaceDetails`**.

    - **Import the service** in the `SpaceDetails` component:

        ```dart
        import '../services/use_mediasfu_sdk.dart';
        ```

    - **Update Audio Control Methods** to utilize the service functions.

        ```dart
        Future<void> handleToggleMic() async {
          final user = currentUser.value;
          if (user == null) return;

          if (user.role == ParticipantRole.speaker ||
              user.role == ParticipantRole.host ||
              !(space.value?.askToSpeak ?? false)) {
            try {
              await toggleAudio(sourceParameters: mediasfuParams.value);
            } catch (e) {
              setMessage("Error toggling mic.");
            }
          } else {
            setMessage("You do not have permission to toggle your mic.");
          }
        }

        Future<void> disconnectRoomFromSpace() async {
          await disconnectRoom(sourceParameters: mediasfuParams.value);
        }

        Future<void> handleMuteParticipant(String participantId) async {
          final spaceId = widget.spaceId;
          if (spaceId == null) return;

          try {
            await restrictMedia(
              sourceParameters: mediasfuParams.value,
              remoteMember: participantId,
              mediaType: 'audio',
            );
            await APIService.instance.muteParticipant(spaceId, participantId, true);
            fetchSpaceDetails();
          } catch (e) {
            setMessage("Error muting participant. Please try again.");
          }
        }

        Future<void> handleRemoveParticipant(String participantId) async {
          final spaceId = widget.spaceId;
          if (spaceId == null) return;

          try {
            await removeMember(
              sourceParameters: mediasfuParams.value,
              remoteMember: participantId,
            );
            await APIService.instance.banParticipant(spaceId, participantId);
            setMessage("Participant removed successfully.");
            fetchSpaceDetails();
          } catch (e) {
            setMessage("Error removing participant. Please try again.");
          }
        }
        ```

---

## Step 7: Final Testing and Comments

Conclude the integration by conducting thorough tests to ensure all functionalities work as expected.

1. **Test Audio Controls**:
    - **Join the room** as multiple participants.
    - **Toggle your microphone** to verify audio transmission.
    - **Mute and unmute** other participants if you have host permissions.

2. **Manage Participants**:
    - **Remove a participant** and ensure they are disconnected from the room.
    - **Observe audio level indicators** to confirm real-time updates.

3. **Handle Alerts**:
    - **End the meeting** from the host side and observe participants being notified and disconnected appropriately.

4. **Finalize UI Adjustments**:
    - **Remove any unused UI components** such as the video grid if focusing solely on audio transmission.
    - **Ensure a seamless user experience** with clear indicators for audio status and participant actions.

---

## Conclusion

You have successfully integrated the MediaSFU Flutter SDK into your project, enabling robust audio media transmission capabilities. This setup allows you to manage audio streams, control participant permissions, and handle real-time audio interactions within your application.

For more advanced features such as screen sharing, custom streams, and creating custom MediaSFU components, stay tuned for Part 2 of this tutorial series.

---

**Note**: Always ensure that your API credentials are securely managed and not exposed in your codebase. Consider using environment variables or secure storage solutions to handle sensitive information.