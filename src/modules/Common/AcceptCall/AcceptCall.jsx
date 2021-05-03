import React, { useEffect } from 'react';
import { useSocket } from '../../../context/SocketProvider';

const AcceptCall = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('hey', (data) => {
    //   setReceivingCall(true);
    //   setCaller(data.from);
    //   setCallerSignal(data.signal);
    });
  }, [socket]);
  return <div></div>;
};

export default AcceptCall;
