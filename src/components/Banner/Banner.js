import React from 'react';
import styles from './Banner.module.css';
import Img from '../../assets/images/Artt.png';

const Banner = () => {
  return (
    <>
      <div className={styles.bannerContainer}>
        <h5 className={styles.Warning}>
          ⚠️ WARNING Since I am using free hosting service the backend server
          takes around 5 min to start. To see weather the server is up and
          running visit this website :{' '}
          <a href="https://promanagebackend.onrender.com">
            https://promanagebackend.onrender.com
          </a>
        </h5>
        <div className={styles.circle}></div>
        <img src={Img} className={styles.img} alt="bannerImg" />
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div>
    </>
  );
};

export default Banner;
