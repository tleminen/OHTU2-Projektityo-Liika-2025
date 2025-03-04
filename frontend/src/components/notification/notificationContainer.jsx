import { useSelector } from 'react-redux';
import Notification from './notification';

const NotificationContainer = () => {
  const notifications = useSelector((state) => state.notifications.notifications);

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;