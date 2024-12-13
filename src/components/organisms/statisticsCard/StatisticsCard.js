import React from 'react';
import './StatisticsCard.css';

const StatisticsCard = ({ label, color, colorB, percentage, iconImage }) => {

  const integerPercentage = Math.floor(parseFloat(percentage));
  console.log("PORCENTAJE", integerPercentage)
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
          <div className='progress' style={{ width: `${integerPercentage}%`, backgroundColor: colorB }} />
        </div>
      </div>
      <span>{integerPercentage}%</span>
    </div>
  );
};

export default StatisticsCard;
