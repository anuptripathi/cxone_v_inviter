"use client";

import { useState, useEffect } from "react";
import Header from "../src/components/Header";
import LanguageSelection from "../src/components/LanguageSelection";
import GenderFormSelection from "../src/components/GenderFormSelection";
import VideoCallLoading from "../src/components/VideoCallLoading";
import { config } from "../src/config";

type Screen = "language" | "gender-form" | "loading";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("language");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [skillNumber, setSkillNumber] = useState("");
  const [activeRoomName, setActiveRoomName] = useState("");
  const [randomIdNice, setRandomIdNice] = useState("");

  // Generate random ID for NICE CXone
  const generateRandomId = () => {
    const newId = Math.random().toString(36).substring(7) + "-" + Date.now();
    setRandomIdNice(newId);
    return newId;
  };

  // Signal work item to NICE CXone
  const signalWorkItem = (followerLink: string) => {
    const id = generateRandomId();
    const url = new URL(config.videoSignalerURL);
    url.searchParams.set("p1", "startWorkItem");
    url.searchParams.set("p2", followerLink);
    url.searchParams.set("p3", id);
    url.searchParams.set("p5", skillNumber);

    // Use no-cors mode for cross-origin request
    fetch(url.toString(), { mode: "no-cors" }).catch(console.error);
  };

  // End work item
  const endWorkItem = (followerLink: string) => {
    const url = new URL(config.videoSignalerURL);
    url.searchParams.set("p1", "endWorkItem");
    url.searchParams.set("p2", followerLink);
    url.searchParams.set("p3", randomIdNice);

    fetch(url.toString(), { mode: "no-cors" }).catch(console.error);
  };

  // Generate room name
  const generateRoomName = () => {
    return (
      "room-" + Math.random().toString(36).substring(2, 8) + "-" + Date.now()
    );
  };

  const handleLanguageNext = (language: string, skill: string) => {
    setSelectedLanguage(language);
    setSkillNumber(skill);
    setCurrentScreen("gender-form");
  };

  const handleLanguageReset = () => {
    setSelectedLanguage("");
    setSkillNumber("");
  };

  const handleGenderFormBack = () => {
    setCurrentScreen("language");
  };

  const handleCreateCall = (formData: {
    gender: string;
    department: string;
    mrn: string;
  }) => {
    const roomName = generateRoomName();
    setActiveRoomName(roomName);

    const twilioUrl = new URL(config.twilioBaseURL);
    twilioUrl.searchParams.set("room", roomName);
    twilioUrl.searchParams.set("xtr", "1");
    const link = twilioUrl.toString();

    signalWorkItem(link);
    setCurrentScreen("loading");
  };

  const handleCancelCall = () => {
    if (activeRoomName) {
      const twilioUrl = new URL(config.twilioBaseURL);
      twilioUrl.searchParams.set("room", activeRoomName);
      const link = twilioUrl.toString();

      endWorkItem(link);
    }

    setCurrentScreen("language");
    setActiveRoomName("");
  };

  const handleJoinCall = () => {
    if (activeRoomName) {
      const twilioUrl = new URL(config.twilioBaseURL);
      twilioUrl.searchParams.set("room", activeRoomName);
      window.open(twilioUrl.toString(), "_blank");
    }
  };

  // Load NICE ChatClient
  useEffect(() => {
    const nicHomeURL = `https://home-${config.clusterNiC}.niceincontact.com`;
    const chatSrc = document.createElement("script");
    chatSrc.src = `${nicHomeURL}/inContact/ChatClient/js/embed.min.js`;
    document.head.appendChild(chatSrc);

    return () => {
      if (document.head.contains(chatSrc)) {
        document.head.removeChild(chatSrc);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-800">
      <Header />

      {currentScreen === "language" && (
        <LanguageSelection
          onNext={handleLanguageNext}
          onReset={handleLanguageReset}
        />
      )}

      {currentScreen === "gender-form" && (
        <GenderFormSelection
          onBack={handleGenderFormBack}
          onCreateCall={handleCreateCall}
        />
      )}

      {currentScreen === "loading" && (
        <VideoCallLoading
          roomName={activeRoomName}
          onCancel={handleCancelCall}
          onJoin={handleJoinCall}
        />
      )}
    </div>
  );
}
