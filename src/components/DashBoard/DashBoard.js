import React from 'react';
import styles from './DashBoard.module.css';

const DashBoard = () => {
  let date = ` ${new Date().toLocaleDateString([], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
  const greetings = `Welcome!  ${localStorage.getItem('Name')}`;

  return (
    <>
      <div className={styles.MainContainer}>
        <div className={styles.DashBoardContainer1}>
          <div className={styles.DashBoardHeaders}>
            <h3>{greetings}</h3>
            <h2>Board</h2>
          </div>
          <div className={styles.DashBoardDateheaders}>
            <h3>{date}</h3>
            <select className={styles.DashBoardSelector}>
              <option value="Today" default>
                Today
              </option>
              <option value="ThisWeek">ThisWeek</option>
              <option value="ThisMonth">ThisMonth</option>
            </select>
          </div>
        </div>
        <div className={styles.DashBoardContainer2}>
          <div className={styles.TaskBoard}>
            <div className={styles.Task}>
              <h3>Backlog</h3>
            </div>
            <div className={styles.Task}>
              <h3>To do</h3>
            </div>
            <div className={styles.Task}>
              <h3>In progress</h3>
            </div>
            <div className={styles.Task}>
              <h3>Done</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
