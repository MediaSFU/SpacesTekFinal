# Adding MediaSFU-ReactJS to Your Project

Welcome to the **MediaSFU-ReactJS Integration Guide**. This step-by-step tutorial will walk you through integrating MediaSFU's powerful real-time communication capabilities into your React application. By the end of this guide, you'll have a robust setup for managing audio media transmission, complete with user controls and seamless server communication.

## Table of Contents

1. [Prerequisites](#prerequisites)
3. [Step 1: Install the `mediasfu-reactjs` Package](#step-1-install-the-mediasfu-reactjs-package)
4. [Step 2: Create a MediaSFU Handler](#step-2-create-a-mediasfu-handler)
5. [Step 3: Test the MediaSFU Integration](#step-3-test-the-mediasfu-integration)
6. [Step 4: Configure Application to Communicate with the Server](#step-4-configure-application-to-communicate-with-the-server)
7. [Step 5: Finalize the MediaSFU Integration](#step-5-finalize-the-mediasfu-integration)
8. [Step 6: Finalize the MediaSFU Integration for Audio Media Transmission](#step-6-finalize-the-mediasfu-integration-for-audio-media-transmission)
9. [Step 7: Finalize Test and Comments](#step-7-finalize-test-and-comments)
10. [Conclusion](#conclusion)

---

## Prerequisites

Before you begin, ensure you have the following:

- **React Project**: A React application set up using Create React App or your preferred setup.
- **Node.js and npm**: Ensure you have Node.js (v14 or later) and npm installed.
- **MediaSFU Account**: Access to [MediaSFU](https://mediasfu.com/) with necessary credentials (API Key and Username).
- **Browser Profiles**: Knowledge of managing multiple browser profiles for testing multi-user scenarios.
- **Basic Understanding of React**: Familiarity with React components, hooks, and state management.

---

## Step 1: Install the `mediasfu-reactjs` Package

Integrating MediaSFU into your React project begins with installing the necessary package.

### 1.1 Install via npm

1. **Open Terminal**: Navigate to your project's root directory using your terminal or command prompt.

2. **Run Installation Command**:

    ```sh
    npm install mediasfu-reactjs
    ```

    *Helper Note*: This command adds the `mediasfu-reactjs` package to your project, enabling MediaSFU functionalities.

### 1.2 Important Installation Notes

- **Avoid Using `--force` or `--legacy-peer-deps`**: These flags can override dependency checks and may lead to unstable builds.

  *Explanation*: Forcing installations can bypass essential compatibility checks, potentially introducing bugs or conflicts within your project.

- **Use Package Overrides if Necessary**: If you encounter peer dependency issues, consider using the `overrides` field in your `package.json` instead of forcing installations.

  *Example*:

    ```json
    {
      "overrides": {
        "some-package": {
          "dependency-name": "^1.2.3"
        }
      }
    }
    ```

  *Helper Note*: Overrides provide a safer way to resolve dependency conflicts without compromising the integrity of your project.

---

## Step 2: Create a MediaSFU Handler

The `MediaSFUHandler` component manages the initialization and communication with MediaSFU, handling audio and video streams.

### 2.1 Create `MediaSFUHandler.tsx`

1. **Navigate to Components Directory**: In your project structure, locate and open the `src/components` directory.

2. **Create File**: Create a new file named `MediaSFUHandler.tsx`.

3. **Define the Component**:

    ```tsx
    // src/components/MediaSFUHandler.tsx

    import React from "react";
    import { MediasfuGeneric } from "mediasfu-reactjs";

    const MediaSFUHandler: React.FC = () => {
        return <MediasfuGeneric />;
    };

    export default MediaSFUHandler;
    ```

    *Helper Note*: The `MediaSFUHandler` component encapsulates the `MediasfuGeneric` component, which serves as the core MediaSFU interface for managing streams.

### 2.2 Purpose of `MediaSFUHandler`

- **Stream Management**: Handles the initiation, control, and termination of audio and video streams within your application.

- **State Synchronization**: Keeps your React state in sync with MediaSFU's internal state, ensuring seamless media transmission.

- **Scalability**: Acts as a centralized point for managing multiple streams, making it easier to scale your application's communication capabilities.

  *Helper Note*: By isolating MediaSFU functionalities within `MediaSFUHandler`, you maintain clean separation of concerns, enhancing maintainability.

---

## Step 3: Test the MediaSFU Integration

Before diving deeper, it's essential to verify that the basic integration works as expected.

### 3.1 Integrate `MediaSFUHandler` into `SpaceDetails` Component

1. **Locate `SpaceDetails` Component**: Open the `SpaceDetails.tsx` file, typically found in `src/components`.

2. **Import `MediaSFUHandler`**:

    ```tsx
    // src/components/SpaceDetails.tsx

    import React from "react";
    import MediaSFUHandler from "./MediaSFUHandler";
    ```

3. **Render `MediaSFUHandler`**:

    ```tsx
    // Within the SpaceDetails component's return statement

    const SpaceDetails: React.FC<SpaceDetailsProps> = ({ space }) => {
        return (
            <div>
                {/* Other components like Modal */}
                
                {/* MediaSFU Handler */}
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        overflow: "auto",
                    }}
                >
                    <MediaSFUHandler />
                </div>
            </div>
        );
    };
    ```

    *Helper Note*: Wrapping `MediaSFUHandler` within a styled `div` prevents it from overflowing the screen and ensures it fits seamlessly within the `SpaceDetails` layout.

4. **Explanation of Code Snippet**:

    - **Import Statements**: Importing `React` and `MediaSFUHandler` allows you to use them within the component.
  
    - **Functional Component**: `SpaceDetails` is a functional component that represents the details of a particular space or room.

    - **Rendering `MediaSFUHandler`**: Placing `MediaSFUHandler` inside a styled `div` ensures that it occupies the intended space without disrupting the overall UI.

    - **Styling**: The inline styles (`width`, `height`, `maxWidth`, `maxHeight`, `overflow`) ensure that the MediaSFU components are contained and scrollable if necessary.

    *Helper Note*: Properly styling the container ensures that MediaSFU's UI components render correctly without layout issues.

### 3.2 Quick Demo of Acquired Details (Optional)

*Note*: This section provides a brief overview of how to acquire necessary details from MediaSFU for API interactions. It's optional and not the primary focus of this guide.

1. **Access MediaSFU Sandbox**:

    - **Navigate to Sandbox**: Open `https://mediasfu.com/sandbox` in your browser.
  
    - **API Usage**:
  
        - **API Keys**: Log in with your account to access API keys.
  
        - **API Documentation**: Refer to MediaSFU's API documentation for detailed instructions on generating and using API keys.

    - **Create Room via Dashboard**:

        - **Rooms Management**: Use the `/dashboard` to create and manage rooms.
  
        - **QR Code and Text**: Upon creating a room, you'll receive a QR code and a text link for participants to join.

    *Helper Note*: Understanding how to create and manage rooms via the Sandbox and Dashboard is crucial for testing and development.

2. **Note on Credentials Security**:

    - **Secure Storage**: Always store API credentials securely, avoiding hardcoding them in your codebase.
  
    - **Environment Variables**: Use environment variables or secure storage solutions to manage sensitive information.

    *Helper Note*: Protecting API credentials prevents unauthorized access and maintains the security of your application.

---

## Step 4: Configure Application to Communicate with the Server

Proper configuration ensures that your application communicates effectively with your MediaSFU server, whether it's local or cloud-based.

### 4.1 Configure for Community Edition (CE) without MediaSFU Cloud

For users utilizing MediaSFU's Community Edition without cloud integration, configure the application to communicate with your local server.

1. **Update `MediaSFUHandler` with Local Server Details**:

    ```tsx
    // src/components/MediaSFUHandler.tsx

    import React, { useRef } from "react";
    import { MediasfuGeneric, PreJoinPage } from "mediasfu-reactjs";

    const MediaSFUHandler: React.FC = () => {
        const localLink = useRef<string | undefined>("http://localhost:3000");

        return (
            <MediasfuGeneric
                PrejoinPage={PreJoinPage}
                localLink={localLink.current}
                connectMediaSFU={false}
            />
        );
    };

    export default MediaSFUHandler;
    ```

    *Helper Note*: 
    - **`localLink`**: Points to your local MediaSFU server. Ensure that your server is running and accessible at this address.
    - **`connectMediaSFU`**: Setting this to `false` directs the application to communicate with your local server instead of the MediaSFU Cloud.

2. **Run Your Local MediaSFU Server**:

    - **Server Setup**: Ensure that your local MediaSFU server is running. Refer to MediaSFU's [Open GitHub Repository](https://github.com/MediaSFU/MediaSFU-ReactJS) for setup instructions.

    - **CORS Configuration**: Verify that your server's CORS settings allow connections from your React application's domain (`http://localhost:3000`).

    *Helper Note*: Proper CORS configuration prevents connection issues between your React app and the MediaSFU server.

3. **Create and Join a Room Locally**:

    - **Create Room**: Use the Sandbox or Dashboard to create a room. Note the room name and details.

    - **Join Room**: Navigate to `http://localhost:3000/meeting/start` to join the room.

    - **UI Behavior**: Observe that the room is created and joined, although the UI might not be fully functional at this stage.

    *Helper Note*: Initial room creation helps in verifying that the connection between your React app and the local MediaSFU server is established.

    *Note*: At this point, the primary focus isn't on UI functionalities but ensuring backend integrations are correctly set up.

### 4.2 Configure for MediaSFU Cloud Integration

For applications that leverage MediaSFU Cloud alongside the Community Edition, additional configuration is required to handle credential-based communications.

1. **Update `MediaSFUHandler` with Credentials**:

    ```tsx
    // src/components/MediaSFUHandler.tsx

    import React, { useRef } from "react";
    import { Credentials, MediasfuGeneric, PreJoinPage } from "mediasfu-reactjs";

    const MediaSFUHandler: React.FC = () => {
        const localLink = useRef<string | undefined>("http://localhost:3000");
        const credentials = useRef<Credentials | undefined>({
            apiKey: "abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890",
            apiUserName: "helloworld",
        });

        return (
            <MediasfuGeneric
                PrejoinPage={PreJoinPage}
                localLink={localLink.current}
                connectMediaSFU={true}
                credentials={credentials.current}
            />
        );
    };

    export default MediaSFUHandler;
    ```

    *Helper Note*: 
    - **`credentials`**: Contains your MediaSFU Cloud API Key and Username. Replace the dummy values with actual credentials obtained from the MediaSFU Dashboard.
    - **`connectMediaSFU`**: Setting this to `true` enables communication with MediaSFU Cloud.

2. **Create Room and Join via MediaSFU Cloud**:

    - **Create Room Locally**: Initiate room creation using the local server setup.

    - **Join Room**: Use the provided link (`http://localhost:3000/meeting/start/`) to join the room. Confirm that the room is created both locally and on MediaSFU Cloud.

    - **Room Naming Convention**: Verify that the room names prefixed with 's' or 'p' indicate cloud-based rooms, whereas 'm' denotes local rooms.

    *Helper Note*: Understanding the naming conventions helps in distinguishing between cloud-based and local rooms during testing.

    - **Production-Only Rooms**: Note that production rooms on MediaSFU Cloud may have different behaviors, such as restricted media consumption.

    *Helper Note*: MediaSFU Cloud rooms often have stricter controls and may require additional configurations for full functionality.

3. **Secure API Credentials**:

    - **Environment Variables**: Store your API credentials securely using environment variables to prevent exposure in your codebase.

    - **.env File**: Create a `.env` file in your project's root directory and add the following:

        ```env
        REACT_APP_MEDIASFU_API_USERNAME=helloworld
        REACT_APP_MEDIASFU_API_KEY=abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890
        ```

    - **Access in Code**: Modify `MediaSFUHandler.tsx` to use environment variables:

        ```tsx
        // src/components/MediaSFUHandler.tsx

        import React, { useRef } from "react";
        import { Credentials, MediasfuGeneric, PreJoinPage } from "mediasfu-reactjs";

        const MediaSFUHandler: React.FC = () => {
            const localLink = useRef<string | undefined>("http://localhost:3000");
            const credentials = useRef<Credentials | undefined>({
                apiUserName: process.env.REACT_APP_MEDIASFU_API_USERNAME || "",
                apiKey: process.env.REACT_APP_MEDIASFU_API_KEY || "",
            });

            return (
                <MediasfuGeneric
                    PrejoinPage={PreJoinPage}
                    localLink={localLink.current}
                    connectMediaSFU={true}
                    credentials={credentials.current}
                />
            );
        };

        export default MediaSFUHandler;
        ```

    *Helper Note*: Using environment variables enhances security by keeping sensitive information out of your codebase.

    - **Restart Development Server**: After adding environment variables, restart your development server to apply the changes.

    *Helper Note*: Changes to environment variables require a server restart to take effect.

4. **Finalize Cloud Integration**:

    - **Remove Dummy Credentials**: Ensure that all dummy credentials are replaced with actual values in the `.env` file.

    - **Verify Room Creation**: Create and join rooms to confirm that they are managed via MediaSFU Cloud, not just locally.

    *Helper Note*: Proper verification ensures that your application correctly interacts with MediaSFU Cloud services.

### 4.3 Configure for MediaSFU Cloud-Only Usage

For applications exclusively using MediaSFU Cloud, further simplifications and configurations are necessary.

1. **Update `MediaSFUHandler` for Cloud-Only Usage**:

    ```tsx
    // src/components/MediaSFUHandler.tsx

    import React, { useRef } from "react";
    import { Credentials, MediasfuGeneric, PreJoinPage } from "mediasfu-reactjs";

    export interface MediaSFUHandlerProps {
        action: "create" | "join";
        duration?: number;
        capacity?: number;
        name: string;
        meetingID?: string; // Required for joining a room
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
        const credentials = useRef<Credentials>({
            apiUserName: process.env.REACT_APP_MEDIASFU_API_USERNAME || "",
            apiKey: process.env.REACT_APP_MEDIASFU_API_KEY || "",
        });

        const noUIOptions = useRef<
            CreateMediaSFURoomOptions | JoinMediaSFURoomOptions | undefined
        >(undefined);

        try {
            if (action === "create") {
                // Prepare parameters for creating a room
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

                // Prepare parameters for joining a room
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
                PrejoinPage={PreJoinPage}
                connectMediaSFU={true}
                credentials={credentials.current}
                returnUI={false}
                noUIPreJoinOptions={noUIOptions.current}
                sourceParameters={sourceParameters}
                updateSourceParameters={updateSourceParameters}
            />
        );
    };

    export default MediaSFUHandler;
    ```

    *Helper Notes*: 
    - **`MediaSFUHandlerProps` Interface**: Defines the properties required by the `MediaSFUHandler` component, allowing dynamic room creation and joining.
    - **`noUIOptions`**: Contains the necessary options for creating or joining a room without a user interface, facilitating automated room management.

2. **Handle Backend Requests (Optional)**:

    For Community Edition users who need to intercept and modify requests before sending them to MediaSFU Cloud, implement backend logic.

    ```tsx
    // src/hooks/useAudioVideoSDK.ts

    import {
        CreateJoinRoomOptions,
        CreateJoinRoomResponse,
        CreateJoinRoomError,
        JoinMediaSFURoomOptions,
        CreateMediaSFURoomOptions,
        MediasfuGeneric,
    } from "mediasfu-reactjs";

    export const joinCreateRoomOnMediaSFU: CreateJoinRoomType = async ({
        payload,
        apiUserName,
        apiKey,
        localLink = "",
    }: {
        payload: JoinMediaSFURoomOptions | CreateMediaSFURoomOptions;
        apiUserName: string;
        apiKey: string;
        localLink?: string;
    }): Promise<{
        data: CreateJoinRoomResponse | CreateJoinRoomError | null;
        success: boolean;
    }> => {
        try {
            // Intercept the request meant for MediaSFU Cloud and modify it
            const finalLink = "https://mediasfu.com/v1/rooms"; // Replace with your server endpoint if needed

            const response = await fetch(finalLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiUserName}:${apiKey}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return { data, success: true };
        } catch (error) {
            const errorMessage =
                (error as any).reason || "unknown error";
            return {
                data: { error: `Unable to join room, ${errorMessage}` },
                success: false,
            };
        }
    };

    // Example backend route (Node.js/Express)

    /*
    app.post("/createjoinroom", async (req, res) => {
        try {
            const payload = req.body;
            const [apiUserName, apiKey] = req.headers.authorization
                .replace("Bearer ", "")
                .split(":");

            // Verify temporary credentials
            if (!apiUserName || !apiKey || !verifyCredentials(apiUserName, apiKey)) {
                return res.status(401).json({ error: "Invalid or expired credentials" });
            }

            const actualApiUserName = process.env.ACTUAL_MEDIASFU_API_USERNAME || "";
            const actualApiKey = process.env.ACTUAL_MEDIASFU_API_KEY || "";

            const response = await fetch("https://mediasfu.com/v1/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${actualApiUserName}:${actualApiKey}`,
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            res.status(response.status).json(result);
        } catch (error) {
            console.error("Error creating room:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    */
    ```

    *Helper Notes*: 
    - **Request Interception**: The `joinCreateRoomOnMediaSFU` function intercepts room creation and joining requests, allowing you to modify or secure them before forwarding to MediaSFU Cloud.
    - **Backend Handling**: Implement backend routes to handle these intercepted requests, ensuring secure and controlled communication with MediaSFU Cloud.

    *Note*: For demonstration purposes, replace `finalLink` with your actual backend endpoint if you intend to modify requests before sending them to MediaSFU Cloud.

---

## Step 5: Finalize the MediaSFU Integration

With the core integration in place, it's time to ensure that the MediaSFU functionalities work seamlessly within your application.

### 5.1 Confirm `MediaSFUHandler` Functionality

1. **Join as Multiple Participants**:

    - **Host**: Use one browser profile (e.g., "Host") to create and host the room.
    - **Participant**: Use another profile or device (e.g., "Participant") to join the room.

2. **Switch Cameras**:

    - **Toggle Camera**: Use the "Switch Camera" button to alternate between available cameras.
  
    - **Verify Video Stream**: Ensure that the video stream updates accordingly for both host and participants.

    *Helper Note*: Testing camera switching verifies that your application correctly handles multiple video sources.

3. **Select Specific Camera**:

    - **Dropdown Selection**: If multiple cameras are available, use the dropdown menu to select a specific camera.
  
    - **Confirm Selection**: Verify that the selected camera's feed is reflected in the video stream.

    *Helper Note*: This functionality provides users with greater control over their video sources, enhancing user experience.

4. **Handle Audio and Video States**:

    - **Mute/Unmute**: Test muting and unmuting participants to observe corresponding UI updates.
  
    - **Remove Participants**: As a host, remove participants and ensure their connections are terminated.

    *Helper Note*: Proper state handling ensures that media controls function as intended, maintaining seamless communication.

### 5.2 UI Refinements

1. **Styling Enhancements**:

    - **Responsive Design**: Ensure that video grids adapt gracefully to different screen sizes and orientations.

    - **Visual Indicators**: Provide clear indicators for muted participants and active video streams.

    *Helper Note*: A polished UI enhances user experience and makes media interactions more intuitive.

2. **Performance Optimization**:

    - **Stream Management**: Limit the number of active video streams rendered to prevent performance bottlenecks, especially on resource-constrained devices.

    - **Lazy Loading**: Implement lazy loading for video streams to enhance performance during high participant counts.

    *Helper Note*: Efficient performance management ensures scalability and smooth operation even with multiple participants.

3. **Accessibility Considerations**:

    - **Descriptive Labels**: Ensure buttons and controls have descriptive labels for screen readers.

    - **Contrast Ratios**: Maintain sufficient color contrasts for readability.

    *Helper Note*: Accessibility improvements make your application usable by a broader audience, including those with disabilities.

---

## Step 6: Finalize the MediaSFU Integration for Audio Media Transmission

Focusing on audio media transmission involves managing audio controls, synchronizing states, and providing user feedback.

### 6.1 Create `useAudioVideoSDK` Hook

1. **Create Hook File**:

    - **Location**: `src/hooks/useAudioVideoSDK.ts`

    - **Create File**: `useAudioVideoSDK.ts`

2. **Define the Hook**:

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
    } from "mediasfu-reactjs";

    interface UseAudioVideoSDKProps {
        sourceParameters: Record<string, any>;
        deviceId?: string;
    }

    interface MediaControlsProps {
        sourceParameters: Record<string, any>;
        remoteMember: string;
        mediaType?: "audio" | "video" | "screenshare" | "all";
    }

    /**
     * Disconnects the user from the current room.
     */
    export const disconnectRoom = async ({
        sourceParameters,
    }: UseAudioVideoSDKProps): Promise<void> => {
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

    /**
     * Toggles the user's audio on or off.
     */
    export const toggleAudio = async ({
        sourceParameters,
    }: UseAudioVideoSDKProps): Promise<void> => {
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

    /**
     * Restricts media (e.g., mutes a participant) in the room.
     */
    export const restrictMedia = async ({
        sourceParameters,
        remoteMember,
        mediaType,
    }: MediaControlsProps): Promise<void> => {
        try {
            if (Object.keys(sourceParameters).length > 0) {
                const isHost = sourceParameters.islevel === "2";

                if (!isHost) {
                    console.error("You must be the host to restrict media.");
                    return;
                }

                const participant = sourceParameters.participants.find(
                    (p: Participant) => p.name === remoteMember
                );

                if (!participant) {
                    console.error("Participant not found:", remoteMember);
                    return;
                }

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

    /**
     * Removes a participant from the room.
     */
    export const removeMember = async ({
        sourceParameters,
        remoteMember,
    }: MediaControlsProps): Promise<void> => {
        try {
            if (Object.keys(sourceParameters).length > 0) {
                const isHost = sourceParameters.islevel === "2";

                if (!isHost) {
                    console.error("You must be the host to remove a member.");
                    return;
                }

                const participant = sourceParameters.participants.find(
                    (p: Participant) => p.name === remoteMember
                );

                if (!participant) {
                    console.error("Participant not found:", remoteMember);
                    return;
                }

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

    *Helper Notes*: 
    - **`disconnectRoom`**: Gracefully exits the current room, ensuring resources are freed and connections are terminated.
    - **`toggleAudio`**: Enables or disables the user's microphone, providing control over audio transmission.
    - **`restrictMedia`**: Allows the host to mute or restrict a participant's media, enhancing control within the room.
    - **`removeMember`**: Enables the host to remove a participant from the room, maintaining room integrity.

### 6.2 Integrate Audio Controls into `SpaceDetails` Component

1. **Import Audio Controls**:

    ```tsx
    // src/components/SpaceDetails.tsx

    import React, { useEffect, useRef, useState } from "react";
    import {
        toggleAudio,
        disconnectRoom,
        restrictMedia,
        removeMember,
    } from "../hooks/useAudioVideoSDK";
    import MediaSFUHandler, { MediaSFUHandlerProps } from "./MediaSFUHandler";
    import AudioLevelBars from "./AudioLevelBars";
    import { Space, ParticipantData } from "../types";
    ```

    *Helper Note*: Importing these functions allows you to manage audio and participant controls within the `SpaceDetails` component.

2. **Update Audio State and Level Tracking**:

    ```tsx
    // Within SpaceDetails component

    const [isMuted, setIsMuted] = useState(false);
    const [audioLevel, setAudioLevel] = useState<number>(0);
    ```

    *Helper Note*: 
    - **`isMuted`**: Tracks whether the current user is muted.
    - **`audioLevel`**: Represents the loudness of the audio input, useful for visual indicators.

3. **Manage Source Parameters and Re-rendering**:

    ```tsx
    const sourceParameters = useRef<{
        [key: string]: any;
    }>({});

    const updateSourceParameters = (params: { [key: string]: any }) => {
        if (params !== sourceParameters.current) {
            sourceParameters.current = params;
            setSourceChanged((prev) => prev + 1);
        }
    };

    const [sourceChanged, setSourceChanged] = useState(0);
    ```

    *Helper Notes*: 
    - **`sourceParameters`**: Holds the current state and parameters from MediaSFU.
    - **`updateSourceParameters`**: Updates `sourceParameters` and triggers a re-render by incrementing `sourceChanged`.

4. **Handle Source Parameters Changes**:

    ```tsx
    useEffect(() => {
        if (Object.keys(sourceParameters.current).length > 0) {
            // Update the audio level
            if (sourceParameters.current.audioLevel !== audioLevel) {
                setAudioLevel(sourceParameters.current.audioLevel);
            }

            // Update mute state
            if (sourceParameters.current.audioAlreadyOn !== !isMuted) {
                setIsMuted(!sourceParameters.current.audioAlreadyOn);
            }
        }
    }, [sourceChanged]);
    ```

    *Helper Note*: Synchronizes React state with MediaSFU's internal state, ensuring UI reflects current audio statuses.

5. **Implement Audio Level Visualizer**:

    ```tsx
    {isConnected && <AudioLevelBars audioLevel={audioLevel} />}
    ```

    *Helper Note*: Displays a visual representation of audio levels, enhancing user feedback.

6. **Define and Use Audio Controls**:

    - **Toggle Audio Button**:

        ```tsx
        <button onClick={handleToggleAudio}>
            {isMuted ? "Unmute" : "Mute"}
        </button>
        ```

    - **Handle Toggle Audio Function**:

        ```tsx
        const handleToggleAudio = async () => {
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

        *Helper Note*: Ensures that only authorized users can toggle audio, maintaining room integrity.

7. **Implement Participant Controls**:

    - **Mute Participant Function**:

        ```tsx
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
        ```

    - **Remove Participant Function**:

        ```tsx
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

        *Helper Note*: Provides the host with controls to manage participants, enhancing moderation capabilities.

8. **Handle Room Disconnection and Exit**:

    - **Handle Leave Room**:

        ```tsx
        const handleLeave = async () => {
            if (currentUser) {
                await disconnectRoom({ sourceParameters: sourceParameters.current });
                await leaveSpace(space?.id!, currentUser.id);
                navigate("/");
            }
        };
        ```

    - **Handle End Room**:

        ```tsx
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
        ```

        *Helper Note*: Ensures graceful disconnection from rooms, freeing up resources and maintaining application stability.

9. **Add Alert Handling for MediaSFU Messages**:

    ```tsx
    const [mediasfuAlert, setMediasfuAlert] = useState("");

    useEffect(() => {
        if (
            sourceParameters.current.alertMessage !== mediasfuAlert &&
            !sourceParameters.current.alertMessage.includes("rotate")
        ) {
            setMediasfuAlert(sourceParameters.current.alertMessage);
            if (sourceParameters.current.alertMessage) {
                setMessage(sourceParameters.current.alertMessage);
                if (sourceParameters.current.alertMessage.includes("meeting has ended")) {
                    if (isHost && isConnected) {
                        handleEndSpace();
                    } else {
                        handleLeave();
                    }
                }
            }
        }
    }, [sourceChanged, isConnected, audioLevel, isMuted, space, currentUser, mediasfuAlert]);
    ```

    *Helper Notes*: 
    - **Alert Messages**: Handles specific messages from MediaSFU, such as meeting termination, ensuring appropriate application responses.
    - **Rotation Alerts**: Currently ignored but can be handled similarly for enhanced user experience.

---

## Step 7: Finalize Test and Comments

With all functionalities implemented, it's time to conduct thorough testing and finalize your integration.

### 7.1 Comprehensive Testing

1. **Join as Multiple Participants**:

    - **Host**: Use the primary browser profile to create and manage the room.
  
    - **Participant**: Use the guest profile or a separate device to join as a participant.

2. **Test Audio Controls**:

    - **Mute/Unmute**: Toggle the microphone to ensure that audio states update correctly across participants.

    - **Audio Level Visualization**: Observe the `AudioLevelBars` to confirm that audio levels reflect real-time audio input.

3. **Participant Management**:

    - **Mute Participant**: As the host, mute a participant and verify that their audio is disabled.

    - **Remove Participant**: Remove a participant and ensure they are disconnected from the room.

4. **Handle Alerts**:

    - **Meeting Ended**: End the meeting and verify that all participants are appropriately notified and redirected.

    *Helper Note*: Rigorous testing ensures that all integrated functionalities work harmoniously, providing a smooth user experience.

### 7.2 UI Polishing

1. **Remove Unnecessary Components**:

    - **FlexibleGrid**: Since the focus is on audio transmission, remove any video grids or components that are not relevant to audio functionalities.

    ```tsx
    {/* Remove or comment out FlexibleGrid components */}
    {/* <FlexibleGrid
        customWidth={400}
        customHeight={300}
        rows={1}
        columns={allRoomVideos.current[0].length}
        componentsToRender={allRoomVideos.current[0]}
        backgroundColor={"rgba(217, 227, 234, 0.99)"}
    /> */}
    ```

2. **Focus on AudioGrid**:

    - **Enhance AudioGrid**: Ensure that the `AudioGrid` component accurately displays all audio streams without clutter.

    *Helper Note*: A clean and focused UI enhances user interaction and reduces confusion.

3. **Finalize Alert Handling**:

    - **Consistent Messaging**: Ensure that all alert messages are handled gracefully, providing users with clear and actionable information.

    *Helper Note*: Proper alert handling improves user trust and application reliability.

### 7.3 Final Comments

- **Audio-Only Focus**: This integration emphasizes audio media transmission, making it ideal for applications like conferences, webinars, or collaborative meetings where video is optional.

- **Scalability**: MediaSFU's robust infrastructure allows your application to handle numerous concurrent audio streams without significant performance degradation.

- **Future Enhancements**: While this guide focuses on audio transmission, MediaSFU offers advanced features like screen sharing, custom stream handling, and UI customization, which can be explored in subsequent tutorials.

---

## Conclusion

Congratulations! You've successfully integrated MediaSFU-ReactJS into your React application, establishing a solid foundation for managing audio media transmission. This setup provides essential functionalities such as audio controls, participant management, and real-time audio level visualization, ensuring a seamless communication experience for your users.

**Key Takeaways**:

- **MediaSFU Integration**: Leveraging MediaSFU's ReactJS SDK simplifies the implementation of real-time audio communication in your application.

- **Component-Based Architecture**: Isolating MediaSFU functionalities within dedicated components (`MediaSFUHandler`) enhances code maintainability and scalability.

- **Audio Controls and Management**: Implementing robust audio controls ensures that users have full control over their communication experience.

- **Security and Best Practices**: Storing API credentials securely and adhering to best practices in dependency management safeguards your application against potential vulnerabilities.

**Next Steps**:

- **Explore Advanced Features**: Delve into MediaSFU's advanced capabilities like screen sharing, video stream customization, and UI enhancements to further enrich your application.

- **Implement Custom Components**: Develop custom components tailored to your application's unique requirements, leveraging MediaSFU's flexible APIs.

- **Optimize Performance**: Continuously monitor and optimize your application's performance, especially when scaling to handle numerous concurrent users.

Thank you for following this guide. We hope it empowers you to build robust and interactive communication features within your React applications. Stay tuned for Part 2, where we'll explore more advanced integrations and functionalities with MediaSFU.