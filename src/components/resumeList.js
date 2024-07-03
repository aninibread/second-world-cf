import React from 'react';
import styles from '../styles/resumeList.module.css';
import ResumeItem from './resumeItem';

const ResumeList = ({ experiences }) => {
  return (
    <div className={styles.resumeList}>
      {experiences.map((experience, index) => (
        <ResumeItem key={index} {...experience} />
      ))}
    </div>
  );
};

export default ResumeList;
