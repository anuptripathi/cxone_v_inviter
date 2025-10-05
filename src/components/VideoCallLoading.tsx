"use client";

import { useState, useEffect } from "react";

interface VideoCallLoadingProps {
  roomName: string;
  onCancel: () => void;
  onJoin: () => void;
}

export default function VideoCallLoading({
  roomName,
  onCancel,
  onJoin,
}: VideoCallLoadingProps) {
  const [showJoinButton, setShowJoinButton] = useState(false);

  useEffect(() => {
    if (!roomName) return;

    const intervalId: ReturnType<typeof setInterval> = setInterval(
      pollRoomStatus,
      3000
    );

    async function pollRoomStatus() {
      try {
        const response = await fetch(
          `/api/room-status?roomName=${encodeURIComponent(roomName)}`
        );
        if (!response.ok) return;

        const data = await response.json();
        const isReady = data.connected && data.participantCount > 0;

        if (isReady) {
          setShowJoinButton(true);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error polling room status:", error);
      }
    }

    pollRoomStatus(); // Initial call

    return () => clearInterval(intervalId);
  }, [roomName]);

  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        {!showJoinButton && (
          <>
            {/* Spinner */}
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-center"
            >
              <div className="inline-block w-20 h-20 border-8 border-gray-200 rounded-full border-t-red-600 animate-spin" />
              <span className="sr-only">Connecting…</span>
            </div>

            {/* Status text */}
            <p className="mt-5 text-xl text-red-600">
              Please wait to be connected
            </p>

            {/* Cancel button centered */}
            <div className="mt-5">
              <button
                onClick={onCancel}
                className="bg-white border-2 border-red-600 px-5 py-2.5 rounded-lg cursor-pointer text-red-600 font-bold hover:bg-red-50"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {showJoinButton && (
          <>
            {/* Optional: subtle success cue in place of spinner */}
            <div className="mb-2 text-sm text-gray-500">You can join now</div>

            {/* Buttons side-by-side and centered */}
            <div className="mt-2 flex items-center justify-center gap-3">
              <button
                onClick={onJoin}
                className="bg-green-600 text-white rounded-lg px-5 py-3 cursor-pointer font-bold hover:bg-green-700"
              >
                Join now
              </button>
              <button
                onClick={onCancel}
                className="bg-white border-2 border-red-600 px-5 py-3 rounded-lg cursor-pointer text-red-600 font-bold hover:bg-red-50"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
