import { useCallback, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { MessageType } from './type';

const WebSocket = () => {
  return;

  const refSocket = useRef(new window.WebSocket('ws://localhost:3000'));

  const [message, setMessage] = useState<MessageType | null>(null);

  const showToastMessage = useCallback((messageText: string) => {
    toast.success(messageText, {
      autoClose: 5000,
      position: 'top-center',
    });
  }, []);

  useEffect(() => {
    const socket = refSocket.current;

    socket.onmessage = (e) => {
      const newMessage = JSON.parse(e.data);
      setMessage(newMessage);
      showToastMessage(newMessage.message);
    };
  }, [showToastMessage]);

  if (!refSocket.current) {
    return;
  }

  return message ? (
    <div>
      <ToastContainer
        bodyStyle={{ color: message?.color }}
        progressStyle={{ background: message?.color }}
      />
    </div>
  ) : null;
};

export default WebSocket;
