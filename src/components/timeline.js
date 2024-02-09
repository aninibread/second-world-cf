import React from 'react';
import styles from '../styles/Timeline.module.css'; 

const Timeline = ({ companyName, positionName, teamName }) => {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineItem}>
        <div className={styles.timelineDot}></div>
        <div className={styles.timelineContent}>
          <h3>{companyName}</h3>
          <h4>{positionName}</h4>
          <p>{teamName}</p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;