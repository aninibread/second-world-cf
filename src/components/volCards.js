import React from 'react';
import styles from '../styles/VolCard.module.css';

const VolCard = ({ title, position, date, description, imgUrl }) => {
  return (
    <div className={styles.listItem}>
      <img className={styles.listImage} src={imgUrl} alt={title} />
      <div className={styles.listDetails}>
        <h3 className={styles.listTitle}>{title}</h3>
        <h4 className={styles.listPosition}>{position}</h4>
        <p className={styles.listDate}>{date}</p>
        <p className={styles.listDescripText}>{description}</p>
      </div>
    </div>
  );
};

export default VolCard;
