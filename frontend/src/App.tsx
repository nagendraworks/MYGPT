import { useState, type FormEvent } from "react";
import "./index.css";
import "./App.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


interface ChatMessage {
  sender: "user" | "ai";
  message: string;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { sender: "user", message: userMessage }
    ];

    setMessages(updatedMessages);
    setIsLoading(true);



    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: data.message || "No reply from server." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: "Error: Could not reach the Express server." },
      ]);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex flex-col h-screen w-full bg-[#17101f] text-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <h1 className="text-lg font-semibold">My AI Chatbot</h1>
      </header>

      {/* Conversation area */}
      <section className="flex-1 overflow-y-auto px-6 py-6 space-y-4 max-w-3xl w-full mx-auto">
        {/* Messages will go here */}
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            Send a message to start chatting...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-[#292c34] text-gray-100 border border-gray-700"
              }`}
            >
              {msg.sender === "ai" ? (
                <div className="
                  [&_p]:mb-3
                  [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3
                  [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2
                  [&_h3]:font-semibold [&_h3]:mb-2
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3
                  [&_li]:mb-1
                  [&_strong]:font-bold
                  [&_blockquote]:border-l-4 [&_blockquote]:border-purple-400 [&_blockquote]:pl-3 [&_blockquote]:my-3
                  [&_pre]:bg-black/30 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-3
                  [&_code]:bg-black/30 [&_code]:px-1 [&_code]:rounded
                  [&_table]:border-collapse [&_table]:w-full
                  [&_th]:border [&_th]:border-gray-600 [&_th]:p-2
                  [&_td]:border [&_td]:border-gray-600 [&_td]:p-2
                ">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.message}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.message
              )}
            </div>
          </div>
        ))}

        {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#292c34] text-gray-400 px-4 py-2.5 rounded-2xl border border-gray-700">
                      Thinking...
                    </div>
                  </div>
                )}
      </section>

      {/* User input area */}
      <footer className="w-full max-w-3xl mx-auto px-4 pb-6">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 bg-[#292c34] border border-gray-700 rounded-2xl px-4 py-3">
          <input
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Type a message..."
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black px-4 py-2 rounded-3xl hover:bg-gray-200 transition"
          >
            ↑
          </button>
        </form>
      </footer>
    </main>
  );
}

export default App;
