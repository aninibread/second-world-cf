import React from 'react';
import styles from '../styles/ProjectCard.module.css';
import Link from 'next/link';

const ProjectCard = ({ title, description, imgUrl, postLink }) => {
  return (
    <Link href={postLink} passHref>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={imgUrl} alt="Project" />
        </div>
        <div className={styles.description}>
          <h3 className={styles.title}>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
