import React, { useState, useEffect } from 'react';
import styles from './DashBoard.module.css';
import axios from 'axios';
import moment from 'moment';
import down from '../../assets/images/Stroke 1.svg';
import createBtn from '../../assets/images/Group 10.svg';
import TaskModal from '../TaskModal/TaskModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import dots from '../../assets/images/dots.svg';

const DashBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [checklistCompleted, setChecklistCompleted] = useState(0);
  const [checklist, setChecklist] = useState([]);
  const [authorization, setAuthorization] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskState, setTaskState] = useState(tasks.state);
  const [filter, setFilter] = useState('Today');
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [openTask, setOpenTask] = useState(false);

  const token = localStorage.getItem('authToken');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return '#63C05B';
      case 'medium':
        return '#18B0FF';
      case 'high':
        return '#FF2473';
      default:
        return 'inherit';
    }
  };
  const getDueDateColor = (dueDate, state) => {
    const now = new Date();
    const dueDateObj = new Date(dueDate);
    const diff = dueDateObj - now;
    if (state === 'done') {
      return '#63C05B';
    } else if (diff < 0 || state === 'backlog') {
      return '#CF3636';
    } else {
      return '#DBDBDB';
    }
  };

  useEffect(() => {
    if (token) {
      setAuthorization(true);
    } else {
      setAuthorization(false);
    }
  }, [token]);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    };
    console.log(config);
    axios
      .get('http://localhost:5000/api/getalltask', config)
      .then((res) => {
        setTasks(res.data);
        setChecklist(
          res.data
            .map((task) => task.checklist.map((item) => ({ ...item })))
            .flat()
        );
        setTaskState(res.data.state);
      })
      .catch((err) => console.error(err));
  }, [taskState]);

  const updateTaskState = async (newState, taskid) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      await axios
        .put(
          `http://localhost:5000/api/update-state/${taskid}`,
          {
            state: newState,
          },
          config
        )
        .then((response) => {
          console.log(response.data);
          setTaskState(response.data.state);
        });
    } catch (error) {
      console.error('Error updating task state:', error);
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   if (!selectedTaskId) {
  //     return;
  //   }

  //   const selectedTask = tasks.find((task) => task._id === selectedTaskId);

  //   if (!selectedTask) {
  //     return;
  //   }

  //   let completed = 0;

  //   selectedTask.checklist.forEach((item) => {
  //     if (item.ischeck === true) {
  //       completed++;
  //     }
  //   });

  //   console.log('selectedTask:', selectedTask);
  //   console.log('completed:', completed);
  //   setChecklistCompleted(completed);
  // }, [selectedTaskId, tasks]);

  const handleChecklistChange = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index].ischeck = !newChecklist[index].ischeck;
    setChecklist(newChecklist);
  };
  const handleFitlerChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    };
    console.log(config);
    axios
      .get(`http://localhost:5000/api/get-filter?filter=${newFilter}`, config)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const handleDropDown = (taskId) => {
    if (openTask === taskId) {
      setOpenTask(null);
    } else {
      setOpenTask(taskId);
    }
  };

  const handleMenuClick = (taskId) => {
    if (isMenuOpen === taskId) {
      setIsMenuOpen(null);
    } else {
      setIsMenuOpen(taskId);
    }
  };

  const greetings = `Welcome!  ${localStorage.getItem('Name')}`;

  return (
    <>
      {authorization && (
        <div className={styles.MainContainer}>
          <div className={styles.DashBoardContainer1}>
            <div className={styles.DashBoardHeaders}>
              <h3>{greetings}</h3>
              <h2>Board</h2>
            </div>
            <div className={styles.DashBoardDateheaders}>
              <h3>{moment().format('Do MMM YYYY')}</h3>
              <select
                className={styles.DashBoardSelector}
                value={filter}
                onChange={handleFitlerChange}
              >
                <option value="today" default>
                  Today
                </option>
                <option value="thisWeek">ThisWeek</option>
                <option value="thisMonth">ThisMonth</option>
              </select>
            </div>
          </div>
          <div className={styles.DashBoardContainer2}>
            <div className={styles.TaskBoard}>
              <div className={styles.Task}>
                <h3>Backlog</h3>
                <div className={styles.TaskContainer}>
                  {tasks
                    .filter((task) => task.state === 'backlog')
                    .map((task) => (
                      <div key={task._id} className={styles.TaskCard}>
                        <div className={styles.dropdownMenu}>
                          <div>
                            <div
                              style={{
                                backgroundColor: getPriorityColor(
                                  task.priority
                                ),
                                height: '10px',
                                width: '10px',
                                borderRadius: '50px',
                                content: '',
                                position: 'relative',
                                top: '21px',
                              }}
                            ></div>
                            <span>
                              <p className={styles.TaskPriority}>
                                {task.priority?.toUpperCase()} PRIORITY
                              </p>
                            </span>
                          </div>

                          <button
                            className={styles.dropbtn}
                            onClick={(e) => handleMenuClick(task._id)}
                          >
                            <img src={dots} alt="dots" />
                          </button>
                        </div>
                        {isMenuOpen === task._id && (
                          <div
                            id="myDropdown"
                            className={styles.dropdownContent}
                          >
                            <button>Edit</button>
                            <button>Share</button>
                            <button
                              style={{ color: '#CF3636' }}
                              onClick={(e) => setDeleteModal(true)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        <h3>{task.title}</h3>
                        <div className={styles.TaskCheckList}>
                          <h4>
                            checklist ({checklistCompleted}/
                            {task.checklist?.length || 0})
                          </h4>

                          <button
                            className={styles.dropdown}
                            onClick={() => handleDropDown(task._id)}
                          >
                            <img src={down} alt="down" />
                          </button>
                        </div>
                        {openTask === task._id && (
                          <ul>
                            {task.checklist?.map((item, index) => (
                              <li key={item._id}>
                                <input
                                  type="checkbox"
                                  checked={item.ischeck}
                                  onChange={(e) => handleChecklistChange(index)}
                                  className={styles.Checklist}
                                />
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className={styles.Track}>
                          <div
                            className={styles.dueDate}
                            style={{
                              backgroundColor: getDueDateColor(
                                task.dueDate,
                                task.state
                              ),
                            }}
                          >
                            {moment(task.dueDate).format('MMM D')}
                          </div>

                          <div className={styles.trackbtns}>
                            <button
                              className={styles.btn}
                              value="PROGRESS"
                              onClick={() =>
                                updateTaskState('in-progress', task._id)
                              }
                            >
                              PROGRESS
                            </button>
                            <button
                              className={styles.btn}
                              value="TODO"
                              onClick={() => updateTaskState('todo', task._id)}
                            >
                              TODO
                            </button>
                            <button
                              className={styles.btn}
                              value="DONE"
                              onClick={() => updateTaskState('done', task._id)}
                            >
                              DONE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.Task}>
                <div className={styles.create}>
                  <h3>To do</h3>
                  <button onClick={() => setOpenModal(true)}>
                    <img src={createBtn} alt="btn" />
                  </button>
                </div>
                <div className={styles.TaskContainer}>
                  {tasks
                    .filter((task) => task.state === 'todo')
                    .map((task) => (
                      <div key={task._id} className={styles.TaskCard}>
                        <div className={styles.dropdownMenu}>
                          <div>
                            <div
                              style={{
                                backgroundColor: getPriorityColor(
                                  task.priority
                                ),
                                height: '10px',
                                width: '10px',
                                borderRadius: '50px',
                                content: '',
                                position: 'relative',
                                top: '21px',
                              }}
                            ></div>
                            <span>
                              <p className={styles.TaskPriority}>
                                {task.priority?.toUpperCase()} PRIORITY
                              </p>
                            </span>
                          </div>

                          <button
                            className={styles.dropbtn}
                            onClick={(e) => handleMenuClick(task._id)}
                          >
                            <img src={dots} alt="dots" />
                          </button>
                        </div>
                        {isMenuOpen === task._id && (
                          <div
                            id="myDropdown"
                            className={styles.dropdownContent}
                          >
                            <button>Edit</button>
                            <button>Share</button>
                            <button
                              style={{ color: '#CF3636' }}
                              onClick={(e) => setDeleteModal(true)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        <h3>{task.title}</h3>
                        <div className={styles.TaskCheckList}>
                          <h4>
                            checklist ({checklistCompleted}/
                            {task.checklist?.length || 0})
                          </h4>

                          <button
                            className={styles.dropdown}
                            onClick={(e) => handleMenuClick(task._id)}
                            key={task._id}
                          >
                            <img src={down} alt="down" />
                          </button>
                        </div>
                        {openTask === task._id && (
                          <ul>
                            {task.checklist?.map((item, index) => (
                              <li key={item._id}>
                                <input
                                  type="checkbox"
                                  checked={item.ischeck}
                                  onChange={(e) =>
                                    handleChecklistChange(index._id)
                                  }
                                  className={styles.Checklist}
                                />
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className={styles.Track}>
                          <div
                            className={styles.dueDate}
                            style={{
                              backgroundColor: getDueDateColor(
                                task.dueDate,
                                task.state
                              ),
                            }}
                          >
                            {moment(task.dueDate).format('MMM D')}
                          </div>
                          <div className={styles.trackbtns}>
                            <button
                              className={styles.btn}
                              value="in-progress"
                              onClick={() =>
                                updateTaskState('in-progress', task._id)
                              }
                            >
                              PROGRESS
                            </button>
                            <button
                              className={styles.btn}
                              value="backlog"
                              onClick={() =>
                                updateTaskState('backlog', task._id)
                              }
                            >
                              BACKLOG
                            </button>
                            <button
                              className={styles.btn}
                              value="done"
                              onClick={() => updateTaskState('done', task._id)}
                            >
                              DONE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.Task}>
                <h3>In progress</h3>
                <div className={styles.TaskContainer}>
                  {tasks
                    .filter((task) => task.state === 'in-progress')
                    .map((task) => (
                      <div key={task._id} className={styles.TaskCard}>
                        <div className={styles.dropdownMenu}>
                          <div>
                            <div
                              style={{
                                backgroundColor: getPriorityColor(
                                  task.priority
                                ),
                                height: '10px',
                                width: '10px',
                                borderRadius: '50px',
                                content: '',
                                position: 'relative',
                                top: '21px',
                              }}
                            ></div>
                            <span>
                              <p className={styles.TaskPriority}>
                                {task.priority?.toUpperCase()} PRIORITY
                              </p>
                            </span>
                          </div>

                          <button
                            className={styles.dropbtn}
                            onClick={(e) => handleMenuClick(task._id)}
                          >
                            <img src={dots} alt="dots" />
                          </button>
                        </div>
                        {isMenuOpen === task._id && (
                          <div
                            id="myDropdown"
                            className={styles.dropdownContent}
                          >
                            <button>Edit</button>
                            <button>Share</button>
                            <button
                              style={{ color: '#CF3636' }}
                              onClick={(e) => setDeleteModal(true)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        <h3>{task.title}</h3>
                        <div className={styles.TaskCheckList}>
                          <h4>
                            checklist ({checklistCompleted}/
                            {task.checklist?.length || 0})
                          </h4>

                          <button
                            className={styles.dropdown}
                            onClick={(e) => handleMenuClick(task._id)}
                            key={task._id}
                          >
                            <img src={down} alt="down" />
                          </button>
                        </div>
                        {openTask === task._id && (
                          <ul>
                            {task.checklist?.map((item, index) => (
                              <li key={index._id}>
                                <input
                                  type="checkbox"
                                  checked={item.ischeck}
                                  onChange={(e) => handleChecklistChange(index)}
                                  className={styles.Checklist}
                                />
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className={styles.Track}>
                          <div
                            className={styles.dueDate}
                            style={{
                              backgroundColor: getDueDateColor(
                                task.dueDate,
                                task.state
                              ),
                            }}
                          >
                            {moment(task.dueDate).format('MMM D')}
                          </div>
                          <div className={styles.trackbtns}>
                            <button
                              className={styles.btn}
                              onClick={() =>
                                updateTaskState('backlog', task._id)
                              }
                            >
                              BACKLOG
                            </button>
                            <button
                              className={styles.btn}
                              onClick={() => updateTaskState('todo', task._id)}
                            >
                              TODO
                            </button>
                            <button
                              className={styles.btn}
                              onClick={() => updateTaskState('done', task._id)}
                            >
                              DONE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.Task}>
                <h3>Done</h3>
                <div className={styles.TaskContainer}>
                  {tasks
                    .filter((task) => task.state === 'done')
                    .map((task) => (
                      <div key={task._id} className={styles.TaskCard}>
                        <div className={styles.dropdownMenu}>
                          <div>
                            <div
                              style={{
                                backgroundColor: getPriorityColor(
                                  task.priority
                                ),
                                height: '10px',
                                width: '10px',
                                borderRadius: '50px',
                                content: '',
                                position: 'relative',
                                top: '21px',
                              }}
                            ></div>
                            <span>
                              <p className={styles.TaskPriority}>
                                {task.priority?.toUpperCase()} PRIORITY
                              </p>
                            </span>
                          </div>

                          <button
                            className={styles.dropbtn}
                            onClick={(e) => handleMenuClick(task._id)}
                          >
                            <img src={dots} alt="dots" />
                          </button>
                        </div>
                        {isMenuOpen === task._id && (
                          <div
                            id="myDropdown"
                            className={styles.dropdownContent}
                          >
                            <button>Edit</button>
                            <button>Share</button>
                            <button
                              style={{ color: '#CF3636' }}
                              onClick={(e) => setDeleteModal(true)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        <h3>{task.title}</h3>
                        <div className={styles.TaskCheckList}>
                          <h4>
                            checklist ({checklistCompleted}/
                            {task.checklist?.length || 0})
                          </h4>

                          <button
                            className={styles.dropdown}
                            onClick={(e) => handleMenuClick(task._id)}
                            key={task._id}
                          >
                            <img src={down} alt="down" />
                          </button>
                        </div>
                        {openTask === task._id && (
                          <ul>
                            {task.checklist?.map((item, index) => (
                              <li key={index._id}>
                                <input
                                  type="checkbox"
                                  checked={item.ischeck}
                                  onChange={(e) => handleChecklistChange(index)}
                                  className={styles.Checklist}
                                />
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className={styles.Track}>
                          <div
                            className={styles.dueDate}
                            style={{
                              backgroundColor: getDueDateColor(
                                task.dueDate,
                                task.state
                              ),
                            }}
                          >
                            {moment(task.dueDate).format('MMM D')}
                          </div>
                          <div className={styles.trackbtns}>
                            <button
                              className={styles.btn}
                              onClick={() =>
                                updateTaskState('backlog', task._id)
                              }
                            >
                              BACKLOG
                            </button>
                            <button
                              className={styles.btn}
                              onClick={() => updateTaskState('todo', task._id)}
                            >
                              TODO
                            </button>
                            <button
                              className={styles.btn}
                              onClick={() =>
                                updateTaskState('in-progress', task._id)
                              }
                            >
                              PROGRESS
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tasks.map(
        (task) =>
          deleteModal && (
            <DeleteModal
              key={task._id}
              closeModal={setDeleteModal}
              taskId={task._id}
            />
          )
      )}

      {openModal && <TaskModal closeModal={setOpenModal} />}

      {!authorization && <p> Please login or register to access this page !</p>}
    </>
  );
};

export default DashBoard;
