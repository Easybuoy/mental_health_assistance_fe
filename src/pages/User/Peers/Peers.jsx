import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { getPeers } from '../../../actions/peer';
import Loader from '../../../modules/Common/Loader/Loader';
import PATHS from '../../../config/constants/paths';
import SVG from '../../../config/constants/svg';
import Image from '../../../modules/Common/Image/Image';
import Card from '../../../modules/Common/Card/Card';
import { tl8, tl8Html } from '../../../utils/locale';
import { getPeers as getPeersState } from '../../../store/selectors/peer';
import './Peers.scss';

const Peers = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const peers = useSelector(getPeersState);

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
  }, [addToast, dispatch, history]);

  if (isLoading) return <Loader size={25} thickness={250} className="loader" />;

  return (
    <div className="container">
      <div className="peer-page">
        <h2 className="text-center page-title">{tl8('peer.page_title')}</h2>
        <p className="page-description">
          {tl8Html('peer.page_description', { className: 'danger-text' })}
        </p>
        <div className="peer-container">
          {peers.map((peer) => (
            <Card key={peer._id}>
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
                <Image src={peer.image} alt="placeholder image" />
              </div>
              <div className="details">
                <h3 className="text-center name">{peer.fullName}</h3>

                <div className="actions">
                  <Link to={`chat/${peer._id}`}>
                    <Image src={SVG.CHAT} alt={tl8('image_alt.chat')} />
                  </Link>

                  <Link
                    to={{
                      pathname: `/call/${peer._id}`,
                      state: { makeCall: true },
                    }}
                  >
                    <Image src={SVG.CALL} alt={tl8('image_alt.call')} />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Peers;
