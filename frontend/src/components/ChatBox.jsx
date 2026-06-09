import { useState } from "react";
import axios from "axios";

function ChatBox() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {

    if (!question.trim()) return;

    const userQuestion = question;

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        text: userQuestion
      }
    ]);

    setQuestion("");
    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:5000/ask",
        {
          question: userQuestion
        }
      );

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: response.data.answer,
          sources: response.data.sources || []
        }
      ]);

    } catch (error) {

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: "Error getting response."
        }
      ]);

    }

    setLoading(false);
  };

  return (

    <div className="bg-slate-800 rounded-3xl shadow-xl border border-slate-700 h-[550px] flex flex-col text-white">

      <div className="border-b border-slate-700 p-5">

        <h2 className="text-xl font-semibold text-emerald-400">
          Chat with your Documents
        </h2>

      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {messages.length === 0 && (

          <div className="text-center text-slate-400 mt-16">

            <h3 className="text-2xl font-semibold mb-2 text-white">
              Welcome to MediCode AI
            </h3>

            <p>
              Upload ICD documents and start asking questions.
            </p>

          </div>

        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] px-5 py-4 rounded-3xl shadow-sm ${
                msg.role === "user"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 border border-slate-600 text-white"
              }`}
            >

              <p className="whitespace-pre-wrap">
                {msg.text}
              </p>

              {msg.role === "bot" &&
                msg.sources?.length > 0 && (

                  <div className="mt-4 border-t border-slate-600 pt-3 text-xs text-slate-300">

                    <p className="font-semibold mb-1">
                      Sources
                    </p>

                    {msg.sources.map(
                      (source, i) => (

                        <div key={i}>
                          📄 {source}
                        </div>

                      )
                    )}

                  </div>

                )}

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-slate-700 border border-slate-600 rounded-3xl px-5 py-4">

              <div className="animate-pulse text-slate-300">
                🤖 Analyzing document...
              </div>

            </div>

          </div>

        )}

      </div>

      <div className="border-t border-slate-700 p-4">

        <div className="flex gap-3">

          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askQuestion();
              }
            }}
            placeholder="Ask anything about your documents..."
            className="
            flex-1
            px-4
            py-3
            bg-slate-700
            border
            border-slate-600
            rounded-2xl
            text-white
            outline-none
            "
          />

          <button
            onClick={askQuestion}
            className="
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            px-6
            rounded-2xl
            transition
            font-medium
            "
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );
}

export default ChatBox;