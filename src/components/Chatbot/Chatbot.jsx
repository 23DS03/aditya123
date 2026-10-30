import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

function getTimeGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12
    ? "Good Morning, Thank you for visiting my website, Ask me anything about me."
    : hour < 17
      ? "Good Afternoon, Thank you for visiting my website, Ask me anything about me."
      : hour < 21
        ? "Good Evening, Thank you for visiting my website, Ask me anything about me."
        : "Good Night, Thank you for visiting my website, Ask me anything about me. ";

  return `${greeting} How may i assist you today.`;
}

const suggestedQuestions = [
  " मे हिन्दी मे बात कर सकता हू",
  "Hey",
  "Skills",
  "Education",
  "explore my work"
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      text: getTimeGreeting(),
    },
  ]);
  const messageIdRef = useRef(1);
  const inputRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    inputRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (question) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) return;

    const conversation = messages
      .slice(-30)
      .map(({ role, text }) => ({ role, text }));
    const userMessage = {
      id: messageIdRef.current++,
      role: "user",
      text: trimmedQuestion,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setDraft("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedQuestion, history: conversation }),
      });
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error(
          `The AI API endpoint returned a non-JSON response (HTTP ${response.status}). Check VITE_API_BASE_URL and confirm the deployed API is reachable.`,
        );
      }

      if (!response.ok) {
        throw new Error(result.error || "The assistant couldn't answer right now.");
      }

      if (typeof result.reply !== "string" || !result.reply.trim()) {
        throw new Error("The assistant returned an empty reply. Please try again.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: messageIdRef.current++,
          role: "assistant",
          text: result.reply.trim(),
          actions: Array.isArray(result.actions) ? result.actions : [],
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: messageIdRef.current++,
          role: "assistant",
          text: error instanceof Error
            ? error.message
            : "Couldn't connect to the assistant. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void sendMessage(draft);
  };

  return (
    <div className="portfolio-chat-widget">
      {isOpen && (
        <section id="portfolio-chat-panel" className="portfolio-chat-panel" role="dialog" aria-labelledby="portfolio-chat-title">
          <header className="portfolio-chat-header">
            <div className="portfolio-chat-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3.25a8.75 8.75 0 0 0-7.1 13.87L4 21l4.1-1.65A8.75 8.75 0 1 0 12 3.25Z" />
                <path d="M8.25 12h.01M12 12h.01M15.75 12h.01" />
              </svg>
            </div>
            <div className="portfolio-chat-heading">
              <h2 id="portfolio-chat-title">Portfolio assistant</h2>
              <p>Ask me anything about Aditya</p>
            </div>
            <button
              className="portfolio-chat-close"
              type="button"
              aria-label="Close chat"
              onClick={() => {
                setIsOpen(false);
                toggleButtonRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <div className="portfolio-chat-messages" aria-live="polite" aria-relevant="additions text">
            {messages.map((message) => (
              <div className={`portfolio-chat-message portfolio-chat-message--${message.role}`} key={message.id}>
                <p className={`portfolio-chat-bubble${message.isError ? " portfolio-chat-bubble--error" : ""}`}>
                  {message.text}
                </p>
                {message.actions?.length > 0 && (
                  <div className="portfolio-chat-message-actions">
                    {message.actions.map((action) => (
                      <a
                        className="portfolio-chat-action"
                        href={action.href}
                        key={`${action.label}-${action.href}`}
                        download={action.download || undefined}
                        target={action.external ? "_blank" : undefined}
                        rel={action.external ? "noreferrer" : undefined}
                        onClick={() => {
                          if (action.href === "#contact") setIsOpen(false);
                        }}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="portfolio-chat-message portfolio-chat-message--assistant">
                <p className="portfolio-chat-bubble portfolio-chat-bubble--loading">Thinking...</p>
              </div>
            )}
            {messages.length === 1 && !isLoading && (
              <div className="portfolio-chat-suggestions" aria-label="Suggested questions">
                {suggestedQuestions.map((question) => (
                  <button key={question} type="button" onClick={() => void sendMessage(question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="portfolio-chat-input" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about the portfolio..."
              aria-label="Ask a question about the portfolio"
              maxLength={1000}
              disabled={isLoading}
            />
            <button type="submit" aria-label="Send message" disabled={!draft.trim() || isLoading}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 3 10.8 13.2M21 3l-6.5 18-3.7-7.8L3 9.5 21 3Z" />
              </svg>
            </button>
          </form>
        </section>
      )}

      <button
        ref={toggleButtonRef}
        className="portfolio-chat-toggle"
        type="button"
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={isOpen}
        aria-controls="portfolio-chat-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3.25a8.75 8.75 0 0 0-7.1 13.87L4 21l4.1-1.65A8.75 8.75 0 1 0 12 3.25Z" />
            <path d="M8.25 12h.01M12 12h.01M15.75 12h.01" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default Chatbot;
