import React, { useEffect, useRef } from 'react';
import { tl8 } from '../../utils/locale';
import io from 'socket.io-client';

const Home = () => {
  const socketRef = useRef();

//   useEffect(() => {
//       console.log('me')
//     socketRef.current = io.connect('/');

//     socketRef.current.on('message', message => {
//         console.log(message, 'mess')
//     })
//   }, []);

  return (
    <div>
      {/* <div>{tl8('title')}</div> */}
    </div>
  );
};

export default Home;
