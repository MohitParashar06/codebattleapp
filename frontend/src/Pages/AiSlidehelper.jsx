import { useState } from "react";

const AiHelpSidebar = ({ isOpen, toggleSidebar }) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192", 
          messages: [
            { role: "system", content: "You are a helpful coding assistant. Answer concisely and clearly." },
            { role: "user", content: question },
          ],
        }),
      });

      const data = await res.json();

      if (data?.choices?.[0]?.message?.content) {
        setResponse(data.choices[0].message.content.trim());
      } else {
        setResponse("❌ AI did not return a valid response.");
      }
    } catch (error) {
      console.error("Groq API error:", error);
      setResponse("❌ Failed to get response from AI.");
    }

    setLoading(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[350px] bg-gray-800 text-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">💡 AI Help</h2>
        <button onClick={toggleSidebar}>❌</button>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <textarea
          rows={4}
          placeholder="Ask your question here..."
          className="bg-gray-700 text-white p-2 rounded resize-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
          onClick={handleAskAI}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
        <div className="bg-gray-900 mt-4 p-3 rounded text-sm overflow-y-auto max-h-[300px] whitespace-pre-wrap">
          {response || "AI response will appear here."}
        </div>
      </div>
    </div>
  );
};

export default AiHelpSidebar;
