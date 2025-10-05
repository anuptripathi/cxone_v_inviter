"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("--:--:--");

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex justify-between items-center px-5 py-2.5 bg-white border-b-2 border-gray-200">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="InterpVault Logo"
          width={32}
          height={32}
          className="h-8"
        />
        <div className="text-base font-bold text-gray-800">{currentTime}</div>
      </div>
      <div className="flex items-center gap-2.5">
        <button className="bg-yellow-300 border-none rounded-md px-3.5 py-2 cursor-pointer font-bold">
          Upcoming Schedule
        </button>
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          CH
        </div>
      </div>
    </header>
  );
}
