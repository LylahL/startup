import React, { useState, useEffect } from 'react';
import "../app.css";

export default function LiveMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost';
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const host = isLocalhost ? 'localhost:4000' : window.location.host;
  
    const socket = new WebSocket(`${protocol}://${host}`);

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
