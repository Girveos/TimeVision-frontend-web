import React from 'react';
import './StatisticsCard.css';

const StatisticsCard = ({ label, color, colorB, percentage, iconImage }) => {
  return (
    <div className='statisticsCard'>
      <div
        className='icon'
        style={{
          backgroundColor: color,
          backgroundImage: `url(${iconImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className='statContent'>
        <p>{label}</p>
        <div className='progressBar'>
          <div className='progress' style={{ width: `${percentage}%`, backgroundColor: colorB }} />
        </div>
      </div>
      <span>{percentage}%</span>
    </div>
  );
};

export default StatisticsCard;
