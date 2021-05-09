import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { getPeers } from '../../actions/peer';
import Loader from '../../modules/Common/Loader/Loader';
import PATHS from '../../config/constants/paths';
import SVG from '../../config/constants/svg';
import Image from '../../modules/Common/Image/Image';
import CallIcon from '../../assets/svg/call.svg';
import ChatIcon from '../../assets/svg/chat.svg';
import { tl8 } from '../../utils/locale';
import { getPeers as getPeersState } from '../../store/selectors/peer';
import './Peers.scss';

const Peers = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const peers = useSelector(getPeersState);
  console.log(peers);
  useEffect(() => {
    const getPeersAsync = async () => {
      setIsLoading(true);
      try {
        await dispatch(getPeers());
      } catch (error) {
        addToast(error, { appearance: 'error' });
        history.push(PATHS.HOME);
      }
      setIsLoading(false);
    };
    getPeersAsync();
  }, []);

  if (isLoading) return <Loader size={25} thickness={250} className="loader" />;

  return (
    <div className="peer-page container">
      <h2 className="text-center title">Peers</h2>

      <div className="peer-container">
        {peers.map((peer) => (
          <div key={peer._id} className="peer">
            <div className="image-container">
              {peer.userTypeString && (
                <p
                  className={`badge ${
                    peer.userTypeString === 'Peer' ? 'black-background' : ''
                  }`}
                >
                  {peer.userTypeString}
                </p>
              )}
              <Image
                src="https://media.istockphoto.com/vectors/default-avatar-profile-icon-grey-photo-placeholder-hand-drawn-modern-vector-id1273297997?b=1&k=6&m=1273297997&s=612x612&w=0&h=W0mwZseX1YEUPH8BJ9ra2Y-VeaUOi0nSLfQJWExiLsQ="
                alt="placeholder image"
              />
            </div>
            <div className="details">
              <h3 className="text-center name">{peer.fullName}</h3>

              <div className="actions">
                <Link to={`chat/${peer._id}`}>
                  <Image src={SVG.CHAT} alt={tl8('image_alt.chat')} />
                </Link>

                <Link to={`/call/${peer._id}`}>
                  <Image src={SVG.CALL} alt={tl8('image_alt.call')} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peers;
