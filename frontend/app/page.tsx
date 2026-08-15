export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r p-6">

        <h1 className="text-2xl font-bold mb-8">
          Teacher AI
        </h1>

        <nav className="space-y-3">

          <button className="block w-full text-left p-3 rounded-lg bg-gray-100">
            🏠 Dashboard
          </button>

          <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
            🎙️ Voice Attendance
          </button>

          <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
            👨‍🎓 Students
          </button>

          <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
            📊 Marks
          </button>

          <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
            📚 Lesson Planner
          </button>

          <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
            📝 Question Generator
          </button>

          <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
            📄 Documents
          </button>

          <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">
            🤖 AI Assistant
          </button>

        </nav>

      </aside>


      {/* Main Content */}
      <section className="ml-64 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-3xl font-bold">
              Welcome back 👋
            </h2>

            <p className="text-gray-500 mt-2">
              Here's what's happening with your classes today.
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              Teacher
            </p>

            <p className="text-sm text-gray-500">
              Faculty
            </p>
          </div>

        </div>


        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Students
            </p>

            <p className="text-3xl font-bold mt-2">
              58
            </p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Classes Today
            </p>

            <p className="text-3xl font-bold mt-2">
              4
            </p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Attendance
            </p>

            <p className="text-3xl font-bold mt-2">
              86%
            </p>
          </div>

        </div>


        {/* Today's Classes */}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">

          <h3 className="text-xl font-semibold mb-5">
            Today's Classes
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-4">
              <div>
                <p className="font-semibold">
                  Biochemistry
                </p>

                <p className="text-sm text-gray-500">
                  Section 48
                </p>
              </div>

              <p className="text-gray-600">
                10:00 AM
              </p>
            </div>


            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  Bioinformatics
                </p>

                <p className="text-sm text-gray-500">
                  Section 48
                </p>
              </div>

              <p className="text-gray-600">
                12:00 PM
              </p>
            </div>

          </div>

        </div>


        {/* AI Assistant */}

        <div className="bg-white rounded-xl shadow-sm p-6">

          <h3 className="text-xl font-semibold mb-4">
            🤖 Teacher AI Assistant
          </h3>

          <p className="text-gray-500 mb-4">
            Ask me to plan lessons, generate questions,
            check attendance, or analyze student performance.
          </p>

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Ask your Teacher AI..."
              className="flex-1 border rounded-lg p-3 outline-none"
            />

            <button className="px-6 py-3 bg-black text-white rounded-lg">
              Ask
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}