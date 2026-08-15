"use client";

import { useState } from "react";

export default function AttendancePage() {
  const [isStarted, setIsStarted] = useState(false);

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


      {/* Attendance Control */}

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl">

        <div className="mb-8">

          <h2 className="text-xl font-semibold">
            Attendance Session
          </h2>

          <p className="text-gray-500 mt-2">
            Select a class and start the AI attendance session.
          </p>

        </div>


        {/* Class Selection */}

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

        <div className="border rounded-xl p-8 text-center mb-8">

          <div className="text-5xl mb-4">
            🎙️
          </div>

          {isStarted ? (

            <>
              <h3 className="text-xl font-semibold">
                Attendance in progress
              </h3>

              <p className="text-gray-500 mt-2">
                AI is ready to call students.
              </p>
            </>

          ) : (

            <>
              <h3 className="text-xl font-semibold">
                Ready to take attendance
              </h3>

              <p className="text-gray-500 mt-2">
                Start the session to begin voice attendance.
              </p>
            </>

          )}

        </div>


        {/* Start Button */}

        <div className="flex justify-center">

          <button
            onClick={() => setIsStarted(!isStarted)}
            className="px-8 py-4 bg-black text-white rounded-xl font-semibold"
          >

            {isStarted
              ? "Stop Attendance"
              : "🎙️ Start Voice Attendance"}

          </button>

        </div>

      </div>


      {/* Attendance Summary */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl">

        <div className="bg-white p-6 rounded-xl">

          <p className="text-gray-500">
            Total Students
          </p>

          <p className="text-3xl font-bold mt-2">
            58
          </p>

        </div>


        <div className="bg-white p-6 rounded-xl">

          <p className="text-gray-500">
            Present
          </p>

          <p className="text-3xl font-bold mt-2">
            0
          </p>

        </div>


        <div className="bg-white p-6 rounded-xl">

          <p className="text-gray-500">
            Absent
          </p>

          <p className="text-3xl font-bold mt-2">
            0
          </p>

        </div>

      </div>

    </main>
  );
}