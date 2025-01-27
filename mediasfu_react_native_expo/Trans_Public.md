# Integrating MediaSFU with React Native (Expo) Applications

## Overview

This comprehensive guide walks you through integrating the `mediasfu-reactnative-expo` package into your React Native project, focusing primarily on enabling robust audio media transmission within the SpacesTek application. Additionally, it covers configuring the integration for MediaSFU Cloud-Only usage and handling backend requests, ensuring a secure and efficient setup. Future tutorials will delve into advanced functionalities such as screen sharing, custom streams, and building bespoke components.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Install the `mediasfu-reactnative-expo` Package](#step-1-install-the-mediasfu-reactnative-expo-package)
3. [Step 2: Create a MediaSFU Handler](#step-2-create-a-mediasfu-handler)
4. [Step 3: Test the MediaSFU Integration](#step-3-test-the-mediasfu-integration)
5. [Step 4: Configure Application to Communicate with the Server](#step-4-configure-application-to-communicate-with-the-server)
    - [4.1: Connecting to a Local Server (Community Edition)](#41-connecting-to-a-local-server-community-edition)
    - [4.2: Connecting to MediaSFU Cloud Integration](#42-connecting-to-mediasfu-cloud-integration)
    - [4.3: Configure for MediaSFU Cloud-Only Usage](#43-configure-for-mediasfu-cloud-only-usage)
    - [4.4: Handle Backend Requests (Optional)](#44-handle-backend-requests-optional)
6. [Step 5: Finalize the MediaSFU Integration](#step-5-finalize-the-mediasfu-integration)
7. [Step 6: Finalize the MediaSFU Integration for Audio Media Transmission](#step-6-finalize-the-mediasfu-integration-for-audio-media-transmission)
8. [Step 7: Finalize Test and Comments](#step-7-finalize-test-and-comments)
9. [Conclusion](#conclusion)

---

## Prerequisites

Before beginning the integration, ensure you have the following setup:

- **Development Environment**:
  - Ensure you have Node.js and npm installed.
  - Your React Native project should be set up with Expo.

- **Basic Understanding of React Native**:
  - Familiarity with React Native components, hooks, and state management.

---

## Step 1: Install the `mediasfu-reactnative-expo` Package

Begin by installing the `mediasfu-reactnative-expo` package, which facilitates integration with MediaSFU.

### 1.1 Install via npm

1. **Open Terminal**:
   - Navigate to your project's root directory.

2. **Run Installation Command:**

    ```sh
    npm install mediasfu-reactnative-expo
    ```

    **Important Notes:**
    - **Avoid Using Flags:** Do not use `--force` or `--legacy-peer-deps` unless absolutely necessary.
    - **Handle Peer Dependencies Carefully:** If you encounter peer dependency issues, consider using [overrides](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) in your `package.json` instead of forcing installations.

## Step 2: Create a MediaSFU Handler

The `MediaSFUHandler` component will manage audio and video streams within your application.

### 2.1 Create `MediaSFUHandler.tsx`

1. **Navigate to Components Directory**:
   - In your project structure, locate and open the `src/components` directory.

2. **Create File**:
   - Create a new file named `MediaSFUHandler.tsx`.

3. **Implement the Basic Handler**:

    ```tsx
    // src/components/MediaSFUHandler.tsx

    import React from "react";
    import { MediasfuGeneric } from "mediasfu-reactnative-expo";

    const MediaSFUHandler: React.FC = () => {
        return <MediasfuGeneric />;
    };

    export default MediaSFUHandler;
    ```

    **Explanation**:
    - **Purpose**: The `MediaSFUHandler` component serves as a wrapper around the `MediasfuGeneric` component from the `mediasfu-reactnative-expo` package, managing media streams effectively.

---

## Step 3: Test the MediaSFU Integration

Before diving deeper, it's essential to verify that the basic integration works as expected.

### 3.1 Integrate `MediaSFUHandler` into `SpaceDetails` Component

1. **Locate `SpaceDetails` Component**:
   - Open the `SpaceDetails.tsx` file, typically found in `src/components`.

2. **Import `MediaSFUHandler`**:

    ```tsx
    // src/components/SpaceDetails.tsx

    import React, { useRef, useState } from "react";
    import { View, StyleSheet } from "react-native";
    import MediaSFUHandler from "./MediaSFUHandler";
    // ... other imports
    ```

3. **Render `MediaSFUHandler`**:

    ```tsx
    // Within the SpaceDetails component's return statement

    const SpaceDetails: React.FC<SpaceDetailsProps> = ({ space }) => {
        const [message, setMessage] = useState("");
        const [isConnected, setIsConnected] = useState(false);
        const sourceParameters = useRef<Record<string, any>>({});

        return (
            <View style={styles.container}>
                {/* Other components and UI elements */}

                {/* MediaSFU Handler */}
                <View style={styles.hiddenContainer}>
                    <MediaSFUHandler />
                </View>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // ... other styles
        },
        hiddenContainer: {
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
        },
    });

    export default SpaceDetails;
    ```

    **Explanation**:
    - **Importing the Handler**: The `MediaSFUHandler` is imported and rendered within a `View` that hides overflow to prevent UI disruptions.
    - **Styling**: The `hiddenContainer` style ensures that the `MediasfuGeneric` component does not overflow the screen, maintaining a clean UI.

4. **Run and Test**:
   - **Create and Join a Room**: Navigate to [http://localhost:3000/meeting/start](http://localhost:3000/meeting/start) to create and join a room.
   - **Verify Functionality**: Ensure that the `MediaSFUHandler` component is operational by observing the welcome component and proceeding with input details.

---

## Step 4: Configure Application to Communicate with the Server

Configure your application to communicate with either a local server or the MediaSFU Cloud, depending on your setup.

### 4.1: Connecting to a Local Server (Community Edition)

1. **Update `MediaSFUHandler` for Local Server**:

    ```tsx
    // src/components/MediaSFUHandler.tsx

    import React, { useRef } from "react";
    import { MediasfuGeneric, PreJoinPage } from "mediasfu-reactnative-expo";

    const MediaSFUHandler: React.FC = () => {
        const localLink = useRef<string | undefined>("http://10.0.0.125:3000");

        return (
            <MediasfuGeneric
                PreJoinPage={PreJoinPage}
                localLink={localLink.current}
                connectMediaSFU={false}
            />
        );
    };

    export default MediaSFUHandler;
    ```

    **Explanation**:
    - **`localLink`**: Specifies the local server URL.
    - **`connectMediaSFU`**: Set to `false` to indicate that the application should not connect to the MediaSFU Cloud.

2. **Test Local Server Integration:**
   - **Create and Join Room Locally:** Use the provided link to create and join a room on your local server.
   - **Verify UI Behavior:** Observe that the room is created and joined locally without UI issues.

### 4.2: Connecting to MediaSFU Cloud Integration

1. **Update `MediaSFUHandler` with Credentials:**

    ```tsx
    // src/components/MediaSFUHandler.tsx

    import React, { useRef } from "react";
    import { Credentials, MediasfuGeneric, PreJoinPage } from "mediasfu-reactnative-expo";

    const MediaSFUHandler: React.FC = () => {
        const credentials = useRef<Credentials>({
            apiKey: "your_actual_api_key_here",
            apiUserName: 'your_actual_api_username_here',
        });

        return (
            <MediasfuGeneric
                PreJoinPage={PreJoinPage}
                connectMediaSFU={true}
                credentials={credentials.current}
            />
        );
    };

    export default MediaSFUHandler;
    ```

    **Important Notes**:
    - **Secure Credentials**: Replace `"your_actual_api_key_here"` and `'your_actual_api_username_here'` with your actual MediaSFU Cloud credentials. **Never expose these credentials publicly.**
    - **Environment Variables**: For security, consider storing credentials in environment variables and accessing them via `process.env`.

2. **Configure Environment Variables**:
   - **Create `.env` File**:

        ```sh
        EXPO_PUBLIC_MEDIASFU_API_USERNAME=your_actual_api_username
        EXPO_PUBLIC_MEDIASFU_API_KEY=your_actual_api_key
        ```

   - **Access in Code**:

        ```tsx
        // src/components/MediaSFUHandler.tsx

        import React, { useRef } from "react";
        import { Credentials, MediasfuGeneric, PreJoinPage } from "mediasfu-reactnative-expo";

        const MediaSFUHandler: React.FC = () => {
            const credentials = useRef<Credentials>({
                apiUserName: process.env.EXPO_PUBLIC_MEDIASFU_API_USERNAME || "",
                apiKey: process.env.EXPO_PUBLIC_MEDIASFU_API_KEY || "",
            });

            return (
                <MediasfuGeneric
                    PreJoinPage={PreJoinPage}
                    connectMediaSFU={true}
                    credentials={credentials.current}
                />
            );
        };

        export default MediaSFUHandler;
        ```

    **Explanation:**
    - **Security Best Practices:** Storing credentials in the `.env` file prevents accidental exposure in version control systems.

3. **Test MediaSFU Cloud Integration:**
   - **Create and Join Cloud Room:** Use the [MediaSFU Cloud](https://mediasfu.com/meeting/start) to create and join a room.
   - **Verify Functionality:** Ensure that rooms are created and joined successfully on the MediaSFU Cloud.

### 4.3: Final Configuration for MediaSFU Cloud-Only Usage

1. **Remove Local Server Configuration:**

    ```tsx
    // src/components/MediaSFUHandler.tsx

    import React, { useRef } from "react";
    import { Credentials, MediasfuGeneric, PreJoinPage } from "mediasfu-reactnative-expo";

    const MediaSFUHandler: React.FC = () => {
        const credentials = useRef<Credentials>({
            apiUserName: process.env.EXPO_PUBLIC_MEDIASFU_API_USERNAME || "",
            apiKey: process.env.EXPO_PUBLIC_MEDIASFU_API_KEY || "",
        });

        return (
            <MediasfuGeneric
                PreJoinPage={PreJoinPage}
                credentials={credentials.current}
            />
        );
    };

    export default MediaSFUHandler;
    ```

    **Explanation:**
    - **Simplification:** By removing `localLink` and `connectMediaSFU`, the application defaults to connecting with the MediaSFU Cloud.

2. **Implement Custom Room Creation Function (Optional for CE Users):**

    For users utilizing the Community Edition (CE) and requiring custom backend interactions, implement a function to handle room creation and joining.

    ```tsx
    // src/hooks/useAudioVideoSDK.ts

    import {
        ClickAudioOptions,
        clickAudio,
        ConfirmExitOptions,
        confirmExit,
        ControlMediaOptions,
        controlMedia,
        Participant,
        RemoveParticipantsOptions,
        removeParticipants,
    } from "mediasfu-reactnative-expo";

    interface UseAudioVideoSDKProps {
        sourceParameters: Record<string, any>;
        deviceId?: string;
    }

    interface MediaControlsProps {
        sourceParameters: Record<string, any>;
        remoteMember: string;
        mediaType?: "audio" | "video" | "screenshare" | "all";
    }

    export const disconnectRoom = async ({ sourceParameters }: UseAudioVideoSDKProps): Promise<void> => {
        try {
            if (Object.keys(sourceParameters).length > 0) {
                const options: ConfirmExitOptions = {
                    member: sourceParameters.member,
                    socket: sourceParameters.socket,
                    localSocket: sourceParameters.localSocket!,
                    roomName: sourceParameters.roomName,
                    ban: false,
                };

                await confirmExit(options);
            }
        } catch (error) {
            console.error("Error disconnecting room:", error);
        }
    };

    export const toggleAudio = async ({ sourceParameters }: UseAudioVideoSDKProps): Promise<void> => {
        try {
            if (Object.keys(sourceParameters).length > 0) {
                const options: ClickAudioOptions = {
                    parameters: sourceParameters as ClickAudioOptions["parameters"],
                };

                await clickAudio(options);
            }
        } catch (error) {
            console.error("Error toggling audio:", error);
        }
    };

    export const restrictMedia = async ({ sourceParameters, remoteMember, mediaType }: MediaControlsProps): Promise<void> => {
        try {
            if (Object.keys(sourceParameters).length > 0) {
                const isHost = sourceParameters.islevel === "2";

                if (!isHost) {
                    console.error("You must be the host to restrict media.");
                    return;
                }

                const participant = sourceParameters.participants.find((p: Participant) => p.name === remoteMember);
                const options: ControlMediaOptions = {
                    participantId: participant.id || "",
                    participantName: participant.name,
                    type: mediaType!,
                    socket: sourceParameters.socket,
                    roomName: sourceParameters.roomName,
                    coHostResponsibility: sourceParameters.coHostResponsibility,
                    showAlert: sourceParameters.showAlert,
                    coHost: sourceParameters.coHost,
                    participants: sourceParameters.participants,
                    member: sourceParameters.member,
                    islevel: sourceParameters.islevel,
                };
                await controlMedia(options);
            }
        } catch (error) {
            console.error("Error restricting media:", error);
        }
    };

    export const removeMember = async ({ sourceParameters, remoteMember }: MediaControlsProps): Promise<void> => {
        try {
            if (Object.keys(sourceParameters).length > 0) {
                const isHost = sourceParameters.islevel === "2";
                if (!isHost) {
                    console.error("You must be the host to remove a member.");
                    return;
                }

                const participant = sourceParameters.participants.find((p: Participant) => p.name === remoteMember);
                const options: RemoveParticipantsOptions = {
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
                };
                await removeParticipants(options);
            }
        } catch (error) {
            console.error("Error removing member:", error);
        }
    };
    ```

    **Explanation:**
    - **Functions:**
      - `disconnectRoom`: Handles disconnection from the room.
      - `toggleAudio`: Toggles the user's audio.
      - `restrictMedia`: Restricts a participant's media (e.g., muting).
      - `removeMember`: Removes a participant from the room.
    - **Error Handling:** Each function includes try-catch blocks to handle and log errors gracefully.

3. **Integrate `useAudioVideoSDK` in `SpaceDetails` Component:**

    ```tsx
    // src/components/SpaceDetails.tsx

    import React, { useRef, useState } from "react";
    import { View, StyleSheet } from "react-native";
    import MediaSFUHandler, { MediaSFUHandlerProps } from "./MediaSFUHandler";
    import AudioLevelBars from "./AudioLevelBars";
    import {
        toggleAudio,
        disconnectRoom,
        restrictMedia,
        removeMember,
    } from "../hooks/useAudioVideoSDK";
    // ... other imports

    const SpaceDetails: React.FC<SpaceDetailsProps> = ({ space }) => {
        const [message, setMessage] = useState("");
        const [isConnected, setIsConnected] = useState(false);
        const [isMuted, setIsMuted] = useState(false);
        const [audioLevel, setAudioLevel] = useState<number>(0);
        const [mediasfuAlert, setMediasfuAlert] = useState("");
        const sourceParameters = useRef<Record<string, any>>({});
        const showRoomDetails = useRef<MediaSFUHandlerProps | null>(null);
        const [showRoom, setShowRoom] = useState(false);
        const isPending = useRef<boolean>(false);
        const allRoomAudios = useRef<JSX.Element[]>([]);
        const allRoomVideos = useRef<JSX.Element[][]>([]);

        const updateSourceParameters = (params: Record<string, any>) => {
            if (params !== sourceParameters.current) {
                sourceParameters.current = params;
                setSourceChanged((prev) => prev + 1);
            }
        };

        // Function implementations for joinRoom, createRoom, isRoomCreated
        const joinRoom = () => {
            if (isPending.current) return;
            isPending.current = true;
            showRoomDetails.current = {
                action: "join",
                name: currentUser?.id!,
                meetingID: space?.remoteName!,
                sourceParameters: sourceParameters.current,
                updateSourceParameters: updateSourceParameters,
            };
            setShowRoom(true);
            isPending.current = false;
        };

        const createRoom = () => {
            if (isPending.current) return;
            isPending.current = true;
            showRoomDetails.current = {
                action: "create",
                duration: space?.duration! / (60 * 1000), // Convert to minutes
                capacity: space?.capacity!,
                name: currentUser?.id!,
                sourceParameters: sourceParameters.current,
                updateSourceParameters: updateSourceParameters,
            };
            setShowRoom(true);
            isPending.current = false;
        };

        const isRoomCreated = () => {
            return space && space.remoteName && !space.remoteName.includes("remote_");
        };

        // Listen to sourceParameters changes
        useFocusEffect(
            React.useCallback(() => {
                if (Object.keys(sourceParameters.current).length > 0 && sourceParameters.current.roomName !== "") {
                    if (sourceParameters.current.roomName !== "") {
                        updateSpace(space.id, {
                            remoteName: sourceParameters.current.roomName,
                        });
                        !isConnected && setIsConnected(true);
                        console.log("Updated remote name:", sourceParameters.current.roomName);
                    } else {
                        if (sourceParameters.current.roomName !== "") {
                            !isConnected && setIsConnected(true);
                        }
                    }
                }

                if (sourceParameters.current.alertMessage !== mediasfuAlert && !sourceParameters.current.alertMessage.includes("rotate")) {
                    setMediasfuAlert(sourceParameters.current.alertMessage);
                    if (sourceParameters.current.alertMessage.includes("meeting has ended")) {
                        if (isHost && isConnected) {
                            handleEndSpace();
                        } else {
                            handleLeave();
                        }
                    } else if (sourceParameters.current.alertMessage) {
                        setMessage(sourceParameters.current.alertMessage);
                    }
                }

                if (Object.keys(sourceParameters.current).length > 0 && sourceParameters.current.roomName !== "") {
                    console.log("sourceParameters changed", sourceParameters.current);
                    setMessage(`sourceParameters changed ${sourceParameters.current.roomName}`);
                }
            }, [sourceChanged, isConnected, audioLevel, isMuted, space, currentUser, mediasfuAlert])
        );

        // Automatically join or create room based on state
        useFocusEffect(
            React.useCallback(() => {
                if (canJoinNow && !showRoom) {
                    const noRoom = space && space.remoteName && space.remoteName.includes("remote_");
                    if (isHost && noRoom && currentUser) {
                        if (isPending.current) return;
                        createRoom();
                    } else if (!showRoom && !noRoom && currentUser) {
                        joinRoom();
                    }
                }
            }, [canJoinNow, isHost, showRoom, currentUser, space])
        );

        // Render MediaSFUHandler conditionally
        if (showRoom) {
            return <MediaSFUHandler {...showRoomDetails.current!} />;
        }

        // Handler functions for audio and room management
        const handleToggleMic = async () => {
            if (
                currentUser?.role === "speaker" ||
                currentUser?.role === "host" ||
                !space?.askToSpeak
            ) {
                await toggleAudio({ sourceParameters: sourceParameters.current });
            } else {
                setMessage("You do not have permission to toggle your mic.");
            }
        };

        const handleLeave = async () => {
            if (currentUser) {
                await disconnectRoom({ sourceParameters: sourceParameters.current });
                await leaveSpace(space?.id!, currentUser.id);
                navigate("/");
            }
        };

        const handleEndSpace = async () => {
            if (isHost) {
                await endSpace(space?.id!);
                const updated = await fetchSpaceById(space?.id!);
                await disconnectRoom({ sourceParameters: sourceParameters.current });
                if (updated) setSpace(updated);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        };

        const handleMuteParticipant = async (targetId: string) => {
            await restrictMedia({
                sourceParameters: sourceParameters.current,
                remoteMember: targetId,
                mediaType: "audio",
            });
            await muteParticipant(space?.id!, targetId, true);
            const updated = await fetchSpaceById(space?.id!);
            if (updated) setSpace(updated);
        };

        const handleRemoveParticipant = async (targetId: string) => {
            if (isHost) {
                await removeMember({
                    sourceParameters: sourceParameters.current,
                    remoteMember: targetId,
                });
                await banParticipant(space.id, targetId);
                const updated = await fetchSpaceById(space?.id!);
                if (updated) setSpace(updated);
            }
        };

        return (
            <View style={styles.container}>
                {/* Audio Level Visualizer */}
                {isConnected && <AudioLevelBars audioLevel={audioLevel} />}

                {/* Audio Grid */}
                <AudioGrid
                    componentsToRender={allRoomAudios.current}
                />

                {/* MediaSFU Handler */}
                <View style={styles.hiddenContainer}>
                    <MediaSFUHandler />
                </View>

                {/* Other UI Components */}
                {/* ... */}
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // ... other styles
        },
        hiddenContainer: {
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
        },
    });

    export default SpaceDetails;
    ```

    **Explanation:**
    - **State Management:** Utilizes `useRef` and `useState` hooks to manage `sourceParameters`, connection status, and audio levels.
    - **Room Control:** Functions like `joinRoom`, `createRoom`, `handleToggleMic`, `handleLeave`, `handleEndSpace`, `handleMuteParticipant`, and `handleRemoveParticipant` manage various aspects of room participation and control.
    - **Audio Visualization:** Integrates the `AudioLevelBars` component to display audio levels visually.

4. **Create the `AudioLevelBars` Component:**

    ```tsx
    // src/components/AudioLevelBars.tsx

    import React, { useState, useEffect } from 'react';
    import { View, StyleSheet } from 'react-native';

    interface AudioLevelBarsProps {
        audioLevel: number;
    }

    const AudioLevelBars: React.FC<AudioLevelBarsProps> = ({ audioLevel }) => {
        const [level, setLevel] = useState(0);

        useEffect(() => {
            const animation = setInterval(() => {
                setLevel((prev) => {
                    if (prev === audioLevel) return prev;
                    return prev < audioLevel
                        ? Math.min(prev + 5, audioLevel)
                        : Math.max(prev - 5, audioLevel);
                });
            }, 50);

            return () => clearInterval(animation);
        }, [audioLevel]);

        // Normalize the audio level to determine the number of filled bars
        const normalizedLevel = Math.max(0, ((level - 127.5) / (275 - 127.5)) * 10); // Map to 0–10 bars
        const bars = Array.from({ length: 10 }, (_, i) => i < normalizedLevel);

        return (
            <View style={styles.audioBarsContainer}>
                {bars.map((filled, index) => (
                    <View
                        key={index}
                        style={[
                            styles.audioBar,
                            filled
                                ? { backgroundColor: `rgb(${255 - index * 20}, ${index * 20}, 0)` }
                                : { backgroundColor: '#ccc' },
                        ]}
                    />
                ))}
            </View>
        );
    };

    const styles = StyleSheet.create({
        audioBarsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            height: 10,
            marginBottom: 4,
        },
        audioBar: {
            width: 4,
            height: '100%',
            borderRadius: 2,
        },
    });

    export default AudioLevelBars;
    ```

    **Explanation:**
    - **Audio Level Visualization:** The `AudioLevelBars` component visually represents the audio level using a series of bars that fill based on the current audio intensity.
    - **Smooth Animation:** Utilizes `setInterval` to smoothly animate the audio level changes.

5. **Update Environment Variables:**

    Ensure your `.env` file contains the correct MediaSFU Cloud credentials.

    ```sh
    EXPO_PUBLIC_MEDIASFU_API_USERNAME=your_actual_api_username
    EXPO_PUBLIC_MEDIASFU_API_KEY=your_actual_api_key
    ```

    **Security Reminder:** Keep this file secure and avoid committing it to version control systems.

## Step 4: Implement No-UI Media Integration (Primary Focus)

For applications where you prefer not to use the default UI components provided by `mediasfu-reactnative-expo`, configure the `MediasfuGeneric` component to operate without UI.

1. **Update `MediaSFUHandler` for No-UI Usage:**

    ```tsx
    // src/components/MediaSFUHandler.tsx

    import React, { useRef } from "react";
    import { MediasfuGeneric, PreJoinPage } from "mediasfu-reactnative-expo";

    interface MediaSFUHandlerProps {
        action: "create" | "join";
        duration?: number;
        capacity?: number;
        name: string;
        meetingID?: string;
        sourceParameters: Record<string, any>;
        updateSourceParameters: (params: Record<string, any>) => void;
    }

    const MediaSFUHandler: React.FC<MediaSFUHandlerProps> = ({
        action,
        duration,
        capacity,
        name,
        meetingID,
        sourceParameters,
        updateSourceParameters,
    }) => {
        const noUIOptions = useRef<
            CreateMediaSFURoomOptions | JoinMediaSFURoomOptions | undefined
        >(undefined);

        try {
            if (action === "create") {
                noUIOptions.current = {
                    action: "create",
                    duration: duration || 15,
                    capacity: capacity || 5,
                    userName: name,
                    eventType: "webinar",
                };
            } else if (action === "join") {
                if (!meetingID) {
                    throw new Error("Meeting ID is required for joining a room.");
                }

                noUIOptions.current = {
                    action: "join",
                    userName: name,
                    meetingID,
                };
            } else {
                throw new Error('Invalid action. Must be either "create" or "join".');
            }
        } catch (error) {
            console.error("Error handling MediaSFU action:", error);
        }

        return (
            <MediasfuGeneric
                PreJoinPage={PreJoinPage}
                connectMediaSFU={false}
                returnUI={false}
                noUIPreJoinOptions={noUIOptions.current}
                sourceParameters={sourceParameters}
                updateSourceParameters={updateSourceParameters}
            />
        );
    };

    export default MediaSFUHandler;
    ```

    **Explanation:**
    - **Props Interface:** Defines `MediaSFUHandlerProps` to ensure the handler receives necessary parameters.
    - **No-UI Configuration:** Sets `returnUI` to `false` and provides `noUIPreJoinOptions` to supply necessary room details programmatically.
    - **Error Handling:** Throws errors for invalid actions to prevent unintended behavior.

2. **Integrate `MediaSFUHandler` with `SpaceDetails`:**

    ```tsx
    // src/components/SpaceDetails.tsx

    import React, { useRef, useState } from "react";
    import { View, StyleSheet } from "react-native";
    import MediaSFUHandler, { MediaSFUHandlerProps } from "./MediaSFUHandler";
    import AudioLevelBars from "./AudioLevelBars";
    import {
        toggleAudio,
        disconnectRoom,
        restrictMedia,
        removeMember,
    } from "../hooks/useAudioVideoSDK";
    // ... other imports

    const SpaceDetails: React.FC<SpaceDetailsProps> = ({ space }) => {
        const [message, setMessage] = useState("");
        const [isConnected, setIsConnected] = useState(false);
        const [isMuted, setIsMuted] = useState(false);
        const [audioLevel, setAudioLevel] = useState<number>(0);
        const [mediasfuAlert, setMediasfuAlert] = useState("");
        const sourceParameters = useRef<Record<string, any>>({});
        const showRoomDetails = useRef<MediaSFUHandlerProps | null>(null);
        const [showRoom, setShowRoom] = useState(false);
        const isPending = useRef<boolean>(false);
        const allRoomAudios = useRef<JSX.Element[]>([]);
        const allRoomVideos = useRef<JSX.Element[][]>([]);

        const updateSourceParameters = (params: Record<string, any>) => {
            if (params !== sourceParameters.current) {
                sourceParameters.current = params;
                setSourceChanged((prev) => prev + 1);
            }
        };

        // Function implementations for joinRoom, createRoom, isRoomCreated
        const joinRoom = () => {
            if (isPending.current) return;
            isPending.current = true;
            showRoomDetails.current = {
                action: "join",
                name: currentUser?.id!,
                meetingID: space?.remoteName!,
                sourceParameters: sourceParameters.current,
                updateSourceParameters: updateSourceParameters,
            };
            setShowRoom(true);
            isPending.current = false;
        };

        const createRoom = () => {
            if (isPending.current) return;
            isPending.current = true;
            showRoomDetails.current = {
                action: "create",
                duration: space?.duration! / (60 * 1000), // Convert to minutes
                capacity: space?.capacity!,
                name: currentUser?.id!,
                sourceParameters: sourceParameters.current,
                updateSourceParameters: updateSourceParameters,
            };
            setShowRoom(true);
            isPending.current = false;
        };

        const isRoomCreated = () => {
            return space && space.remoteName && !space.remoteName.includes("remote_");
        };

        // Listen to sourceParameters changes
        useFocusEffect(
            React.useCallback(() => {
                if (Object.keys(sourceParameters.current).length > 0 && sourceParameters.current.roomName !== "") {
                    if (sourceParameters.current.roomName !== "") {
                        updateSpace(space.id, {
                            remoteName: sourceParameters.current.roomName,
                        });
                        !isConnected && setIsConnected(true);
                        console.log("Updated remote name:", sourceParameters.current.roomName);
                    } else {
                        if (sourceParameters.current.roomName !== "") {
                            !isConnected && setIsConnected(true);
                        }
                    }
                }

                if (sourceParameters.current.alertMessage !== mediasfuAlert && !sourceParameters.current.alertMessage.includes("rotate")) {
                    setMediasfuAlert(sourceParameters.current.alertMessage);
                    if (sourceParameters.current.alertMessage.includes("meeting has ended")) {
                        if (isHost && isConnected) {
                            handleEndSpace();
                        } else {
                            handleLeave();
                        }
                    } else if (sourceParameters.current.alertMessage) {
                        setMessage(sourceParameters.current.alertMessage);
                    }
                }

                if (Object.keys(sourceParameters.current).length > 0 && sourceParameters.current.roomName !== "") {
                    console.log("sourceParameters changed", sourceParameters.current);
                    setMessage(`sourceParameters changed ${sourceParameters.current.roomName}`);
                }
            }, [sourceChanged, isConnected, audioLevel, isMuted, space, currentUser, mediasfuAlert])
        );

        // Automatically join or create room based on state
        useFocusEffect(
            React.useCallback(() => {
                if (canJoinNow && !showRoom) {
                    const noRoom = space && space.remoteName && space.remoteName.includes("remote_");
                    if (isHost && noRoom && currentUser) {
                        if (isPending.current) return;
                        createRoom();
                    } else if (!showRoom && !noRoom && currentUser) {
                        joinRoom();
                    }
                }
            }, [canJoinNow, isHost, showRoom, currentUser, space])
        );

        // Render MediaSFUHandler conditionally
        if (showRoom) {
            return <MediaSFUHandler {...showRoomDetails.current!} />;
        }

        // Handler functions for audio and room management
        const handleToggleMic = async () => {
            if (
                currentUser?.role === "speaker" ||
                currentUser?.role === "host" ||
                !space?.askToSpeak
            ) {
                await toggleAudio({ sourceParameters: sourceParameters.current });
            } else {
                setMessage("You do not have permission to toggle your mic.");
            }
        };

        const handleLeave = async () => {
            if (currentUser) {
                await disconnectRoom({ sourceParameters: sourceParameters.current });
                await leaveSpace(space?.id!, currentUser.id);
                navigate("/");
            }
        };

        const handleEndSpace = async () => {
            if (isHost) {
                await endSpace(space?.id!);
                const updated = await fetchSpaceById(space?.id!);
                await disconnectRoom({ sourceParameters: sourceParameters.current });
                if (updated) setSpace(updated);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        };

        const handleMuteParticipant = async (targetId: string) => {
            await restrictMedia({
                sourceParameters: sourceParameters.current,
                remoteMember: targetId,
                mediaType: "audio",
            });
            await muteParticipant(space?.id!, targetId, true);
            const updated = await fetchSpaceById(space?.id!);
            if (updated) setSpace(updated);
        };

        const handleRemoveParticipant = async (targetId: string) => {
            if (isHost) {
                await removeMember({
                    sourceParameters: sourceParameters.current,
                    remoteMember: targetId,
                });
                await banParticipant(space.id, targetId);
                const updated = await fetchSpaceById(space?.id!);
                if (updated) setSpace(updated);
            }
        };

        return (
            <View style={styles.container}>
                {/* Audio Level Visualizer */}
                {isConnected && <AudioLevelBars audioLevel={audioLevel} />}

                {/* Audio Grid */}
                <AudioGrid
                    componentsToRender={allRoomAudios.current}
                />

                {/* MediaSFU Handler */}
                <View style={styles.hiddenContainer}>
                    <MediaSFUHandler />
                </View>

                {/* Other UI Components */}
                {/* ... */}
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            // ... other styles
        },
        hiddenContainer: {
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
        },
    });

    export default SpaceDetails;
    ```

    **Explanation:**
    - **Conditional Rendering:** The `MediaSFUHandler` component is rendered only when `showRoom` is `true`.
    - **Room Control Functions:** Functions like `joinRoom` and `createRoom` manage room participation based on the user's role and room state.
    - **Audio Management:** The `handleToggleMic` function uses the `toggleAudio` method from the `useAudioVideoSDK` hook to manage the user's audio state.
    - **Participant Management:** Functions to mute or remove participants are implemented, ensuring only hosts can perform these actions.

## Step 5: Finalize the MediaSFU Integration

With the core functionalities in place, finalize the integration by ensuring seamless audio transmission and room management.

### 5.1 Comprehensive Testing

1. **Multiple Participants:**
   - Simulate host and guest participants using different Chrome profiles.
   - Test audio toggling across multiple participants.
   - As the host, attempt to mute and remove participants to verify control functionalities.

2. **Audio Visualization:**
   - Ensure the `AudioLevelBars` component accurately reflects the audio levels of participants.
   - Verify that audio status updates (muted/unmuted) are correctly displayed.

3. **Error Handling:**
   - Attempt invalid actions (e.g., muting without host privileges) and ensure errors are handled gracefully.
   - Simulate network disruptions to observe application responsiveness.

### 5.2 UI Refinements

1. **Responsive Design:**
   - Test the application on various screen sizes to ensure UI components adjust appropriately.
   - Verify UI adaptability on devices with different orientations (e.g., tablets, phones).

2. **Accessibility Enhancements:**
   - Ensure all interactive elements are accessible via keyboard navigation.
   - Verify that labels and controls are correctly interpreted by screen readers for visually impaired users.

3. **Performance Optimization:**
   - Monitor application performance with multiple active audio streams to identify and address potential bottlenecks.
   - Implement lazy loading or throttling for audio updates to improve performance.

### 5.3 Final Comments

- **Focus on Audio Styling:** Tailor the audio visualization and controls to match your application's branding and user experience goals.
- **Leverage Automation Tools:** Utilize tools like CSS preprocessors or CSS-in-JS libraries to streamline styling processes.
- **Scalability Considerations:** While MediaSFU supports a high number of concurrent streams, ensure your application efficiently manages resources to maintain optimal performance.

## Step 6: Finalize Audio Media Transmission Integration

Concentrate on refining audio media transmission, ensuring robust and responsive audio controls within the `SpaceDetails` component.

### 6.1 Implement the `useAudioVideoSDK` Hook

Create a custom hook to manage audio and video functionalities using MediaSFU.

```tsx
// src/hooks/useAudioVideoSDK.ts

import {
    ClickAudioOptions,
    clickAudio,
    ConfirmExitOptions,
    confirmExit,
    ControlMediaOptions,
    controlMedia,
    Participant,
    RemoveParticipantsOptions,
    removeParticipants,
} from "mediasfu-reactnative-expo";

interface UseAudioVideoSDKProps {
    sourceParameters: Record<string, any>;
    deviceId?: string;
}

interface MediaControlsProps {
    sourceParameters: Record<string, any>;
    remoteMember: string;
    mediaType?: "audio" | "video" | "screenshare" | "all";
}

export const disconnectRoom = async ({ sourceParameters }: UseAudioVideoSDKProps): Promise<void> => {
    try {
        if (Object.keys(sourceParameters).length > 0) {
            const options: ConfirmExitOptions = {
                member: sourceParameters.member,
                socket: sourceParameters.socket,
                localSocket: sourceParameters.localSocket!,
                roomName: sourceParameters.roomName,
                ban: false,
            };

            await confirmExit(options);
        }
    } catch (error) {
        console.error("Error disconnecting room:", error);
    }
};

export const toggleAudio = async ({ sourceParameters }: UseAudioVideoSDKProps): Promise<void> => {
    try {
        if (Object.keys(sourceParameters).length > 0) {
            const options: ClickAudioOptions = {
                parameters: sourceParameters as ClickAudioOptions["parameters"],
            };

            await clickAudio(options);
        }
    } catch (error) {
        console.error("Error toggling audio:", error);
    }
};

export const restrictMedia = async ({ sourceParameters, remoteMember, mediaType }: MediaControlsProps): Promise<void> => {
    try {
        if (Object.keys(sourceParameters).length > 0) {
            const isHost = sourceParameters.islevel === "2";

            if (!isHost) {
                console.error("You must be the host to restrict media.");
                return;
            }

            const participant = sourceParameters.participants.find((p: Participant) => p.name === remoteMember);
            const options: ControlMediaOptions = {
                participantId: participant.id || "",
                participantName: participant.name,
                type: mediaType!,
                socket: sourceParameters.socket,
                roomName: sourceParameters.roomName,
                coHostResponsibility: sourceParameters.coHostResponsibility,
                showAlert: sourceParameters.showAlert,
                coHost: sourceParameters.coHost,
                participants: sourceParameters.participants,
                member: sourceParameters.member,
                islevel: sourceParameters.islevel,
            };
            await controlMedia(options);
        }
    } catch (error) {
        console.error("Error restricting media:", error);
    }
};

export const removeMember = async ({ sourceParameters, remoteMember }: MediaControlsProps): Promise<void> => {
    try {
        if (Object.keys(sourceParameters).length > 0) {
            const isHost = sourceParameters.islevel === "2";
            if (!isHost) {
                console.error("You must be the host to remove a member.");
                return;
            }

            const participant = sourceParameters.participants.find((p: Participant) => p.name === remoteMember);
            const options: RemoveParticipantsOptions = {
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
            };
            await removeParticipants(options);
        }
    } catch (error) {
        console.error("Error removing member:", error);
    }
};
```

**Explanation:**
- **Purpose:** The `useAudioVideoSDK` hook encapsulates media control functionalities, promoting reusability and cleaner code within components.
- **Functions:**
  - `disconnectRoom`: Disconnects the user from the room.
  - `toggleAudio`: Toggles the user's microphone.
  - `restrictMedia`: Restricts a participant's media, such as muting their audio.
  - `removeMember`: Removes a participant from the room.

### 6.2 Integrate the Hook in `SpaceDetails`

1. **Import the Hook:**

    ```tsx
    // src/components/SpaceDetails.tsx

    import {
        toggleAudio,
        disconnectRoom,
        restrictMedia,
        removeMember,
    } from "../hooks/useAudioVideoSDK";
    ```

2. **Update Audio Control Handlers:**

    ```tsx
    // Toggle Audio (Mic)
    const handleToggleMic = async () => {
        if (
            currentUser?.role === "speaker" ||
            currentUser?.role === "host" ||
            !space?.askToSpeak
        ) {
            await toggleAudio({ sourceParameters: sourceParameters.current });
        } else {
            setMessage("You do not have permission to toggle your mic.");
        }
    };
    ```

3. **Handle Room Disconnection:**

    ```tsx
    // Handle Leaving the Room
    const handleLeave = async () => {
        if (currentUser) {
            await disconnectRoom({ sourceParameters: sourceParameters.current });
            await leaveSpace(space?.id!, currentUser.id);
            navigate("/");
        }
    };
    ```

4. **Implement Participant Control Functions:**

    ```tsx
    // Mute a Participant
    const handleMuteParticipant = async (targetId: string) => {
        await restrictMedia({
            sourceParameters: sourceParameters.current,
            remoteMember: targetId,
            mediaType: "audio",
        });
        await muteParticipant(space?.id!, targetId, true);
        const updated = await fetchSpaceById(space?.id!);
        if (updated) setSpace(updated);
    };

    // Remove a Participant
    const handleRemoveParticipant = async (targetId: string) => {
        if (isHost) {
            await removeMember({
                sourceParameters: sourceParameters.current,
                remoteMember: targetId,
            });
            await banParticipant(space.id, targetId);
            const updated = await fetchSpaceById(space?.id!);
            if (updated) setSpace(updated);
        }
    };
    ```

    **Explanation:**
    - **Functionality:** These handlers utilize the `useAudioVideoSDK` hook to manage audio controls and participant management seamlessly.
    - **Role-Based Access:** Only hosts can mute or remove participants, ensuring proper role enforcement.

### 6.3 Synchronize Audio States with `sourceParameters`

1. **Update `sourceParameters` and Re-render:**

    ```tsx
    // src/components/SpaceDetails.tsx

    const [sourceChanged, setSourceChanged] = useState(0);

    const updateSourceParameters = (params: Record<string, any>) => {
        if (params !== sourceParameters.current) {
            sourceParameters.current = params;
            setSourceChanged((prev) => prev + 1);
        }
    };
    ```

2. **Listen to Changes and Update States:**

    ```tsx
    useFocusEffect(
        React.useCallback(() => {
            if (Object.keys(sourceParameters.current).length > 0) {
                // Update audio level
                if (sourceParameters.current.audioLevel !== audioLevel) {
                    setAudioLevel(sourceParameters.current.audioLevel);
                }

                // Update mute state
                if (sourceParameters.current.audioAlreadyOn !== !isMuted) {
                    setIsMuted(!sourceParameters.current.audioAlreadyOn!);

                    const newParticipants = space?.participants.map(
                        (p: ParticipantData) => {
                            if (p.id === currentUser?.id) {
                                return { ...p, muted: !sourceParameters.current.audioAlreadyOn! };
                            }
                            return p;
                        }
                    );
                    updateSpace(space?.id!, { participants: newParticipants });
                }
            }
        }, [sourceChanged])
    );
    ```

    **Explanation:**
    - **Audio Level:** Continuously updates the `audioLevel` state to reflect the current audio intensity.
    - **Mute State:** Synchronizes the `isMuted` state with the `sourceParameters`, ensuring UI consistency.

3. **Integrate `AudioLevelBars` in UI:**

    ```tsx
    // src/components/SpaceDetails.tsx

    import AudioLevelBars from "./AudioLevelBars";
    // ... other imports

    return (
        <View style={styles.container}>
            {/* Audio Level Visualizer */}
            {isConnected && <AudioLevelBars audioLevel={audioLevel} />}

            {/* Audio Grid */}
            <AudioGrid
                componentsToRender={allRoomAudios.current}
            />

            {/* MediaSFU Handler */}
            <View style={styles.hiddenContainer}>
                <MediaSFUHandler />
            </View>

            {/* Other UI Components */}
            {/* ... */}
        </View>
    );
    ```

    **Explanation:**
    - **Visualization:** The `AudioLevelBars` component provides a visual representation of the audio levels, enhancing user awareness of audio activity.

## Step 7: Final Testing and Refinements

1. **Functionality Testing:**
   - **Audio Controls:** Ensure that toggling the mic affects both local and remote participants as expected.
   - **Participant Management:** Verify that hosts can mute and remove participants, and that these actions are reflected accurately in the UI.
   - **Room Management:** Test creating and joining rooms, ensuring that rooms are managed correctly based on user roles.

2. **UI Enhancements:**
   - **Hide Unnecessary Components:** Remove or refine UI elements that are not essential to the audio-centric focus of the application.
   - **Responsive Design:** Ensure that the audio grid and visualizers adapt gracefully to different screen sizes and orientations.

3. **Performance Optimization:**
   - **Efficient State Management:** Use `useRef` and `useState` judiciously to prevent unnecessary re-renders.
   - **Resource Management:** Monitor and optimize the application's resource usage, especially when handling multiple audio streams.

4. **Security Considerations:**
   - **Credential Management:** Ensure that API credentials are securely stored and not exposed in the application's source code.
   - **Access Controls:** Enforce proper role-based access controls to prevent unauthorized actions within rooms.

## Conclusion

You have successfully integrated the `mediasfu-reactnative-expo` package into your React Native project, enabling robust audio media transmission within the SpacesTek application. This setup allows for:

- **Audio Controls:** Users can toggle their microphones, and hosts can manage participant audio.
- **Participant Management:** Hosts have the authority to mute or remove participants, ensuring controlled interactions.
- **Audio Visualization:** Real-time audio level visualization enhances user awareness and engagement.

**Next Steps:**

In Part 2 of this tutorial, we will explore more advanced features, including:

- **Screen Sharing:** Implementing screen sharing capabilities for enhanced collaboration.
- **Custom Streams:** Utilizing custom media streams to tailor the user experience.
- **Custom Components:** Building bespoke components to further customize MediaSFU's functionality within your application.

Thank you for following this integration guide. Your enhanced MediaSFU setup empowers SpacesTek to deliver a seamless and interactive audio communication experience. Stay tuned for the next part of this series to unlock even more sophisticated features.