import 'package:flutter/foundation.dart';
import 'package:mediasfu_sdk/mediasfu_sdk.dart';

Future<void> disconnectRoom({
  MediasfuParameters? sourceParameters,
}) async {
  try {
    if (sourceParameters == null) {
      throw Exception("Source parameters are required.");
    }
    if (sourceParameters.roomName != "") {
      // we need confirmExit and ConfirmExitOptions

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
    debugPrint("Error disconnecting room: $e");
  }
}

Future<void> toggleAudio({
  MediasfuParameters? sourceParameters,
}) async {
  try {
    if (sourceParameters == null) {
      throw Exception("Source parameters are required.");
    }
    if (sourceParameters.roomName != "") {
      // we need clickAudio and ClickAudioOptions

      final options = ClickAudioOptions(
        parameters: sourceParameters,
      );

      await clickAudio(options);
    }
  } catch (e) {
    debugPrint("Error toggling audio: $e");
  }
}

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
      // You must be host ('islevel' == '2')
      final isHost = sourceParameters.islevel == '2';
      if (!isHost) {
        throw Exception("You must be host to restrict media.");
      }

      // we need controlMedia and ControlMediaOptions
      final participant = sourceParameters.participants.firstWhere(
        (p) => p.name == remoteMember,
        orElse: () => throw Exception("Participant not found."),
      );

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
    }
  } catch (e) {
    debugPrint("Error restricting media: $e");
  }
}

Future<void> removeMember({
  MediasfuParameters? sourceParameters,
  required String remoteMember,
}) async {
  try {
    if (sourceParameters == null) {
      throw Exception("Source parameters are required.");
    }

    if (sourceParameters.roomName != "") {
      // You must be host ('islevel' == '2')
      final isHost = sourceParameters.islevel == '2';
      if (!isHost) {
        throw Exception("You must be host to remove a member.");
      }

      // we need removeParticipants and RemoveParticipantsOptions
      final participant = sourceParameters.participants.firstWhere(
        (p) => p.name == remoteMember,
        orElse: () => throw Exception("Participant not found."),
      );

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
    }
  } catch (e) {
    debugPrint("Error removing member: $e");
  }
}
