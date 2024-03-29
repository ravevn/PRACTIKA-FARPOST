import React, { useState } from 'react';
import './TaskCard.css';
import ViewTask from '../ViewTask/ViewTask'; 

const TaskCard = ({ task, onClick }) => {
  const [isViewing, setIsViewing] = useState(false);

  const handleViewClick = () => {
    setIsViewing(true);
    onClick(); 
    document.body.style.overflow = 'hidden'; 
  };

  const handleCloseView = () => {
    setIsViewing(false);
    document.body.style.overflow = 'auto'; 
  };
  const formatCreatedAt = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const diffInMs = now - createdAtDate; 

    //  менее одного дня с момента создания задачи
    if (diffInMs < 86400000) { 
      const hours = Math.floor(diffInMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
      if (hours > 0) {
        return (`${hours}ч ${minutes}м назад`);
      } else {
        return (`${minutes}м назад`);
      }
    } else {
      // более одного дня, выводим полную дату
      const day = createdAtDate.getDate();
      const month = createdAtDate.getMonth() + 1;
      const year = createdAtDate.getFullYear();
      return (`${day}.${month}.${year}`);
    }
  };

  return (
    <div className={`task-card ${isViewing ? 'full-screen' : ''}`} onClick={handleViewClick}>
      
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Дата создания: {formatCreatedAt(task.createdAt)}</p>
      <p>Приоритет: {task.priority}</p>
      <p>Отметки: {task.tags.join(', ')}</p>
   
      {isViewing && (
        <div className="view-task">
        <ViewTask task={task} onClose={handleCloseView} />
        <button className="back-button" onClick={handleCloseView}>Назад</button>
        <button className="edit-button" onClick={() => console.log('Edit clicked')}>Редактировать</button>
      </div>
    )}
  </div>
);
};

export default TaskCard;
