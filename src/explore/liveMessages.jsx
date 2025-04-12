import React, { useState, useEffect } from 'react';
import "../app.css";

export default function LiveMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = `User ${Math.floor(Math.random() * 100)}`;
      const newMessage = `${randomUser} liked a nail design!`;
      setMessages(prev => [...prev, newMessage].slice(-5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-messages">
      {messages.map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}
    </div>
  );
}
