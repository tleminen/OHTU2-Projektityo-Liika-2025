import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../../store/notificationSlice';

const Notification = ({ id, message, type, duration = 3000 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [id, dispatch, duration]);

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;