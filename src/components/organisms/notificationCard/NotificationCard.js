import React from 'react';
import './NotificationCard.css';

const NotificationCard = ({ ticket, date, title, employee, width }) => {
  return (
    <div className='notificationCard' style={{ width }}>
      <h3>{ticket}</h3>
      <span>{date}</span>
      <h4>{title}</h4>
      <p>{employee}</p>
    </div>
  );
};

export default NotificationCard;
