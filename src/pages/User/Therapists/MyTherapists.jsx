import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import Loader from '../../../modules/Common/Loader/Loader';
import PATHS from '../../../config/constants/paths';
import SVG from '../../../config/constants/svg';
import Image from '../../../modules/Common/Image/Image';
import Card from '../../../modules/Common/Card/Card';
import { tl8, tl8Html } from '../../../utils/locale';
import { getUserTherapists as getUserTherapistsState } from '../../../store/selectors/therapist';
import { getUserTherapists } from '../../../actions/therapists';
import {
  getActiveSubscription,
} from '../../../store/selectors/auth';
import './MyTherapists.scss';

const MyTherapists = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const therapists = useSelector(getUserTherapistsState);
  const hasActiveSubscription = useSelector(getActiveSubscription);

  useEffect(() => {
    if (!hasActiveSubscription) {
      return history.push(PATHS.THERAPISTS);
    }

    const getTherapistsAsync = async () => {
      setIsLoading(true);
      try {
        await dispatch(getUserTherapists());
      } catch (error) {
        addToast(error, { appearance: 'error' });
        history.push(PATHS.HOME);
      }
      setIsLoading(false);
    };
    getTherapistsAsync();
  }, [addToast, dispatch, history, hasActiveSubscription]);

  if (isLoading) return <Loader size={25} thickness={250} className="loader" />;

  return (
    <div className="container">
      <div className="mytherapist-page">
        <h2 className="text-center page-title">
          {tl8('therapist.page_title')}
        </h2>
        <p className="page-description">
          {tl8Html('therapist.page_description', { className: 'danger-text' })}
        </p>
        <div className="mytherapist-container">
          {therapists.map((thrapist) => (
            <Card key={thrapist._id}>
              <div className="image-container">
                {thrapist.userTypeString && (
                  <p className="badge therapist-badge">
                    {thrapist.userTypeString}
                  </p>
                )}
                <Image src={thrapist.image} alt="placeholder image" />
              </div>
              <div className="details">
                <h3 className="text-center name">{thrapist.fullName}</h3>

                <div className="actions">
                  <Link to={`chat/${thrapist._id}`}>
                    <Image src={SVG.CHAT} alt={tl8('image_alt.chat')} />
                  </Link>

                  <Link
                    to={{
                      pathname: `/call/${thrapist._id}`,
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

export default MyTherapists;
