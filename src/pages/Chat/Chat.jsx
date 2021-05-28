import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { tl8 } from '../../utils/locale';
// import Image from '../../modules/Common/Image/Image';
// import SVG from '../../config/constants/svg';
import { getUserId } from '../../store/selectors/auth';
import { useSocket } from '../../context/SocketProvider';
import Loader from '../../modules/Common/Loader/Loader';
import Input from '../../modules/Common/Input/Input';
import Button from '../../modules/Common/Button/Button';
import { setMessages, setMessage, setRecepientName } from '../../actions/chat';
import { getMessages, getRecepientName } from '../../store/selectors/chat';
import './Chat.scss';

const Chat = () => {
  const params = useParams();
  const { recepientId } = params;
  const messageEndElement = useRef();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const messages = useSelector(getMessages);
  const recepientName = useSelector(getRecepientName);

  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector(getUserId);
  const socket = useSocket();

  const scrollToBottom = () => {
    messageEndElement.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!socket) return;

    socket.emit('get messages', recepientId);
    socket.emit('get user name', recepientId);

    socket.on('messages', (messages) => {
      dispatch(setMessages(messages));
    });

    socket.on('user mame', (name) => {
      dispatch(setRecepientName(name));
    });

    socket.on('message', (message) => {
      dispatch(setMessage(message));
    });
    setIsLoading(false);

    return () => {
      socket.off('messages');
      socket.off('message');
    };
  }, [userId, socket, dispatch, recepientId]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!newMessage) {
      addToast('Type a message in the text area to send a message', {
        appearance: 'info',
      });
      return;
    }

    const messageObject = {
      message: newMessage,
      senderId: userId,
      recepientId,
    };
    setNewMessage('');
    socket.emit('send message', messageObject);
    dispatch(setMessage(messageObject));
  };

  if (isLoading) return <Loader size={25} thickness={250} className="loader" />;

  return (
    <div className="container chat">
      <h3 className="name text-center">{recepientName}</h3>
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={tl8('chat.enter_message')}
          />
          <Button>→</Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
