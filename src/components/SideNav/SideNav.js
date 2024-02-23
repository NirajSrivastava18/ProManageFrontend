import React, { useState } from 'react';
import styles from './SideNav.module.css';
import LogoutModal from '../LogoutModal/LogoutModal';
import Logo from '../../assets/images/Logo.svg';
import Database from '../../assets/images/database.svg';
import Board from '../../assets/images/layout.svg';
import Settings from '../../assets/images/settings.svg';
import Logout from '../../assets/images/Logout.png';

import { useNavigate } from 'react-router-dom';

const SideNav = () => {
  const [openModal, setOpenModal] = useState(false);

  const nav = useNavigate();
  const bdiv = (e) => {
    nav('/dashboard');
  };
  const sdiv = (e) => {
    nav('/settings');
  };
  const adiv = (e) => {
    nav('/analytics');
  };
  return (
    <>
      <div className={styles.SideNavContainer}>
        <div className={styles.SideNavHeaders}>
          <img src={Logo} alt="ProManageLoge" className={styles.logo} />
          <div className={styles.SideNavButtons}>
            <button className={styles.navBtn} onClick={bdiv}>
              <img src={Board} alt="Board" className={styles.btn} />
              <span className={styles.btn}>Board</span>
            </button>
            <button type="button" className={styles.navBtn} onClick={adiv}>
              <img src={Database} alt="Database" className={styles.btn} />
              <span className={styles.btn}>Analytics</span>
            </button>
            <button type="button" className={styles.navBtn} onClick={sdiv}>
              <img src={Settings} alt="Settings" className={styles.btn} />
              <span className={styles.btn}>Settings</span>
            </button>
          </div>
        </div>
        <div className={styles.logout}>
          <button
            type="button"
            className={styles.LogoutNavBtn}
            onClick={() => setOpenModal(true)}
          >
            <img src={Logout} alt="Logout" className={styles.btn} />
            <span className={styles.btn}>Log out</span>
          </button>
        </div>
      </div>
      {openModal && <LogoutModal closeModal={setOpenModal} />}
    </>
  );
};

export default SideNav;
