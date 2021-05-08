import React, { useContext, useState, useEffect } from 'react';
import configVariables from '../config/env';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setReceivingCallData, setReceivingCall, setInitialCallAccept } from '../actions/call';

const SocketContext = React.createContext();
const { API_BASE_URI } = configVariables;
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ id, children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(API_BASE_URI, {
      query: { id },
      transports: ['websocket', 'polling', 'flashsocket']
    });
    setSocket(newSocket);
    newSocket.on('hi', (data) => {
      // dispatch(setReceivingCallData(data));
      // dispatch(setInitialCallAccept(data))
      dispatch(setReceivingCall(data))
    });
    // newSocket.on('hey', (data) => {
    //   dispatch(setReceivingCallData(data));
    // });

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
