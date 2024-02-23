import React from 'react';
import styles from './Analytics.module.css';
import disc from '../../assets/images/Ellipse.svg';

const Analytics = () => {
  return (
    <>
      <div className={styles.AnalyticsContainer}>
        <h3>Analytics</h3>
        <div className={styles.Analytics}>
          <div className={styles.Tasks}>
            <ul className={styles.TasksLists}>
              <li>
                <li>
                  <img src={disc} alt="disc" style={{ marginRight: '10px' }} />
                  Backlog Tasks
                </li>
                <li style={{ fontWeight: '600' }}>16</li>
              </li>
              <li>
                <li>
                  <img src={disc} alt="disc" style={{ marginRight: '10px' }} />
                  To-do tasks
                </li>
                <li style={{ fontWeight: '600' }}>16</li>
              </li>
              <li>
                <li>
                  <img src={disc} alt="disc" style={{ marginRight: '10px' }} />
                  In-Progress Tasks
                </li>
                <li style={{ fontWeight: '600' }}>16</li>
              </li>
              <li>
                <li>
                  <img src={disc} alt="disc" style={{ marginRight: '10px' }} />
                  Completed Tasks
                </li>
                <li style={{ fontWeight: '600' }}>16</li>
              </li>
            </ul>
          </div>
          <div className={styles.Priority}>
            <ul className={styles.PriorityLists}>
              <li>
                <li>
                  <img src={disc} alt="disc" style={{ marginRight: '10px' }} />
                  Low Priority
                </li>
                <li style={{ fontWeight: '600' }}>16</li>
              </li>
              <li>
                <li>
                  <img src={disc} alt="disc" style={{ marginRight: '10px' }} />
                  Modarate Priority
                </li>
                <li style={{ fontWeight: '600' }}>16</li>
              </li>
              <li>
                <li>
                  <img src={disc} alt="disc" style={{ marginRight: '10px' }} />
                  High Priority
                </li>
                <li style={{ fontWeight: '600' }}>16</li>
              </li>
              <li>
                <li>
                  <img src={disc} alt="disc" style={{ marginRight: '10px' }} />
                  Due Date Tasks
                </li>
                <li style={{ fontWeight: '600' }}>16</li>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
