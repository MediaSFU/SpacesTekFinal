# Integrating `mediasfu-angular` into Your Angular Project

## Overview

This comprehensive guide walks you through integrating the `mediasfu-angular` package into your Angular project, focusing primarily on enabling robust audio media transmission within the SpacesTek application. Additionally, it covers configuring the integration for MediaSFU Cloud-Only usage and handling backend requests, ensuring a secure and efficient setup. Future tutorials will delve into advanced functionalities such as screen sharing, custom streams, and building bespoke components.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 0: Initial Setup](#step-0-initial-setup)
3. [Step 1: Install the `mediasfu-angular` Package](#step-1-install-the-mediasfu-angular-package)
4. [Step 2: Create a MediaSFU Handler](#step-2-create-a-mediasfu-handler)
5. [Step 3: Test the MediaSFU Integration](#step-3-test-the-mediasfu-integration)
6. [Step 4: Configure Application to Communicate with the Server](#step-4-configure-application-to-communicate-with-the-server)
7. [Step 5: Finalize the MediaSFU Integration](#step-5-finalize-the-mediasfu-integration)
8. [Step 6: Finalize the MediaSFU Integration for Audio Media Transmission](#step-6-finalize-the-mediasfu-integration-for-audio-media-transmission)
9. [Step 7: Finalize Test and Comments](#step-7-finalize-test-and-comments)
10. [Conclusion](#conclusion)

---

## Prerequisites

Before beginning the integration, ensure you have the following setup:

- **Development Environment**:
  - Ensure you have Node.js and npm installed.
  - Your Angular project should be set up and running.

- **Basic Understanding of Angular**:
  - Familiarity with Angular components, modules, services, and state management.

---

## Step 0: Initial Setup

Before diving into the integration steps, perform the following initial setups to ensure a smooth workflow:

### 0.2 Ensure Local Server is Running

1. **Server Configuration**:
   - Make sure your local server is running with **H264** and **VP8** codecs enabled. These codecs are essential for video and audio transmission.

2. **Verification**:
   - Verify the server's status by accessing `http://localhost:3000` (or your configured local server URL) in the browser.

---

## Step 1: Install the `mediasfu-angular` Package

Begin by installing the `mediasfu-angular` package, which facilitates integration with MediaSFU.

### 1.1 Install via npm

1. **Open Terminal**:
   - Navigate to your project's root directory.

2. **Run Installation Command**:

    ```sh
    npm install mediasfu-angular
    ```

    **Important Notes**:
    - **Avoid Using Flags**: Do not use `--force` or `--legacy-peer-deps` unless absolutely necessary.
    - **Handle Peer Dependencies Carefully**: If you encounter peer dependency issues, consider using [overrides](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) in your `package.json` instead of forcing installations.

3. **Verify Installation**:
   - Ensure that `mediasfu-angular` is listed in your `package.json` dependencies.
   - Check for any warnings or errors during installation and address them accordingly.

### 1.2 Important Notes

- **Secure Dependencies**: Always verify the integrity and compatibility of packages before installation.
- **Version Compatibility**: Ensure that the version of `mediasfu-angular` is compatible with your Angular version.

---

## Step 2: Create a MediaSFU Handler

The `MediaSFUHandler` component will manage audio and video streams within your application.

### 2.1 Create `media-sfu-handler.component.ts`

1. **Navigate to Components Directory**:
   - In your project structure, locate and open the `src/app/components` directory.

2. **Create Folder**:
   - Create a new folder named `media-sfu-handler-components`.

3. **Create Component File**:
   - Inside the newly created folder, create a file named `media-sfu-handler.component.ts`.

4. **Implement the Basic Handler**:

    ```typescript
    // src/app/components/media-sfu-handler-components/media-sfu-handler.component.ts

    import { Component, OnInit } from '@angular/core';
    import { MediasfuGeneric, PreJoinPage } from 'mediasfu-angular';
    import { CommonModule } from '@angular/common';

    @Component({
      selector: 'app-media-sfu-handler',
      templateUrl: './media-sfu-handler.component.html',
      standalone: true,
      imports: [CommonModule, MediasfuGeneric],
    })
    export class MediaSfuHandlerComponent implements OnInit {
      PreJoinPage = PreJoinPage;

      constructor() { }

      ngOnInit(): void {
        // Initialization logic if needed
      }
    }
    ```

    **Explanation**:
    - **Importing Necessary Modules**: The component imports `MediasfuGeneric` and `PreJoinPage` from `mediasfu-angular`, along with Angular's `CommonModule`.
    - **Component Decorator**: Defines the selector, template, and imports for the component.
    - **Class Definition**: Implements the `OnInit` lifecycle hook for potential future use.

### 2.2 Create `media-sfu-handler.component.html`

1. **Create HTML File**:
   - In the same directory, create a file named `media-sfu-handler.component.html`.

2. **Implement the Template**:

    ```html
    <!-- src/app/components/media-sfu-handler-components/media-sfu-handler.component.html -->

    <div style="width: 100%; height: 100%; max-height: 100%; max-width: 100%; overflow: scroll">
      <app-mediasfu-generic></app-mediasfu-generic>
    </div>
    ```

    **Explanation**:
    - **Wrapper Div**: Encapsulates the `MediasfuGeneric` component within a div that ensures it occupies the full available space without overflowing.
    - **`MediasfuGeneric` Component**: Renders the generic MediaSFU interface provided by the `mediasfu-angular` package.

### 2.3 Helper Notes

- **Purpose of `MediaSFUHandler` Component**:
  - This component serves as a dedicated handler for managing media streams, encapsulating MediaSFU functionalities within a reusable Angular component.
  - It ensures separation of concerns, making the media management logic isolated from other application components.

- **Standards Compliance**:
  - The component follows Angular's best practices, using standalone components and proper module imports for scalability and maintainability.

---

## Step 3: Test the MediaSFU Integration

Before diving deeper, it's essential to verify that the basic integration works as expected.

### 3.1 Integrate `MediaSFUHandler` into `SpaceDetails` Component

1. **Locate `SpaceDetails` Component**:
   - Open the `space-details.component.ts` file, typically found in `src/app/components/space-details`.

2. **Import `MediaSfuHandlerComponent`**:

    ```typescript
    // src/app/components/space-details/space-details.component.ts

    import { Component, OnInit } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { ParticipantCardComponent } from '../participant-card-components/participant-card.component';
    import { MediaSfuHandlerComponent } from '../media-sfu-handler-components/media-sfu-handler.component';
    // ... other imports
    ```

3. **Update Component Imports**:
   - Ensure that `MediaSfuHandlerComponent` is included in the `imports` array of the `@Component` decorator.

    ```typescript
    @Component({
      selector: 'app-space-details',
      standalone: true,
      imports: [
        CommonModule,
        ParticipantCardComponent,
        // ... other imports
        MediaSfuHandlerComponent,
      ],
      templateUrl: './space-details.component.html',
      styleUrls: ['./space-details.component.css']
    })
    export class SpaceDetailsComponent implements OnInit {
      // Component logic
    }
    ```

4. **Update HTML Template**:
   - Open `space-details.component.html` and include the `MediaSFUHandler` component.

    ```html
    <!-- src/app/components/space-details/space-details.component.html -->

    <!-- Other UI Components -->

    <!-- MediaSFU Handler -->
    <app-media-sfu-handler></app-media-sfu-handler>

    <app-spinner></app-spinner>

    <!-- Other UI Components -->
    ```

    **Explanation**:
    - **Placement**: The `MediaSFUHandler` component is placed above the spinner component to ensure media handling is initialized before other UI elements.

5. **Run and Test**:
   - **Create and Join a Room**: Navigate to `http://localhost:3000/meeting/start` to create and join a room.
   - **Verify Functionality**: Ensure that the `MediaSFUHandler` component is operational by observing the welcome component and proceeding with input details.

### 3.2 Helper Notes

- **Component Integration**:
  - By integrating the `MediaSFUHandler` component into `SpaceDetails`, you ensure that media functionalities are encapsulated and managed effectively within the space details view.
  
- **UI Stability**:
  - Wrapping the `MediasfuGeneric` component within a div with controlled styling prevents UI disruptions, maintaining a clean and responsive interface.

### 3.3 Additional Testing Steps (Optional)

While the primary focus is on audio media transmission, it's beneficial to perform basic testing of the media functionalities:

1. **Create a Room**:
   - Use the MediaSFU interface to create a new room.
   
2. **Join as Participant**:
   - Use another browser profile or device to join the room as a participant.
   
3. **Media Transmission**:
   - Test audio transmission by speaking into the microphone and ensuring audio levels are detected.
   
4. **UI Observations**:
   - Observe the media components to verify that audio streams are being managed correctly.

---

## Step 4: Configure Application to Communicate with the Server

Proper configuration ensures that your application communicates effectively with your MediaSFU server, whether it's local or cloud-based.

### 4.1 Connecting to a Local Server (Community Edition)

For users utilizing the Community Edition (CE) without connecting to the MediaSFU Cloud, follow these steps to configure the application to communicate with a local server.

1. **Update `MediaSfuHandlerComponent` for Local Server**:

    ```typescript
    // src/app/components/media-sfu-handler-components/media-sfu-handler.component.ts

    import { Component, Input, OnInit } from '@angular/core';
    import { BehaviorSubject } from 'rxjs';
    import { MediasfuGeneric, PreJoinPage } from 'mediasfu-angular';
    import { CommonModule } from '@angular/common';

    @Component({
      selector: 'app-media-sfu-handler',
      templateUrl: './media-sfu-handler.component.html',
      standalone: true,
      imports: [CommonModule, MediasfuGeneric],
    })
    export class MediaSfuHandlerComponent implements OnInit {
      PreJoinPage = PreJoinPage;
      localLink = new BehaviorSubject<string>('http://localhost:3000'); // Local server URL

      constructor() { }

      ngOnInit(): void {
        // Initialization logic if needed
      }
    }
    ```

    **Explanation**:
    - **`localLink`**: Specifies the local server URL to which the application should connect.
    - **`connectMediaSFU`**: To indicate that the application should **not** connect to the MediaSFU Cloud, set this property to `false` in the template.

2. **Update HTML Template for Local Server**:

    ```html
    <!-- src/app/components/media-sfu-handler-components/media-sfu-handler.component.html -->

    <div style="width: 100%; height: 100%; max-height: 100%; max-width: 100%; overflow: scroll">
      <app-mediasfu-generic
        [PrejoinPage]="PreJoinPage"
        [localLink]="localLink.value"
        [connectMediaSFU]="false"
      ></app-mediasfu-generic>
    </div>
    ```

    **Explanation**:
    - **`[localLink]`**: Binds the `localLink` value to the `MediasfuGeneric` component, directing it to communicate with the local server.
    - **`[connectMediaSFU]="false"`**: Disables connection to the MediaSFU Cloud, ensuring all media handling is managed locally.

3. **Test Local Server Integration**:

   - **Create and Join Room Locally**:
     - Use the application to create and join a room.
     - Verify that the room is created and joined on the local server without UI issues.

   - **Verification**:
     - Check the local server logs to confirm that rooms are being created and participants are connecting as expected.

### 4.2 Connecting to MediaSFU Cloud Integration

For applications that need to connect to the MediaSFU Cloud, follow these steps to configure the integration.

1. **Update `MediaSfuHandlerComponent` with Credentials**:

    ```typescript
    // src/app/components/media-sfu-handler-components/media-sfu-handler.component.ts

    import { Component, Input, OnInit } from '@angular/core';
    import { BehaviorSubject } from 'rxjs';
    import { MediasfuGeneric, PreJoinPage, Credentials } from 'mediasfu-angular';
    import { CommonModule } from '@angular/common';

    @Component({
      selector: 'app-media-sfu-handler',
      templateUrl: './media-sfu-handler.component.html',
      standalone: true,
      imports: [CommonModule, MediasfuGeneric],
    })
    export class MediaSfuHandlerComponent implements OnInit {
      PreJoinPage = PreJoinPage;
      credentials = new BehaviorSubject<Credentials>({
        apiUserName: 'helloworld',
        apiKey: 'abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890',
      }); // Replace with actual credentials

      constructor() { }

      ngOnInit(): void {
        // Initialization logic if needed
      }
    }
    ```

    **Important Notes**:
    - **Secure Credentials**: Replace `'helloworld'` and the dummy API key with your actual MediaSFU Cloud credentials.
    - **Environment Variables**: For security, consider storing credentials in environment variables and accessing them via Angular's environment files.

2. **Update HTML Template for Cloud Integration**:

    ```html
    <!-- src/app/components/media-sfu-handler-components/media-sfu-handler.component.html -->

    <div style="width: 100%; height: 100%; max-height: 100%; max-width: 100%; overflow: scroll">
      <app-mediasfu-generic
        [PrejoinPage]="PreJoinPage"
        [localLink]="localLink.value"
        [connectMediaSFU]="true" <!-- Set to true for Cloud connection -->
        [credentials]="credentials.value"
      ></app-mediasfu-generic>
    </div>
    ```

    **Explanation**:
    - **`[connectMediaSFU]="true"`**: Enables connection to the MediaSFU Cloud.
    - **`[credentials]`**: Provides the necessary credentials for authenticating with the MediaSFU Cloud.

3. **Secure Credentials with Environment Variables** (Recommended):

    - **Create Environment File**:
      - Open `src/environments/environment.ts` and add your MediaSFU Cloud credentials.

        ```typescript
        // src/environments/environment.ts

        export const environment = {
          production: false,
          mediasfu: {
            apiUserName: 'your_actual_api_username_here',
            apiKey: 'your_actual_api_key_here',
          },
          // ... other environment variables
        };
        ```

    - **Update Component to Use Environment Variables**:

        ```typescript
        // src/app/components/media-sfu-handler-components/media-sfu-handler.component.ts

        import { Component, Input, OnInit } from '@angular/core';
        import { BehaviorSubject } from 'rxjs';
        import { MediasfuGeneric, PreJoinPage, Credentials } from 'mediasfu-angular';
        import { CommonModule } from '@angular/common';
        import { environment } from '../../../environments/environment';

        @Component({
          selector: 'app-media-sfu-handler',
          templateUrl: './media-sfu-handler.component.html',
          standalone: true,
          imports: [CommonModule, MediasfuGeneric],
        })
        export class MediaSfuHandlerComponent implements OnInit {
          PreJoinPage = PreJoinPage;
          credentials = new BehaviorSubject<Credentials>({
            apiUserName: environment.mediasfu.apiUserName,
            apiKey: environment.mediasfu.apiKey,
          });

          constructor() { }

          ngOnInit(): void {
            // Initialization logic if needed
          }
        }
        ```

        **Explanation**:
        - **Environment Variables**: Using Angular's environment files ensures that sensitive credentials are not hard-coded and can be managed securely across different environments (development, production).

4. **Test MediaSFU Cloud Integration**:

   - **Create and Join Cloud Room**:
     - Use the application to create and join a room.
     - Verify that the room is created and joined successfully on the MediaSFU Cloud.

   - **Verification**:
     - Check the MediaSFU Cloud dashboard to confirm that rooms are being managed correctly.
     - Ensure that participants can communicate via audio without UI disruptions.

### 4.3 Configure for MediaSFU Cloud-Only Usage

For applications exclusively using MediaSFU Cloud, further simplifications and configurations are necessary.

1. **Update `MediaSfuHandlerComponent` for Cloud-Only Usage**:

    ```typescript
    // src/app/components/media-sfu-handler-components/media-sfu-handler.component.ts

    import { Component, Input, OnInit } from '@angular/core';
    import { BehaviorSubject } from 'rxjs';
    import { MediasfuGeneric, PreJoinPage, Credentials } from 'mediasfu-angular';
    import { CommonModule } from '@angular/common';
    import { environment } from '../../../environments/environment';

    @Component({
      selector: 'app-media-sfu-handler',
      templateUrl: './media-sfu-handler.component.html',
      standalone: true,
      imports: [CommonModule, MediasfuGeneric],
    })
    export class MediaSfuHandlerComponent implements OnInit {
      PreJoinPage = PreJoinPage;
      credentials = new BehaviorSubject<Credentials>({
        apiUserName: environment.mediasfu.apiUserName,
        apiKey: environment.mediasfu.apiKey,
      });

      noUIOptions = new BehaviorSubject<CreateMediaSFURoomOptions | JoinMediaSFURoomOptions | undefined>(undefined);

      finalOptions = new BehaviorSubject<CreateMediaSFURoomOptions | JoinMediaSFURoomOptions | null>(null);

      constructor() { }

      ngOnInit(): void {
        try {
          if (this.options.action === 'create') {
            // Prepare parameters for creating a room
            this.finalOptions.next({
              action: 'create',
              duration: this.options.duration || 15,
              capacity: this.options.capacity || 5,
              userName: this.options.name,
              eventType: 'webinar',
            });
            this.noUIOptions.next(this.options);
          } else if (this.options.action === 'join') {
            if (!this.options.meetingID) {
              throw new Error('Meeting ID is required for joining a room.');
            }

            // Prepare parameters for joining a room
            this.finalOptions.next({
              action: 'join',
              userName: this.options.name,
              meetingID: this.options.meetingID,
            });
            this.noUIOptions.next(this.options);
          } else {
            throw new Error('Invalid action. Must be either "create" or "join".');
          }
        } catch (error) {
          console.error('Error configuring MediaSFU options:', error);
        }
      }

      @Input() options!: MediaSFUHandlerOptions;
    }

    export interface MediaSFUHandlerOptions {
      action: 'create' | 'join';
      duration?: number | null;
      capacity?: number | null;
      name: string;
      meetingID?: string | null;
      sourceParameters: Record<string, any>;
      updateSourceParameters: (params: Record<string, any>) => void;
    }
    ```

    **Explanation**:
    - **`MediaSFUHandlerOptions` Interface**:
      - Defines the properties required for the handler to either create or join a room.
      - **Properties**:
        - `action`: Specifies whether to create or join a room.
        - `duration`: Duration of the meeting (applicable for creation).
        - `capacity`: Maximum number of participants (applicable for creation).
        - `name`: Username of the participant.
        - `meetingID`: ID of the meeting to join (applicable for joining).
        - `sourceParameters`: Current state parameters from MediaSFU.
        - `updateSourceParameters`: Function to update `sourceParameters`.

    - **Handling Actions**:
      - **Create**:
        - Sets up the options required to create a new room.
      - **Join**:
        - Sets up the options required to join an existing room.

    - **Error Handling**:
      - Ensures that necessary parameters are provided based on the action.
      - Logs errors if the configuration fails.

2. **Update HTML Template to Pass Props**:

    ```html
    <!-- src/app/components/media-sfu-handler-components/media-sfu-handler.component.html -->

    <div *ngIf="noUIOptions | async as options" style="width: 0; height: 0; max-height: 0; max-width: 0; overflow: hidden">
      <app-mediasfu-generic
        [PrejoinPage]="PreJoinPage"
        [sourceParameters]="options.sourceParameters"
        [updateSourceParameters]="options.updateSourceParameters"
        [noUIPreJoinOptions]="finalOptions.value!"
        [credentials]="credentials.value"
      ></app-mediasfu-generic>
    </div>
    ```

    **Explanation**:
    - **`*ngIf` Directive**: Ensures that the `MediasfuGeneric` component is only rendered when `noUIOptions` has a value.
    - **Props Passed**:
      - **`[PrejoinPage]`**: Integrates the `PreJoinPage` component for pre-join functionalities.
      - **`[sourceParameters]` & `[updateSourceParameters]`**: Facilitates state synchronization with MediaSFU.
      - **`[noUIPreJoinOptions]`**: Provides options for creating or joining a room without a UI.
      - **`[credentials]`**: Supplies the necessary credentials for cloud connection.

3. **Helper Notes**

- **MediaSFU Cloud Configuration**:
  - By setting `connectMediaSFU` to `true` and providing valid credentials, the application connects directly to the MediaSFU Cloud.
  
- **Role of `noUIPreJoinOptions`**:
  - This prop allows the application to create or join rooms programmatically without relying on the default UI provided by MediaSFU, enabling more controlled and customized user experiences.

- **Security Considerations**:
  - Always ensure that sensitive credentials are securely managed and not exposed in the client-side code. Utilize environment variables and Angular's environment files for secure storage.

---

## Step 5: Finalize the MediaSFU Integration

With the core functionalities in place, finalize the integration by ensuring seamless audio transmission and room management.

### 5.1 Comprehensive Testing

1. **Multiple Participants**:
   - **Host**: Use one device or emulator to act as the host.
   - **Participants**: Use additional devices or emulators to join as participants.
   - **Interaction**: Test audio toggling across multiple participants, and as the host, attempt to mute and remove participants to verify control functionalities.

2. **Audio Visualization**:
   - Ensure the `AudioLevelBars` component accurately reflects the audio levels of participants.
   - Verify that audio status updates (muted/unmuted) are correctly displayed.

3. **Participant Management**:
   - **Mute Participant**: As the host, mute a participant and verify that their audio is disabled.
   - **Remove Participant**: Remove a participant and ensure they are disconnected from the room.

4. **Error Handling**:
   - Attempt invalid actions (e.g., muting without host privileges) and ensure errors are handled gracefully.
   - Simulate network disruptions to observe application responsiveness.

### 5.2 UI Refinements

1. **Responsive Design**:
   - Test the application on various screen sizes to ensure UI components adjust appropriately.
   - Verify UI adaptability on devices with different orientations (e.g., tablets, phones).

2. **Accessibility Enhancements**:
   - Ensure all interactive elements are accessible via screen readers.
   - Verify that labels and controls are correctly interpreted by assistive technologies for visually impaired users.

3. **Performance Optimization**:
   - Monitor application performance with multiple active audio streams to identify and address potential bottlenecks.
   - Implement throttling or debouncing for audio updates to improve performance.

### 5.3 Final Comments

- **Focus on Audio Styling**:
  - Tailor the audio visualization and controls to match your application's branding and user experience goals.

- **Leverage Optimization Tools**:
  - Utilize Angular's performance monitoring tools to streamline optimizations.

- **Scalability Considerations**:
  - While MediaSFU supports a high number of concurrent streams, ensure your application efficiently manages resources to maintain optimal performance.

---

## Step 6: Finalize the MediaSFU Integration for Audio Media Transmission

Focusing on audio media transmission involves managing audio controls, synchronizing states, and providing user feedback.

### 6.1 Implement the `UseMediasfuSdkService` Service

Create a custom service to manage audio and video functionalities using MediaSFU.

1. **Create Service File**:
   - Navigate to `src/app/services` and create a file named `use-mediasfu-sdk.service.ts`.

2. **Import Required Methods and Define Interfaces**:

    ```typescript
    // src/app/services/use-mediasfu-sdk.service.ts

    import { Injectable } from '@angular/core';
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
    } from 'mediasfu-angular';

    export interface UseAudioVideoSDKProps {
      sourceParameters: Record<string, any>;
      deviceId?: string;
    }

    export interface MediaControlsProps {
      sourceParameters: Record<string, any>;
      remoteMember: string;
      mediaType?: 'audio' | 'video' | 'screenshare' | 'all';
    }
    ```

    **Explanation**:
    - **Imports**: Imports necessary methods and interfaces from `mediasfu-angular` to handle audio and media functionalities.
    - **Interfaces**:
      - `UseAudioVideoSDKProps`: Defines the properties required for audio/video operations.
      - `MediaControlsProps`: Defines properties for controlling media of specific participants.

3. **Define the Service**:

    ```typescript
    // src/app/services/use-mediasfu-sdk.service.ts

    @Injectable({
      providedIn: 'root',
    })
    export class UseMediasfuSdkService {
      constructor() {}

      /**
       * Disconnects the user from the current room.
       */
      async disconnectRoom({ sourceParameters }: UseAudioVideoSDKProps): Promise<void> {
        try {
          if (Object.keys(sourceParameters).length > 0) {
            const options: ConfirmExitOptions = {
              member: sourceParameters['member'],
              socket: sourceParameters['socket'],
              localSocket: sourceParameters['localSocket']!,
              roomName: sourceParameters['roomName'],
              ban: false,
            };

            await confirmExit(options);
          }
        } catch (error) {
          console.error('Error disconnecting room:', error);
        }
      }

      /**
       * Toggles the user's audio on or off.
       */
      async toggleAudio({ sourceParameters }: UseAudioVideoSDKProps): Promise<void> {
        try {
          if (Object.keys(sourceParameters).length > 0) {
            const options: ClickAudioOptions = {
              parameters: sourceParameters as ClickAudioOptions['parameters'],
            };

            await clickAudio(options);
          }
        } catch (error) {
          console.error('Error toggling audio:', error);
        }
      }

      /**
       * Restricts media (e.g., mutes a participant) in the room.
       */
      async restrictMedia({ sourceParameters, remoteMember, mediaType }: MediaControlsProps): Promise<void> {
        try {
          if (Object.keys(sourceParameters).length > 0) {
            const isHost = sourceParameters['islevel'] === '2';

            if (!isHost) {
              console.error('You must be the host to restrict media.');
              return;
            }

            const participant = sourceParameters['participants'].find((p: Participant) => p.name === remoteMember);

            if (!participant) {
              console.error('Participant not found:', remoteMember);
              return;
            }

            const options: ControlMediaOptions = {
              participantId: participant.id || '',
              participantName: participant.name,
              type: mediaType!,
              socket: sourceParameters['socket'],
              roomName: sourceParameters['roomName'],
              coHostResponsibility: sourceParameters['coHostResponsibility'],
              showAlert: sourceParameters['showAlert'],
              coHost: sourceParameters['coHost'],
              participants: sourceParameters['participants'],
              member: sourceParameters['member'],
              islevel: sourceParameters['islevel'],
            };

            await controlMedia(options);
          }
        } catch (error) {
          console.error('Error restricting media:', error);
        }
      }

      /**
       * Removes a participant from the room.
       */
      async removeMember({ sourceParameters, remoteMember }: MediaControlsProps): Promise<void> {
        try {
          if (Object.keys(sourceParameters).length > 0) {
            const isHost = sourceParameters['islevel'] === '2';

            if (!isHost) {
              console.error('You must be the host to remove a member.');
              return;
            }

            const participant = sourceParameters['participants'].find((p: Participant) => p.name === remoteMember);

            if (!participant) {
              console.error('Participant not found:', remoteMember);
              return;
            }

            const options: RemoveParticipantsOptions = {
              coHostResponsibility: sourceParameters['coHostResponsibility'],
              participant: participant,
              member: sourceParameters['member'],
              islevel: sourceParameters['islevel'],
              showAlert: sourceParameters['showAlert'],
              coHost: sourceParameters['coHost'],
              participants: sourceParameters['participants'],
              socket: sourceParameters['socket'],
              roomName: sourceParameters['roomName'],
              updateParticipants: sourceParameters['updateParticipants'],
            };

            await removeParticipants(options);
          }
        } catch (error) {
          console.error('Error removing member:', error);
        }
      }
    }
    ```

    **Explanation**:
    - **`disconnectRoom`**:
      - Gracefully exits the current room, ensuring resources are freed and connections are terminated.
    
    - **`toggleAudio`**:
      - Enables or disables the user's microphone, providing control over audio transmission.
    
    - **`restrictMedia`**:
      - Allows the host to mute or restrict a participant's media, enhancing control within the room.
    
    - **`removeMember`**:
      - Enables the host to remove a participant from the room, maintaining room integrity.
    
    - **Error Handling**:
      - Each method includes try-catch blocks to handle and log errors gracefully.
    
    - **Role-Based Access**:
      - Ensures that only hosts can restrict or remove participants, maintaining room integrity.

### 6.2 Integrate the Service in `SpaceDetails` Component

1. **Import the Service**:

    ```typescript
    // src/app/components/space-details/space-details.component.ts

    import { Component, OnInit } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { ParticipantCardComponent } from '../participant-card-components/participant-card.component';
    import { MediaSfuHandlerComponent, MediaSFUHandlerOptions } from '../media-sfu-handler-components/media-sfu-handler.component';
    import { UseMediasfuSdkService } from '../../services/use-mediasfu-sdk.service';
    // ... other imports
    ```

2. **Update Component Imports**:
   - Ensure that `UseMediasfuSdkService` is provided in the component.

    ```typescript
    @Component({
      selector: 'app-space-details',
      standalone: true,
      imports: [
        CommonModule,
        ParticipantCardComponent,
        // ... other imports
        MediaSfuHandlerComponent,
        AudioLevelBarsComponent,
        AudioGridComponent,
        FlexibleGridComponent,
      ],
      templateUrl: './space-details.component.html',
      styleUrls: ['./space-details.component.css'],
      providers: [UseMediasfuSdkService],
    })
    export class SpaceDetailsComponent implements OnInit {
      // Component logic
    }
    ```

3. **Inject the Service in Constructor**:

    ```typescript
    constructor(
      // ... other injections
      public audioVideoService: UseMediasfuSdkService // Injected service
    ) { }
    ```

4. **Update Audio Control Handlers**:

    ```typescript
    // src/app/components/space-details/space-details.component.ts

    async handleToggleMic(): Promise<void> {
      const user = this.currentUser.value;
      const space = this.space?.value;
      if (user && space) {
        if (user.role === 'speaker' || user.role === 'host' || !space?.askToSpeak) {
          try {
            await this.audioVideoService.toggleAudio({ sourceParameters: this.sourceParameters.value });
          } catch (error) {
            console.error('Error toggling mic:', error);
          }
        } else {
          this.message.next('You do not have permission to toggle your mic.');
        }
      }
    }
    ```

    **Explanation**:
    - **Functionality**: Utilizes the `UseMediasfuSdkService` to toggle the user's microphone, ensuring audio controls are managed effectively.

5. **Handle Room Disconnection**:

    ```typescript
    // src/app/components/space-details/space-details.component.ts

    async handleLeave(): Promise<void> {
      const currentSpace = this.space?.value;
      const user = this.currentUser.value;
      if (currentSpace && user) {
        try {
          await this.apiService.leaveSpace(currentSpace.id, user.id);
          await this.audioVideoService.disconnectRoom({ sourceParameters: this.sourceParameters.value });
          this.router.navigate(['/']);
        } catch (error) {
          console.error('Error leaving space:', error);
        }
      }
    }
    ```

    ```typescript
    async handleEndSpace(): Promise<void> {
      const currentSpace = this.space?.value;
      if (currentSpace && this.isHost()) {
        try {
          await this.apiService.endSpace(currentSpace.id);
          this.space?.next(currentSpace);
          await this.audioVideoService.disconnectRoom({ sourceParameters: this.sourceParameters.value });
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        } catch (error) {
          console.error('Error ending space:', error);
        }
      }
    }
    ```

    **Explanation**:
    - **`handleLeave`**:
      - Allows a user to leave the current space, disconnecting from the room and navigating back to the home page.
    
    - **`handleEndSpace`**:
      - Enables the host to end the current space, disconnecting all participants and navigating back to the home page.

6. **Implement Participant Control Functions**:

    ```typescript
    // src/app/components/space-details/space-details.component.ts

    async handleMuteParticipant(targetId: string): Promise<void> {
      const currentSpace = this.space?.value;
      if (currentSpace) {
        try {
          await this.audioVideoService.restrictMedia({
            sourceParameters: this.sourceParameters.value,
            remoteMember: targetId,
            mediaType: 'audio',
          });
          await this.apiService.muteParticipant(currentSpace.id, targetId, true);
          const updatedSpace = await this.apiService.fetchSpaceById(currentSpace.id);
          if (updatedSpace) {
            this.space?.next(updatedSpace);
          }
        } catch (error) {
          console.error('Error muting participant:', error);
        }
      }
    }

    async handleRemoveParticipant(targetId: string): Promise<void> {
      const currentSpace = this.space?.value;
      if (currentSpace) {
        try {
          await this.audioVideoService.removeMember({
            sourceParameters: this.sourceParameters.value,
            remoteMember: targetId
          });
          await this.apiService.banParticipant(currentSpace.id, targetId);
          const updatedSpace = await this.apiService.fetchSpaceById(currentSpace.id);
          if (updatedSpace) {
            this.space?.next(updatedSpace);
          }
        } catch (error) {
          console.error('Error removing participant:', error);
        }
      }
    }
    ```

    **Explanation**:
    - **`handleMuteParticipant`**:
      - Mutes a specific participant in the room by leveraging the `restrictMedia` method from the service.
    
    - **`handleRemoveParticipant`**:
      - Removes a participant from the room by utilizing the `removeMember` method and updating the space's state accordingly.

### 6.3 Additional Functionalities

1. **Handling Audio Levels and Mute States**:

    ```typescript
    // src/app/components/space-details/space-details.component.ts

    audioLevel = new BehaviorSubject<number>(0);
    isMuted = new BehaviorSubject<boolean>(true);
    mediasfuAlert = new BehaviorSubject<string>('');

    // Listen to sourceParameters changes
    ngOnInit(): void {
      // ... existing initialization logic

      combineLatest([
        this.sourceParameters,
        this.space,
      ]).subscribe(([sourceParameters, space]) => {
        if (sourceParameters && space && Object.keys(sourceParameters).length > 0) {
          // Update room name
          if (sourceParameters['roomName'] && sourceParameters['roomName'] !== space.remoteName) {
            this.apiService.updateSpace(space.id, {
              remoteName: sourceParameters['roomName']
            });
            console.log('Updated remote name:', sourceParameters['roomName']);
          }

          // Update connection status
          if (!this.isConnected.value) {
            this.isConnected.next(true);
          }

          // Update audio level
          if (sourceParameters['audioLevel'] !== this.audioLevel.value) {
            this.audioLevel.next(sourceParameters['audioLevel']);
          }

          // Update mute state
          if (sourceParameters['audioAlreadyOn'] !== !this.isMuted.value) {
            this.isMuted.next(!sourceParameters['audioAlreadyOn']);
          }

          // Handle alert messages
          if (sourceParameters['alertMessage'] !== this.mediasfuAlert.value && !sourceParameters['alertMessage'].includes('rotate')) {
            this.mediasfuAlert.next(sourceParameters['alertMessage']);
            if (sourceParameters['alertMessage']) {
              this.message.next(sourceParameters['alertMessage']);
              if (sourceParameters['alertMessage'].includes('meeting has ended')) {
                if (this.isHost() && this.isConnected.value) {
                  this.handleEndSpace();
                } else {
                  this.handleLeave();
                }
              }
            }
          }
        }
      });

      // ... any other initialization logic
    }
    ```

    **Explanation**:
    - **Audio Level**:
      - Tracks the loudness of the audio input, updating the `audioLevel` state accordingly.
    
    - **Mute State**:
      - Synchronizes the `isMuted` state with the `sourceParameters`, ensuring UI reflects the current audio status.
    
    - **Alert Messages**:
      - Handles specific alert messages from MediaSFU, such as meeting termination, to execute appropriate application responses.

2. **Integrate `AudioLevelBars` Component in UI**:

    ```html
    <!-- src/app/components/space-details/space-details.component.html -->

    <!-- Audio Level Visualizer -->
    <app-audio-level-bars
      *ngIf="isConnected | async"
      [audioLevel]="audioLevel.value"
    ></app-audio-level-bars>

    <!-- Audio Grid -->
    <app-audio-grid [componentsToRender]="allRoomAudios"></app-audio-grid>

    <!-- MediaSFU Handler -->
    <app-media-sfu-handler
      *ngIf="showRoom.value"
      [options]="showRoomDetails.value!"
    ></app-media-sfu-handler>

    <!-- Video Grid (Optional, can be removed if focusing on audio) -->
    <div
      class="video-grid"
      *ngIf="allRoomVideos?.length && allRoomVideos.length > 0"
    >
      <div
        *ngFor="let row of allRoomVideos"
        style="display: flex; gap: 1rem; flex: 1; justify-content: center"
      >
        <app-flexible-grid
          *ngIf="row?.length && row.length > 0"
          [customWidth]="400"
          [customHeight]="300"
          [rows]="1"
          [columns]="row.length"
          [componentsToRender]="row"
          [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        ></app-flexible-grid>
      </div>
    </div>

    <!-- Other UI Components -->
    ```

    **Explanation**:
    - **`AudioLevelBars` Component**:
      - Provides a visual representation of the audio levels, enhancing user awareness of audio activity.
    
    - **`AudioGrid` Component**:
      - Displays all audio streams from participants, allowing users to monitor active audio sources.
    
    - **`MediaSFUHandler` Component**:
      - Manages the creation and joining of rooms based on user interactions and application state.

3. **Create `AudioLevelBarsComponent`**

    1. **Create Component Files**:
       - Navigate to `src/app/components` and create a folder named `audio-level-bars-components`.
       - Inside, create `audio-level-bars.component.ts`, `audio-level-bars.component.html`, and `audio-level-bars.component.css`.

    2. **Implement `AudioLevelBarsComponent`**:

        ```typescript
        // src/app/components/audio-level-bars-components/audio-level-bars.component.ts

        import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
        import { CommonModule } from '@angular/common';

        @Component({
          selector: 'app-audio-level-bars',
          templateUrl: './audio-level-bars.component.html',
          styleUrls: ['./audio-level-bars.component.css'],
          standalone: true,
          imports: [CommonModule],
        })
        export class AudioLevelBarsComponent implements OnChanges {
          @Input() audioLevel: number = 0;
          bars: boolean[] = Array(10).fill(false);

          ngOnChanges(changes: SimpleChanges): void {
            if (changes['audioLevel']) {
              this.updateBars();
            }
          }

          private updateBars(): void {
            const normalizedLevel = Math.max(
              0,
              ((this.audioLevel - 127.5) / (275 - 127.5)) * 10
            ); // Normalize audio level to 0–10
            this.bars = this.bars.map((_, index) => index < normalizedLevel);
          }

          getColor(index: number): string {
            // Generate a heatmap gradient from red to green
            const red = Math.max(255 - index * 20, 0); // Decrease red as index increases
            const green = Math.min(index * 20, 255);   // Increase green as index increases
            return `rgb(${red}, ${green}, 0)`;         // Return RGB color
          }
        }
        ```

    3. **Implement Template**:

        ```html
        <!-- src/app/components/audio-level-bars-components/audio-level-bars.component.html -->

        <div class="audio-bars-container">
          <div
            *ngFor="let filled of bars; let i = index"
            class="audio-bar"
            [class.filled]="filled"
            [style.background-color]="filled ? getColor(i) : '#ccc'"
          ></div>
        </div>
        ```

    4. **Implement Styles**:

        ```css
        /* src/app/components/audio-level-bars-components/audio-level-bars.component.css */

        .audio-bars-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 2px;
          height: 0.5rem;
          width: 4rem;
          margin: 0 auto;
        }

        .audio-bar {
          height: 100%;
          width: 10%;
          background-color: #ccc;
          transition: background-color 0.2s, height 0.1s;
          border-radius: 2px;
        }

        .audio-bar.filled {
          height: 100%;
        }
        ```

    5. **Import `AudioLevelBarsComponent` in `SpaceDetails`**:

        ```typescript
        // src/app/components/space-details/space-details.component.ts

        import { AudioLevelBarsComponent } from '../audio-level-bars-components/audio-level-bars.component';
        ```

    6. **Add to Component Imports**:

        ```typescript
        @Component({
          selector: 'app-space-details',
          standalone: true,
          imports: [
            CommonModule,
            ParticipantCardComponent,
            // ... other imports
            MediaSfuHandlerComponent,
            AudioLevelBarsComponent,
            AudioGridComponent,
            FlexibleGridComponent,
          ],
          templateUrl: './space-details.component.html',
          styleUrls: ['./space-details.component.css'],
          providers: [UseMediasfuSdkService],
        })
        export class SpaceDetailsComponent implements OnInit {
          // Component logic
        }
        ```

    7. **Helper Notes**:

    - **Purpose of `AudioLevelBars`**:
      - Provides real-time visualization of audio activity, enhancing user feedback and awareness.
    
    - **Design Considerations**:
      - The component uses a simple heatmap gradient to represent varying audio levels, making it intuitive for users to interpret audio activity.

### 6.4 Synchronize Audio States with `sourceParameters`

Ensure that the audio states within the application are synchronized with the `sourceParameters` provided by MediaSFU.

1. **Update State Changes**:

    ```typescript
    // src/app/components/space-details/space-details.component.ts

    combineLatest([
      this.sourceParameters,
      this.space,
    ]).subscribe(([sourceParameters, space]) => {
      if (sourceParameters && space && Object.keys(sourceParameters).length > 0) {
        // Update room name
        if (sourceParameters['roomName'] && sourceParameters['roomName'] !== space.remoteName) {
          this.apiService.updateSpace(space.id, {
            remoteName: sourceParameters['roomName']
          });
          console.log('Updated remote name:', sourceParameters['roomName']);
        }

        // Update connection status
        if (!this.isConnected.value) {
          this.isConnected.next(true);
        }

        // Update audio level
        if (sourceParameters['audioLevel'] !== this.audioLevel.value) {
          this.audioLevel.next(sourceParameters['audioLevel']);
        }

        // Update mute state
        if (sourceParameters['audioAlreadyOn'] !== !this.isMuted.value) {
          this.isMuted.next(!sourceParameters['audioAlreadyOn']);
        }

        // Handle alert messages
        if (sourceParameters['alertMessage'] !== this.mediasfuAlert.value && !sourceParameters['alertMessage'].includes('rotate')) {
          this.mediasfuAlert.next(sourceParameters['alertMessage']);
          if (sourceParameters['alertMessage']) {
            this.message.next(sourceParameters['alertMessage']);
            if (sourceParameters['alertMessage'].includes('meeting has ended')) {
              if (this.isHost() && this.isConnected.value) {
                this.handleEndSpace();
              } else {
                this.handleLeave();
              }
            }
          }
        }
      }
    });
    ```

    **Explanation**:
    - **Room Name Update**:
      - Synchronizes the `remoteName` in the space state with the `roomName` from MediaSFU.
    
    - **Connection Status**:
      - Updates the `isConnected` state to reflect the current connection status.
    
    - **Audio Level**:
      - Continuously updates the `audioLevel` state to represent the current audio intensity.
    
    - **Mute State**:
      - Synchronizes the `isMuted` state with the `audioAlreadyOn` parameter from MediaSFU.
    
    - **Alert Messages**:
      - Handles specific alert messages, such as meeting termination, to execute appropriate responses like ending or leaving the space.

2. **Helper Notes**:

- **State Synchronization**:
  - Ensuring that the application's internal state reflects the external `sourceParameters` provided by MediaSFU is crucial for consistent user experiences.

- **Alert Handling**:
  - Properly handling alerts from MediaSFU ensures that users are informed about critical events like meeting termination, enhancing application reliability.

### 6.5 Finalizing Audio Control Integration

Ensure that audio controls are fully integrated and responsive within the `SpaceDetails` component.

1. **Integrate `toggleAudio` in UI Controls**:

    ```html
    <!-- src/app/components/space-details/space-details.component.html -->

    <!-- Toggle Audio Button -->
    <button class="toggle-mic-btn" (click)="handleToggleMic()">
      {{ isMuted.value ? 'Unmute' : 'Mute' }}
    </button>
    ```

    **Explanation**:
    - **Button Functionality**:
      - Toggles the user's microphone on or off based on the current `isMuted` state.
    
    - **Dynamic Label**:
      - The button label changes dynamically to reflect the current state (`Mute` or `Unmute`).

2. **Style the Toggle Button**:

    ```css
    /* src/app/components/space-details/space-details.component.css */

    .toggle-mic-btn {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 1rem;
    }

    .toggle-mic-btn:hover {
      background-color: #0056b3;
    }
    ```

    **Explanation**:
    - **Styling**:
      - Provides a visually appealing and intuitive button for toggling audio controls.
    
    - **Hover Effect**:
      - Enhances user interaction by changing the button color on hover.

3. **Helper Notes**:

- **User Feedback**:
  - Dynamic labels and responsive controls enhance user understanding and interaction with audio functionalities.
  
- **Accessibility**:
  - Ensure that the button is accessible via keyboard navigation and screen readers for better usability.

---

## Step 7: Finalize Test and Comments

With all functionalities implemented, it's time to conduct thorough testing and finalize your integration.

### 7.1 Comprehensive Testing

1. **Join as Multiple Participants**:
   - **Host**: Use one device or emulator to create and manage the room.
   - **Participants**: Use additional devices or emulators to join as participants.
   - **Interaction**: Test audio toggling across multiple participants, and as the host, attempt to mute and remove participants to verify control functionalities.

2. **Test Audio Controls**:
   - **Mute/Unmute**: Toggle the microphone to ensure that audio states update correctly across participants.
   - **Audio Level Visualization**: Observe the `AudioLevelBars` to confirm that audio levels reflect real-time audio input.

3. **Participant Management**:
   - **Mute Participant**: As the host, mute a participant and verify that their audio is disabled.
   - **Remove Participant**: Remove a participant and ensure they are disconnected from the room.

4. **Handle Alerts**:
   - **Meeting Ended**: End the meeting and verify that all participants are appropriately notified and redirected.

### 7.2 UI Polishing

1. **Remove Unnecessary Components**:
   - **FlexibleGrid**: Since the focus is on audio transmission, remove any video grids or components that are not relevant to audio functionalities.

    ```html
    <!-- src/app/components/space-details/space-details.component.html -->

    <!-- Remove or comment out FlexibleGrid components -->
    <!--
    <app-flexible-grid
      [customWidth]="400"
      [customHeight]="300"
      [rows]="1"
      [columns]="allRoomVideos.length"
      [componentsToRender]="allRoomVideos"
      [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
    ></app-flexible-grid>
    -->
    ```

2. **Focus on AudioGrid**:
   - **Enhance AudioGrid**: Ensure that the `AudioGrid` component accurately displays all audio streams without clutter.

    ```html
    <!-- src/app/components/space-details/space-details.component.html -->

    <!-- Audio Grid -->
    <app-audio-grid [componentsToRender]="allRoomAudios"></app-audio-grid>
    ```

    **Helper Note**:
    - **UI Clarity**: A clean and focused UI enhances user interaction and reduces confusion, especially when prioritizing audio functionalities.

3. **Finalize Alert Handling**:
   - **Consistent Messaging**: Ensure that all alert messages are handled gracefully, providing users with clear and actionable information.

    ```typescript
    // src/app/components/space-details/space-details.component.ts

    if (sourceParameters['alertMessage'] !== this.mediasfuAlert.value && !sourceParameters['alertMessage'].includes('rotate')) {
      this.mediasfuAlert.next(sourceParameters['alertMessage']);
      if (sourceParameters['alertMessage']) {
        this.message.next(sourceParameters['alertMessage']);
        if (sourceParameters['alertMessage'].includes('meeting has ended')) {
          if (this.isHost() && this.isConnected.value) {
            this.handleEndSpace();
          } else {
            this.handleLeave();
          }
        }
      }
    }
    ```

    **Explanation**:
    - **Alert Filtering**: Ignores specific messages like 'rotate' while handling critical alerts like 'meeting has ended'.
    - **Action Execution**: Executes appropriate actions based on the alert message, such as ending or leaving the space.

4. **Helper Notes**:

- **User Trust**:
  - Proper alert handling improves user trust and application reliability by ensuring users are informed about significant events.

- **Scalability**:
  - Maintaining a streamlined UI focused on audio ensures that the application remains scalable and responsive, even with numerous participants.

---

## Conclusion

Congratulations! You've successfully integrated the `mediasfu-angular` package into your Angular project, enabling robust audio media transmission within the SpacesTek application. This setup allows for:

- **Audio Controls**: Users can toggle their microphones, and hosts can manage participant audio.
- **Participant Management**: Hosts have the authority to mute or remove participants, ensuring controlled interactions.
- **Audio Visualization**: Real-time audio level visualization enhances user awareness and engagement.

### **Key Takeaways**:

- **MediaSFU Integration**: Leveraging MediaSFU's Angular SDK simplifies the implementation of real-time audio communication in your application.
- **Component-Based Architecture**: Isolating MediaSFU functionalities within dedicated components (`MediaSfuHandlerComponent`, `AudioLevelBarsComponent`) enhances code maintainability and scalability.
- **Audio Controls and Management**: Implementing robust audio controls ensures that users have full control over their communication experience.
- **Security and Best Practices**: Storing API credentials securely and adhering to best practices in dependency management safeguards your application against potential vulnerabilities.

### **Next Steps**:

In **Part 2** of this tutorial, we will explore more advanced features, including:

- **Screen Sharing**: Implementing screen sharing capabilities for enhanced collaboration.
- **Custom Streams**: Utilizing custom media streams to tailor the user experience.
- **Custom Components**: Building bespoke components to further customize MediaSFU's functionality within your application.

Thank you for following this integration guide. Your enhanced MediaSFU setup empowers SpacesTek to deliver a seamless and interactive audio communication experience. Stay tuned for the next part of this series to unlock even more sophisticated features.
