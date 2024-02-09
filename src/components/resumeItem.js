import React from 'react';
import styles from '../styles/resumeItem.module.css'; 

const renderTeamName = (teamName) => {
  if (Array.isArray(teamName)) {
    return teamName.map((item, index) => (
      item.url ? 
        <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.link}>{item.text}</a> : 
        <span key={index}>{item.text}</span>
    ));
  } else {
    return <span>{teamName}</span>;
  }
};

const ResumeItem = ({ companyName, positionName1, teamName1, positionName2, teamName2 }) => {
  return (
    <div className={styles.resumeItem}>
      <h3 className={styles.companyName}>{companyName}</h3>
      
      <p className={styles.positionName1}>{positionName1}</p>
      <p className={styles.teamName}>{renderTeamName(teamName1)}</p>

      {positionName2 && (
        <>
          <p className={styles.positionName2}>{positionName2}</p>
          <p className={styles.teamName}>{renderTeamName(teamName2)}</p>
        </>
      )}
    </div>
  );
};

export default ResumeItem;
