import { useEffect, useMemo, useState } from 'react';

import { MessageType } from './type';

const WebSocket = () => {
  const socket = useMemo(() => new window.WebSocket('ws://localhost:3000'), []);

  const [message, setMessage] = useState<MessageType | null>(null);

  useEffect(() => {
    socket.onmessage = (e) => {
      setMessage(JSON.parse(e.data));
    };
  }, [socket]);

  setTimeout(() => {
    socket.close();
  }, 30000);

  return message ? (
    <div>
      <p>Message: {message.message}</p>
      <p>Time: {new Date(message.time).toLocaleString()}</p>
      <p>Color: {message.color}</p>
    </div>
  ) : null;
};

export default WebSocket;
