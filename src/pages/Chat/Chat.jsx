import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { tl8 } from '../../utils/locale';
import { getUserId } from '../../store/selectors/auth';
import { useSocket } from '../../context/SocketProvider';

const Chat = () => {
  const socketRef = useRef();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const userId = useSelector(getUserId);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
   
    socket.on('messages', (messages) => {
      console.log(messages, 'mm');
      setMessages(messages);
    });

    socket.on('message', (message) => {
      console.log(message, 'mm');
      receiveMessage(message);
    });

    return () => {
      socket.off('messages');
      socket.off('message');
    };
  }, [userId, socket]);

  const receiveMessage = (message) => {
    setMessages((oldMsg) => [...oldMsg, message]);
  };
  console.log(messages, 'mess');

  const sendMessage = (e) => {
    e.preventDefault();

    const messageObject = {
      message: message,
      senderId: userId,
      recepientId: '60800be4deaa450038904826',
    };
    setMessage('');
    socket.emit('send message', messageObject);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  console.log(messages, 'state');
  return (
    <div>
      <div className="chatlist">
        {messages.map((message, i) => (
          <React.Fragment key={i}>
            {message.senderId === userId ? (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {message.message}
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {message.message}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={handleChange}
          placeholder="Enter message"
        />
        <button>send</button>
      </form>
    </div>
  );
};

export default Chat;
