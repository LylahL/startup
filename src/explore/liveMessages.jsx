import React, { useState, useEffect } from 'react';
import "../app.css";

export default function LiveMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://localhost:4000`);

    socket.onmessage = (event) => {
      console.log('Received message:', event);
      const newMessage = event.data;
      setMessages((prev) => [...prev, newMessage].slice(-5));
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="live-messages">
      {messages.map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}
    </div>
  );
}
