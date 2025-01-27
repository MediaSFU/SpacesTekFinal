import { Injectable } from '@angular/core';
import { ClickAudioOptions, ClickAudio, ConfirmExitOptions, ConfirmExit,
   ControlMediaOptions, ControlMedia, Participant, RemoveParticipantsOptions, RemoveParticipants } from "mediasfu-angular";


interface UseAudioVideoSDKProps {
  sourceParameters: Record<string, any>;
  deviceId?: string;
}

interface MediaControlsProps {
  sourceParameters: Record<string, any>;
  remoteMember: String;
  mediaType?: "audio" | "video" | "screenshare" | "all";
}

@Injectable({
  providedIn: 'root',
})

export class UseMediasfuSdkService {
  constructor(
    private clickAudio: ClickAudio,
    private confirmExit: ConfirmExit,
    private controlMedia: ControlMedia,
    private removeParticipants: RemoveParticipants,
  ) { }

  async disconnectRoom({ sourceParameters }: UseAudioVideoSDKProps): Promise<void> {
    try {
      if (Object.keys(sourceParameters).length > 0) {
        const options: ConfirmExitOptions = {
          member: sourceParameters['member'],
          socket: sourceParameters['socket'],
          localSocket: sourceParameters['localSocket']!,
          roomName: sourceParameters['roomName'],
          ban: false,
        }
        await this.confirmExit.confirmExit(options);
      }
    } catch (error) {
      console.error("Error disconnecting room:", error);
    }
  }

  async toggleAudio({ sourceParameters }: UseAudioVideoSDKProps): Promise<void> {
    try {
      if (Object.keys(sourceParameters).length > 0) {
        const options: ClickAudioOptions = {
          parameters: sourceParameters as ClickAudioOptions["parameters"],
        }
        await this.clickAudio.clickAudio(options);
      }
    } catch (error) {
      console.error("Error toggling audio:", error);
    }
  }

  async restrictMedia({ sourceParameters, remoteMember, mediaType }: MediaControlsProps): Promise<void> {
    try {
      if (Object.keys(sourceParameters).length > 0) {
        const isHost = sourceParameters['islevel'] === '2';

        if (!isHost) {
          throw new Error("Only the host can restrict media.");
        }
        const participant = sourceParameters['participants'].find((p: Participant) => p.name === remoteMember);
        if (!participant) {
          throw new Error("Participant not found.");
        }

        const options: ControlMediaOptions = {
          participantId: participant.id || "",
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
        }

        await this.controlMedia.controlMedia(options);

      }
    } catch (error) {
      console.error("Error restricting media:", error);
    }
  }

  async removeMember({ sourceParameters, remoteMember }: MediaControlsProps): Promise<void> {
    try {
      if (Object.keys(sourceParameters).length > 0) {
        const isHost = sourceParameters['islevel'] === '2';

        if (!isHost) {
          throw new Error("Only the host can remove a member.");
        }
        const participant = sourceParameters['participants'].find((p: Participant) => p.name === remoteMember);
        if (!participant) {
          throw new Error("Participant not found.");
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
        }

        await this.removeParticipants.removeParticipants(options);
      }
    } catch (error) {
      console.error("Error removing member:", error);
    }
  }

}
