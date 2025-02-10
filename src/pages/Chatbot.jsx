import React, { useState } from "react";
import "../styles/Chatbot.css";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();
    const formattedMessage = `You are a trading expert. Give your response to "${message}". Begin and end each headline/title with *, begin and end each paragraph with (), and begin and end each bullet points with ^.`;
    setMessages([...messages, { sender: 'user', text: message }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: formattedMessage }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch response from server");
      }
      const data = await res.json();
      setMessages([...messages, { sender: 'user', text: message }, { sender: 'bot', text: formatResponse(data.response) }]);
      setMessage("");
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    const bulletPoints = new Set();
    const formattedText = text
      .replace(/\*(.*?)\*/g, '<strong>$1</strong><br>') // Bold words surrounded by * and move to the next line
      .replace(/\((.*?)\)/g, '<p>$1</p><br>') // Paragraphs surrounded by () and move to the next line
      .replace(/\^(.*?)\^/g, (match, p1) => {
        if (bulletPoints.has(p1)) {
          return ''; // Remove duplicate bullet points
        } else {
          bulletPoints.add(p1);
          return `<li>${p1}</li><br>`;
        }
      }); // Bullet points surrounded by ^ and move to the next line
    return formattedText;
  };

  return (
    <div className="chatbot-container">
      <h1>Trading Chatbot</h1>
      <div className="chat-content">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p dangerouslySetInnerHTML={{ __html: msg.text }} />
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <p>Generating...</p>
          </div>
        )}
      </div>
      <form onSubmit={sendMessage} className="input-form">
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;