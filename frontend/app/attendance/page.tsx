"use client";

import { useState } from "react";

export default function AttendancePage() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(1);

  const totalStudents = 10;

  // Make the browser speak
  const speakRollNumber = (roll: number) => {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      `Roll number ${roll}`
    );

    message.rate = 0.9;
    message.pitch = 1;

    window.speechSynthesis.speak(message);
  };

  // Start attendance
  const startAttendance = () => {
    setIsStarted(true);
    setCurrentRoll(1);

    setTimeout(() => {
      speakRollNumber(1);
    }, 500);
  };

  // Call next student
  const nextStudent = () => {
    if (currentRoll < totalStudents) {
      const nextRoll = currentRoll + 1;

      setCurrentRoll(nextRoll);

      setTimeout(() => {
        speakRollNumber(nextRoll);
      }, 300);
    }
  };

  // Stop attendance
  const stopAttendance = () => {
    window.speechSynthesis.cancel();

    setIsStarted(false);
    setCurrentRoll(1);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Voice Attendance
        </h1>

        <p className="text-gray-500 mt-2">
          Take attendance using AI voice interaction.
        </p>
      </div>


      {/* Attendance Card */}

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl">

        <h2 className="text-xl font-semibold mb-2">
          Attendance Session
        </h2>

        <p className="text-gray-500 mb-8">
          Start the session and the AI will call students by roll number.
        </p>


        {/* Class and Date */}

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div>
            <label className="block text-sm font-medium mb-2">
              Select Class
            </label>

            <select className="w-full border rounded-lg p-3">
              <option>
                Bioinformatics - Section 48
              </option>

              <option>
                Biochemistry - Section 48
              </option>
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium mb-2">
              Date
            </label>

            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>


        {/* Voice Status */}

        <div className="border rounded-xl p-10 text-center mb-8">

          <div className="text-6xl mb-5">
            🎙️
          </div>

          {!isStarted ? (

            <>
              <h3 className="text-2xl font-semibold">
                Ready to take attendance
              </h3>

              <p className="text-gray-500 mt-2">
                Start the session to begin.
              </p>
            </>

          ) : (

            <>
              <p className="text-gray-500">
                AI is calling:
              </p>

              <h3 className="text-4xl font-bold mt-3">
                Roll Number {currentRoll}
              </h3>

              <p className="text-gray-500 mt-3">
                Please respond when your roll number is called.
              </p>
            </>

          )}

        </div>


        {/* Buttons */}

        <div className="flex justify-center gap-4">

          {!isStarted ? (

            <button
              onClick={startAttendance}
              className="px-8 py-4 bg-black text-white rounded-xl font-semibold"
            >
              🎙️ Start Voice Attendance
            </button>

          ) : (

            <>
              <button
                onClick={nextStudent}
                className="px-8 py-4 bg-black text-white rounded-xl font-semibold"
              >
                🔊 Call Next Student
              </button>

              <button
                onClick={stopAttendance}
                className="px-8 py-4 border rounded-xl font-semibold"
              >
                Stop Attendance
              </button>
            </>

          )}

        </div>

      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl">

        <div className="bg-white p-6 rounded-xl">
          <p className="text-gray-500">
            Total Students
          </p>

          <p className="text-3xl font-bold mt-2">
            {totalStudents}
          </p>
        </div>


        <div className="bg-white p-6 rounded-xl">
          <p className="text-gray-500">
            Current Roll
          </p>

          <p className="text-3xl font-bold mt-2">
            {currentRoll}
          </p>
        </div>


        <div className="bg-white p-6 rounded-xl">
          <p className="text-gray-500">
            Status
          </p>

          <p className="text-xl font-bold mt-2">
            {isStarted ? "Active" : "Not Started"}
          </p>
        </div>

      </div>

    </main>
  );
}