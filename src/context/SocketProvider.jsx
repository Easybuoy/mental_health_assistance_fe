import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import configVariables from '../config/env';
import {
  setReceivingCall,
  resetCallData,
} from '../actions/call';
import { getIsCallDeclined, getCaller } from '../store/selectors/call';

const SocketContext = React.createContext();
const { API_BASE_URI } = configVariables;
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ id, children }) => {
  const dispatch = useDispatch();
  const callDeclined = useSelector(getIsCallDeclined);
  const caller = useSelector(getCaller);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(API_BASE_URI, {
      query: { id },
      transports: ['websocket', 'polling', 'flashsocket'],
    });

    setSocket(newSocket);
    newSocket.on('hi', (data) => {
      dispatch(setReceivingCall(data));
    });

    if (callDeclined) {
      newSocket.emit('declineCall', { to: caller });
      setTimeout(() => {
        dispatch(resetCallData());
      }, 100);
    }

    return () => newSocket.close();
  }, [id, callDeclined, caller, dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
