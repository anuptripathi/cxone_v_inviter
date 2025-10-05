"use client";

import { useState } from "react";
import { config } from "../config";

interface LanguageSelectionProps {
  onNext: (selectedLanguage: string, skillNumber: string) => void;
  onReset: () => void;
}

export default function LanguageSelection({
  onNext,
  onReset,
}: LanguageSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = Object.keys(config.skillNumberMap);

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleNext = () => {
    const skillNumber =
      config.skillNumberMap[
        selectedLanguage as keyof typeof config.skillNumberMap
      ];
    onNext(selectedLanguage, skillNumber);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedLanguage("English");
    onReset();
  };

  return (
    <main className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2.5">On-Demand Video Call</h2>
      <p className="text-gray-600 mb-4">
        Kindly choose the language for interpretation.
      </p>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="w-full p-2.5 rounded-lg border border-gray-300"
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2.5 mb-5">
        {filteredLanguages.map((language) => (
          <button
            key={language}
            onClick={() => handleLanguageSelect(language)}
            className={`p-3 border rounded-lg cursor-pointer text-center text-sm ${
              selectedLanguage === language
                ? "bg-red-600 text-white border-red-600"
                : "bg-gray-50 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {language}
          </button>
        ))}
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={handleReset}
          className="px-5 py-3 border border-gray-300 rounded-lg cursor-pointer mr-2.5 font-bold bg-white hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          onClick={handleNext}
          className="px-5 py-3 border-none rounded-lg cursor-pointer font-bold bg-red-600 text-white hover:bg-red-700"
        >
          Next
        </button>
      </div>
    </main>
  );
}
