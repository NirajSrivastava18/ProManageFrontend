import React, { useState, useEffect } from 'react';
import styles from './editModal.module.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Delete from '../../assets/images/Delete.svg';

const EditsModal = ({ closeModal, taskId }) => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    priority: 'low',
    dueDate: new Date(),
    user: localStorage.getItem('id'),
    checklist: [],
    state: 'todo',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const res = axios.get(`http://localhost:5000/api/gettaskbyid/${taskId}`);
    setTasks(res.data);
    setFormData(res.data);
  }, [setTasks, taskId]);

  const handleChange = (e, i) => {
    if (i !== undefined) {
      const newValues = [...formData.checklist];
      newValues[i].text = e.target.value;
      newValues[i].ischecked = e.target.checked ? 'true' : 'false';
      newValues[i].priority = e.target.value;
      setFormData({ ...formData, checklist: newValues });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      const response = await axios.put(
        `http://localhost:5000/api/edit-task/${taskId}`,
        formData,
        config
      );
      console.log(response.data);
      window.location.reload();
      closeModal(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ global: error.message });
      }
    }
  };

  const handleDelete = (i) => {
    const newValues = [...formData.checklist];
    newValues.splice(i, 1);
    setFormData({ ...formData, checklist: newValues });
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      checklist: [...formData.checklist, { text: '', ischecked: false }],
    });
  };
  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          {/* <form className={styles.modal}>
            <label className={styles.star}>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Task title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <div className={styles.Priorty}>
              <label className={styles.star}> Select Priority</label>
              <button
                value="high"
                name="priority"
                onClick={(e) => handleChange(e)}
                type="button"
                className={formData.priority === 'high' ? styles.active : ''}
              >
                HIGH PRIORITY
              </button>
              <button
                value="moderate"
                name="priority"
                onClick={(e) => handleChange(e)}
                type="button"
                className={
                  formData.priority === 'moderate' ? styles.active : ''
                }
              >
                MODERATE PRIORITY
              </button>{' '}
              <button
                value="low"
                name="priority"
                onClick={(e) => handleChange(e)}
                type="button"
                className={formData.priority === 'low' ? styles.active : ''}
              >
                {' '}
                LOW PRIORITY{' '}
              </button>{' '}
            </div>

            <h4 className={styles.star}>checklist (/)</h4>
            {formData.checklist?.map((val, i) => (
              <div className={styles.addTaskcontainer} key={i}>
                <div className={styles.TaskInput}>
                  <input
                    type="checkbox"
                    name="ischecked"
                    checked={val.ischecked === 'true'}
                    value={val.ischecked}
                    className={styles.addTaskCheckbox}
                    onChange={(e) => handleChange(e, i)}
                  />
                  <input
                    type="text"
                    name="text"
                    value={val.text}
                    onChange={(e) => handleChange(e, i)}
                    placeholder="Add a task"
                    className={styles.addTaskTitle}
                  />
                </div>
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDelete(i)}
                >
                  <img src={Delete} alt="Delete" />
                </button>
              </div>
            ))}
            <button className={styles.addButton} onClick={handleAdd}>
              + Add New
            </button>
            <div className={styles.footer}>
              <div>
                <label htmlFor="dueDate"></label>
                <DatePicker
                  selected={formData.dueDate}
                  onChange={(date) =>
                    handleChange({ target: { name: 'dueDate', value: date } })
                  }
                  required
                />
              </div>
              <div className={styles.btns}>
                <button
                  className={styles.cancel}
                  type="button"
                  onClick={() => {
                    closeModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={styles.Save}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </form> */}
          <p> Under process</p>
          <button
            className={styles.cancel}
            type="button"
            onClick={() => {
              closeModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default EditsModal;
