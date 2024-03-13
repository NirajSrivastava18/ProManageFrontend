import React, { useState, useEffect } from 'react';
import styles from './TaskModal.module.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Delete from '../../assets/images/Delete.svg';

const TaskModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'low',
    dueDate: new Date(),
    user: localStorage.getItem('id'),
    checklist: [{ text: '', ischecked: false }],
    state: 'todo',
  });
  const [errors, setErrors] = useState({});
  const { title, dueDate, priority, checklist } = formData;

  const [values, setValues] = useState([{ text: '', ischecked: false }]);

  const handleChange = (e, i) => {
    if (i !== undefined) {
      const newValues = [...values];
      newValues[i].text = e.target.value;
      newValues[i].ischecked = e.target.checked ? 'true' : 'false';
      newValues[i].priority = e.target.value;
      setValues(newValues);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      const response = await axios.post(
        'https://promanagebackend.onrender.com/api/createtask',
        { ...formData, checklist: values },
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

  const handleDelete = (e, i) => {
    e.preventDefault();
    const newValues = [...values];
    newValues.splice(i, 1);
    setValues(newValues);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setValues([...values, { text: '', ischecked: false }]);
  };

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <form className={styles.modal}>
            <label className={styles.star}>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Task title"
              value={title}
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
              >
                HIGH PRIORITY
              </button>
              <button
                value="moderate"
                name="priority"
                onClick={(e) => handleChange(e)}
                type="button"
              >
                MODERATE PRIORITY
              </button>
              <button
                value="low"
                name="priority"
                onClick={(e) => handleChange(e)}
                type="button"
              >
                LOW PRIORITY
              </button>
            </div>

            {/* <h4 className={styles.star}>checklist (0/0)</h4> */}
            <div className={styles.addArea}>
              {values.map((val, i) => (
                <div className={styles.addTaskcontainer} key={i}>
                  <div className={styles.TaskInput}>
                    <input
                      type="checkbox"
                      name="ischecked"
                      checked={val.ischecked}
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
                    onClick={(e) => handleDelete(e, i)}
                  >
                    <img src={Delete} alt="Delete" />
                  </button>
                </div>
              ))}
              <button className={styles.addButton} onClick={handleAdd}>
                + Add New
              </button>
            </div>

            <div className={styles.footer}>
              <div>
                <label htmlFor="dueDate"></label>
                <DatePicker
                  selected={dueDate}
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
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
