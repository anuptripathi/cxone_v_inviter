"use client";

import { useState } from "react";

interface GenderFormSelectionProps {
  onBack: () => void;
  onCreateCall: (formData: {
    gender: string;
    department: string;
    mrn: string;
  }) => void;
}

export default function GenderFormSelection({
  onBack,
  onCreateCall,
}: GenderFormSelectionProps) {
  const [gender, setGender] = useState("No Preference");
  const [department, setDepartment] = useState("Pediatrics");
  const [mrn, setMrn] = useState("");

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleCreateCall = () => {
    onCreateCall({
      gender,
      department,
      mrn,
    });
  };

  return (
    <main className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2.5">On-Demand Video Call</h2>
      <p className="text-gray-600 mb-5">Please select the Gender</p>

      <div className="flex gap-2.5 mb-5">
        {["No Preference", "Male", "Female"].map((genderOption) => (
          <button
            key={genderOption}
            onClick={() => handleGenderSelect(genderOption)}
            className={`flex-1 p-3 border rounded-lg cursor-pointer text-center ${
              gender === genderOption
                ? "bg-red-600 text-white border-red-600"
                : "bg-gray-50 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {genderOption}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-5">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="flex-1 p-2.5 rounded-lg border border-gray-300"
        >
          <option value="Pediatrics">Pediatrics</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
        </select>
        <input
          type="text"
          value={mrn}
          onChange={(e) => setMrn(e.target.value)}
          placeholder="Enter MRN"
          className="flex-1 p-2.5 rounded-lg border border-gray-300"
        />
      </div>

      <div className="flex justify-end gap-2.5">
        <button
          onClick={onBack}
          className="px-5 py-3 border border-gray-300 rounded-lg cursor-pointer font-bold bg-white hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleCreateCall}
          className="px-5 py-3 border-none rounded-lg cursor-pointer font-bold bg-red-600 text-white hover:bg-red-700"
        >
          Call
        </button>
      </div>
    </main>
  );
}
