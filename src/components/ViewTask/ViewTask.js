import React from 'react';
import './ViewTask.css';

const ViewTask = ({ task, onClose, onEdit, onDelete }) => {
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className="view-task">
      <button className="back-button" onClick={onClose}>Назад</button>
      <h3>{task.name}</h3>
      <p>Дата создания: {task.createdAt}</p>
      <p>Приоритет: {task.priority}</p>
      <p>Отметки: {task.tags.join(', ')}</p>
      <p>Описание: {task.description}</p>
      <button onClick={onEdit}>Редактировать</button>
      <button className="delete-button" onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default ViewTask;