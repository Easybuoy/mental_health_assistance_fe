import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { tl8 } from '../../utils/locale';
import { getUserId } from '../../store/selectors/auth';
import { useSocket } from '../../context/SocketProvider';
import Loader from '../../modules/Common/Loader/Loader';
import Input from '../../modules/Common/Input/Input';
import Button from '../../modules/Common/Button/Button';
import './Chat.scss';

const Chat = ({ route }) => {
  const messageEndElement = useRef();
  const params = useParams();
  const { addToast } = useToasts();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector(getUserId);
  const socket = useSocket();
  const { recepientId } = params;

  const scrollToBottom = () => {
    messageEndElement.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!socket) return;

    socket.on('messages', (messages) => {
      setMessages(messages);
    });

    socket.on('message', (message) => {
      receiveMessage(message);
    });
    setIsLoading(false);

    return () => {
      socket.off('messages');
      socket.off('message');
    };
  }, [userId, socket]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const receiveMessage = (message) => {
    setMessages((oldMsg) => [...oldMsg, message]);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message) {
      addToast('Type a message in the text area to send a message', {
        appearance: 'info',
      });
      return;
    }

    const messageObject = {
      message: message,
      senderId: userId,
      recepientId,
    };
    setMessage('');
    socket.emit('send message', messageObject);
  };

  if (isLoading) return <Loader size={25} thickness={250} className="loader" />;

  return (
    <div className="container chat">
      <div className="chat-container">
        <div className="chat-list">
          {messages.map((message, i) => (
            <React.Fragment key={i}>
              {message.senderId === userId ? (
                <div className="sender">
                  <p>{message.message}</p>
                  <span className="metadata">
                    {moment(message.date).fromNow()}
                  </span>
                </div>
              ) : (
                <div className="receiver">
                  <p>{message.message}</p>
                  <span className="metadata">
                    {moment(message.date).fromNow()}
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
          <div ref={messageEndElement} />
        </div>
        <form className="new-message" onSubmit={sendMessage}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
          />
          <Button>→</Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
