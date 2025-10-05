import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomName = searchParams.get("roomName");

    if (!roomName) {
      return NextResponse.json({ error: "roomName required" }, { status: 400 });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKey = process.env.TWILIO_API_KEY_SID;
    const apiSecret = process.env.TWILIO_API_KEY_SECRET;

    if (!accountSid || !apiKey || !apiSecret) {
      console.error("Missing Twilio environment variables:", {
        TWILIO_ACCOUNT_SID: accountSid ? "SET" : "NOT SET",
        TWILIO_API_KEY_SID: apiKey ? "SET" : "NOT SET",
        TWILIO_API_KEY_SECRET: apiSecret ? "SET" : "NOT SET",
      });
      return NextResponse.json(
        {
          error: "Twilio env vars not configured",
          message:
            "Please set TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, and TWILIO_API_KEY_SECRET environment variables",
        },
        { status: 500 }
      );
    }

    const client = twilio(apiKey, apiSecret, { accountSid });

    // Find in-progress room by uniqueName
    let room;
    const inProgressRooms = await client.video.v1.rooms.list({
      status: "in-progress",
      limit: 50,
    });
    room = inProgressRooms.find(
      (r) => r.uniqueName === roomName || r.unique_name === roomName
    );

    if (!room) {
      console.log(`[room-status] room not found for name=${roomName}`);
      return NextResponse.json({ connected: false, participantCount: 0 });
    }

    if (room.status === "completed") {
      console.log(`[room-status] room is completed name=${roomName}`);
      return NextResponse.json({ connected: false, participantCount: 0 });
    }

    const participants = await client.video.v1
      .rooms(room.sid)
      .participants.list({ status: "connected", limit: 50 });
    const participantCount = participants.length;

    console.log(
      `[room-status] name=${roomName} sid=${room.sid} participants=${participantCount}`
    );

    return NextResponse.json({
      connected: participantCount > 0,
      participantCount,
    });
  } catch (err: any) {
    console.error("/room-status error", err);
    console.error("Error details:", {
      message: err.message,
      code: err.code,
      status: err.status,
      stack: err.stack,
    });
    return NextResponse.json(
      {
        error: "internal_error",
        message: err.message,
        details: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
      { status: 500 }
    );
  }
}
