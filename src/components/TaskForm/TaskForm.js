import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask, taskToEdit, handleGoBack }) => {
  const [taskName, setTaskName] = useState(taskToEdit ? taskToEdit.name : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : 'low');
  const [selectedTags, setSelectedTags] = useState(taskToEdit ? taskToEdit.tags : []);

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTags(prevTags => [...prevTags, value]);
    } else {
      setSelectedTags(prevTags => prevTags.filter(tag => tag !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    const editedTask = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      name: taskName,
      description: description,
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString(),
      priority: priority,
      tags: selectedTags
    };
    if (taskToEdit) {
    } else {
      addTask(editedTask);
    }
    setTaskName('');
    setDescription('');
    setPriority('low');
    setSelectedTags([]);
  };

  return (
    <div className="task-form-container">
      <button className="back-button" onClick={handleGoBack}>Назад</button>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название задачи:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Приоритет:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Низкий</option>
            <option value="normal">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>
        <div className="form-group">
          <label>Отметки:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="research"
                checked={selectedTags.includes('research')}
                onChange={handleTagChange}
              />
              Research
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="design"
                checked={selectedTags.includes('design')}
                onChange={handleTagChange}
              />
              Design
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                value="development"
                checked={selectedTags.includes('development')}
                onChange={handleTagChange}
              />
              Development
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">{'Сохранить'}</button>
      </form>
    </div>
  );
};

export default TaskForm;