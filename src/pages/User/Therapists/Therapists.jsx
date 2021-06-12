import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { usePaystackPayment } from 'react-paystack';

import configVariables from '../../../config/env';
import config from '../../../utils/paystackConfig';
import { getTherapists } from '../../../actions/therapists';
import { subscribeTherapist } from '../../../actions/subscriptions';
import Loader from '../../../modules/Common/Loader/Loader';
import PATHS from '../../../config/constants/paths';
import Image from '../../../modules/Common/Image/Image';
import Card from '../../../modules/Common/Card/Card';
import { tl8, tl8Html } from '../../../utils/locale';
import { getTherapists as getTherapistsState } from '../../../store/selectors/therapist';
import Button from '../../../modules/Common/Button/Button';
import {
  getUserEmail,
  getUserId,
  getActiveSubscription,
} from '../../../store/selectors/auth';
import convertToCurrency from '../../../utils/convertToCurrency';

import './Therapists.scss';

const Therapists = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector(getUserEmail);
  const userId = useSelector(getUserId);
  const [isLoading, setIsLoading] = useState(false);
  const peers = useSelector(getTherapistsState);
  const amount = convertToCurrency(configVariables.THERAPIST_PRICE);
  const initializePayment = usePaystackPayment(config(userId, email));
  const hasActiveSubscription = useSelector(getActiveSubscription);

  useEffect(() => {
    if (hasActiveSubscription) {
      return history.push(PATHS.MY_THERAPISTS);
    }
    const getTherapistsAsync = async () => {
      setIsLoading(true);
      try {
        await dispatch(getTherapists());
      } catch (error) {
        addToast(error, { appearance: 'error' });
        history.push(PATHS.HOME);
      }
      setIsLoading(false);
    };
    getTherapistsAsync();
  }, [addToast, dispatch, history, hasActiveSubscription]);

  const success = async (data, therapistUserId) => {
    await dispatch(subscribeTherapist(userId, therapistUserId));
    addToast('Subscription successful', { appearance: 'success' });
    history.push(PATHS.MY_THERAPISTS);
  };

  const triggerPayment = async (therapistUserId) => {
    return initializePayment((data) => {
      success(data, therapistUserId);
    });
  };

  if (isLoading) return <Loader size={25} thickness={250} className="loader" />;

  return (
    <div className="container">
      <div className="therapist-page">
        <h2 className="text-center page-title">
          {tl8('therapist.page_title')}
        </h2>
        <p className="page-description">
          {tl8Html('therapist.page_description', { className: 'danger-text' })}
        </p>
        <div className="therapist-container">
          {peers.map((peer) => (
            <Card key={peer._id}>
              <div className="image-container">
                {peer.userTypeString && (
                  <p className="badge therapist-badge">{peer.userTypeString}</p>
                )}
                <Image src={peer.image} alt="placeholder image" />
              </div>
              <div className="details">
                <h3 className="text-center name">{peer.fullName}</h3>

                <div className="actions">
                  <Button onClick={() => triggerPayment(peer._id)}>
                    Subscribe Now ({amount})
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Therapists;
