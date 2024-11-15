import React from 'react';
import './NewsCard.css';

const NewsCard = ({ title, date, message, employee, width }) => {
  return (
    <div className='cardNews' style={{ width }}>
      <div className='cardHeader'>
        <h2>{title}</h2>
        <span>{date}</span>
      </div>
      <p>{message}</p>
      <p>Empleado: {employee}</p>
    </div>
  );
}

export default NewsCard;
