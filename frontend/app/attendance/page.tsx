"use client";

import { useRef, useState } from "react";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;

  start: () => void;
  stop: () => void;

  onresult:
    | ((event: SpeechRecognitionEvent) => void)
    | null;

  onend:
    | (() => void)
    | null;

  onerror:
    | ((event: Event) => void)
    | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

type AttendanceStatus =
  | "Present"
  | "Absent"
  | "Pending"
  | "Unclear";

interface Student {
  roll: number;
  status: AttendanceStatus;
}

export default function AttendancePage() {

  const totalStudents = 10;

  const [isStarted, setIsStarted] =
    useState(false);

  const [currentRoll, setCurrentRoll] =
    useState(1);

  const [isListening, setIsListening] =
    useState(false);

  const [recognizedText, setRecognizedText] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [students, setStudents] =
    useState<Student[]>(
      Array.from(
        { length: totalStudents },
        (_, index) => ({
          roll: index + 1,
          status: "Pending",
        })
      )
    );

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const timeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);


  // ==========================================
  // SPEAK
  // ==========================================

  const speak = (
    text: string,
    onComplete?: () => void
  ) => {

    if (!("speechSynthesis" in window)) {

      onComplete?.();

      return;

    }

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.rate = 0.85;

    speech.pitch = 1;

    speech.volume = 1;

    speech.onend = () => {

      onComplete?.();

    };

    window.speechSynthesis.speak(
      speech
    );

  };


  // ==========================================
  // CALL STUDENT
  // ==========================================

  const callStudent = (
    roll: number
  ) => {

    setRecognizedText("");

    setMessage(
      `Calling roll number ${roll}...`
    );

    speak(
      `Roll number ${roll}. Please say yes.`,
      () => {

        setMessage(
          `Listening for roll number ${roll}...`
        );

      }
    );

  };


  // ==========================================
  // NORMALIZE RESPONSE
  // ==========================================

  const normalizeResponse = (
    text: string
  ) => {

    return text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .trim();

  };


  // ==========================================
  // CHECK YES
  // ==========================================

  const isPositiveResponse = (
    text: string
  ) => {

    const response =
      normalizeResponse(text);


    const positiveWords = [
      "yes",
      "yeah",
      "yep",
      "yup",
      "ya",
      "here",
      "present",
      "present sir",
      "present maam",
      "present madam",
      "yes sir",
      "yes maam",
      "yes madam",
    ];


    return positiveWords.some(
      (word) =>
        response === word ||
        response.includes(word)
    );

  };


  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const updateStatus = (
    roll: number,
    status: AttendanceStatus
  ) => {

    setStudents(
      previous =>
        previous.map(
          student =>
            student.roll === roll
              ? {
                  ...student,
                  status,
                }
              : student
        )
    );

  };


  // ==========================================
  // START LISTENING
  // ==========================================

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      alert(
        "Speech recognition is not supported. Please use Google Chrome."
      );

      return;

    }


    if (
      recognitionRef.current
    ) {

      recognitionRef.current.stop();

    }


    const recognition =
      new SpeechRecognition();


    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    recognition.lang =
      "en-IN";


    recognition.onresult =
      (event) => {

        const transcript =
          event
            .results[0][0]
            .transcript;


        setRecognizedText(
          transcript
        );


        if (
          isPositiveResponse(
            transcript
          )
        ) {

          updateStatus(
            currentRoll,
            "Present"
          );


          setMessage(
            `✓ Roll number ${currentRoll} marked Present`
          );


          speak(
            "Attendance recorded."
          );

        } else {

          updateStatus(
            currentRoll,
            "Unclear"
          );


          setMessage(
            "I couldn't understand the response."
          );

        }


        setIsListening(
          false
        );

      };


    recognition.onerror =
      () => {

        setIsListening(
          false
        );


        updateStatus(
          currentRoll,
          "Unclear"
        );


        setMessage(
          "I couldn't hear you. Please try again."
        );

      };


    recognition.onend =
      () => {

        setIsListening(
          false
        );

      };


    recognitionRef.current =
      recognition;


    setRecognizedText("");

    setMessage(
      "🎤 Listening... Please say YES."
    );

    setIsListening(
      true
    );


    recognition.start();


    // Stop listening after 6 seconds

    timeoutRef.current =
      setTimeout(
        () => {

          recognition.stop();

          setIsListening(
            false
          );

          setMessage(
            "No clear response detected. Please try again."
          );

        },
        6000
      );

  };


  // ==========================================
  // START ATTENDANCE
  // ==========================================

  const startAttendance = () => {

    setIsStarted(true);

    setCurrentRoll(1);

    setRecognizedText("");

    setMessage(
      "Starting attendance..."
    );


    setStudents(
      Array.from(
        { length: totalStudents },
        (_, index) => ({
          roll: index + 1,
          status: "Pending",
        })
      )
    );


    setTimeout(
      () => {

        callStudent(1);

      },
      500
    );

  };


  // ==========================================
  // NEXT STUDENT
  // ==========================================

  const nextStudent = () => {

    if (
      currentRoll >=
      totalStudents
    ) {

      setMessage(
        "All students have been called."
      );

      return;

    }


    const nextRoll =
      currentRoll + 1;


    setCurrentRoll(
      nextRoll
    );


    setRecognizedText("");


    setTimeout(
      () => {

        callStudent(
          nextRoll
        );

      },
      300
    );

  };


  // ==========================================
  // RETRY
  // ==========================================

  const retryCurrentStudent =
    () => {

      updateStatus(
        currentRoll,
        "Pending"
      );


      setRecognizedText("");


      callStudent(
        currentRoll
      );

    };


  // ==========================================
  // MANUAL PRESENT
  // ==========================================

  const markPresent = () => {

    updateStatus(
      currentRoll,
      "Present"
    );


    setMessage(
      `✓ Roll number ${currentRoll} manually marked Present`
    );

  };


  // ==========================================
  // MANUAL ABSENT
  // ==========================================

  const markAbsent = () => {

    updateStatus(
      currentRoll,
      "Absent"
    );


    setMessage(
      `Roll number ${currentRoll} marked Absent`
    );

  };


  // ==========================================
  // STOP
  // ==========================================

  const stopAttendance = () => {

    window.speechSynthesis.cancel();

    recognitionRef.current?.stop();


    if (
      timeoutRef.current
    ) {

      clearTimeout(
        timeoutRef.current
      );

    }


    setIsListening(
      false
    );

    setIsStarted(
      false
    );

    setCurrentRoll(
      1
    );

    setMessage("");

  };


  // ==========================================
  // COUNTS
  // ==========================================

  const presentCount =
    students.filter(
      student =>
        student.status ===
        "Present"
    ).length;


  const absentCount =
    students.filter(
      student =>
        student.status ===
        "Absent"
    ).length;


  const pendingCount =
    students.filter(
      student =>
        student.status ===
        "Pending"
    ).length;


  return (

    <main className="min-h-screen bg-gray-100 p-8">


      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Voice Attendance

        </h1>


        <p className="text-gray-500 mt-2">

          AI-assisted classroom attendance.

        </p>

      </div>



      {/* SESSION CARD */}

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-5xl">


        <h2 className="text-xl font-semibold">

          Attendance Session

        </h2>


        <p className="text-gray-500 mt-2 mb-8">

          The AI calls each roll number and
          waits for a confirmation.

        </p>



        {/* CLASS */}

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



        {/* CURRENT STUDENT */}

        <div className="border rounded-xl p-10 text-center">


          <div className="text-6xl">

            {isListening
              ? "🎤"
              : "🎙️"}

          </div>


          <p className="text-gray-500 mt-5">

            Current Roll Number

          </p>


          <h3 className="text-5xl font-bold mt-2">

            {currentRoll}

          </h3>


          <p className="text-gray-500 mt-4">

            {message ||
              "Start attendance to begin."}

          </p>


          {recognizedText && (

            <div className="mt-5">

              <p className="text-sm text-gray-500">

                Heard:

              </p>


              <p className="text-xl font-semibold">

                "{recognizedText}"

              </p>

            </div>

          )}

        </div>



        {/* CONTROLS */}

        <div className="flex flex-wrap justify-center gap-3 mt-8">


          {!isStarted ? (

            <button
              onClick={
                startAttendance
              }
              className="px-7 py-3 bg-black text-white rounded-lg font-semibold"
            >

              🎙️ Start Attendance

            </button>

          ) : (

            <>

              <button
                onClick={
                  startListening
                }
                disabled={
                  isListening
                }
                className="px-7 py-3 bg-black text-white rounded-lg font-semibold disabled:opacity-50"
              >

                {isListening
                  ? "🎤 Listening..."
                  : "🎤 Listen"}

              </button>


              <button
                onClick={
                  retryCurrentStudent
                }
                className="px-7 py-3 border rounded-lg font-semibold"
              >

                🔄 Retry

              </button>


              <button
                onClick={
                  markPresent
                }
                className="px-7 py-3 border rounded-lg font-semibold"
              >

                ✓ Present

              </button>


              <button
                onClick={
                  markAbsent
                }
                className="px-7 py-3 border rounded-lg font-semibold"
              >

                ✕ Absent

              </button>


              <button
                onClick={
                  nextStudent
                }
                className="px-7 py-3 border rounded-lg font-semibold"
              >

                Next →

              </button>


              <button
                onClick={
                  stopAttendance
                }
                className="px-7 py-3 border rounded-lg font-semibold"
              >

                Stop

              </button>

            </>

          )}

        </div>

      </div>



      {/* STATISTICS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl">


        <div className="bg-white p-6 rounded-xl">

          <p className="text-gray-500">

            Present

          </p>


          <p className="text-3xl font-bold mt-2">

            {presentCount}

          </p>

        </div>



        <div className="bg-white p-6 rounded-xl">

          <p className="text-gray-500">

            Absent

          </p>


          <p className="text-3xl font-bold mt-2">

            {absentCount}

          </p>

        </div>



        <div className="bg-white p-6 rounded-xl">

          <p className="text-gray-500">

            Pending

          </p>


          <p className="text-3xl font-bold mt-2">

            {pendingCount}

          </p>

        </div>


      </div>



      {/* ATTENDANCE TABLE */}

      <div className="bg-white rounded-xl shadow-sm p-8 mt-8 max-w-5xl">


        <h2 className="text-xl font-semibold mb-6">

          Attendance Records

        </h2>


        <div className="space-y-3">

          {students.map(
            student => (

              <div
                key={
                  student.roll
                }
                className="flex justify-between items-center border-b pb-3"
              >

                <span className="font-semibold">

                  Roll {student.roll}

                </span>


                {student.status ===
                  "Present" && (

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">

                    ✓ Present

                  </span>

                )}


                {student.status ===
                  "Absent" && (

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700">

                    ✕ Absent

                  </span>

                )}


                {student.status ===
                  "Pending" && (

                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">

                    Pending

                  </span>

                )}


                {student.status ===
                  "Unclear" && (

                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">

                    ⚠ Unclear

                  </span>

                )}

              </div>

            )
          )}

        </div>

      </div>


    </main>

  );

}