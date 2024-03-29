import React, { useState, useEffect } from 'react';
import TaskForm from '../TaskForm/TaskForm.js';
import TaskCard from '../TaskCard/TaskCard.js';
import mockTasks from '../mockTask/mockTask.js';
import ViewTask from '../ViewTask/ViewTask.js'
import './TaskManager.css';
import '../../styles/FullTaskCard.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : mockTasks;
  });
  const [priorityFilter, setPriorityFilter] = useState('');
  const [tagFilters, setTagFilters] = useState([]);
  const [addingTask, setAddingTask] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowSidebar(false);
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
    setShowSidebar(true);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setAddingTask(false);
    setShowSidebar(true);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setSelectedTask(null);
    setShowSidebar(true);
  };

  const filterTasksByPriority = (task) => {
    if (!priorityFilter) return true;
    return task.priority === priorityFilter;
  };

  const filterTasksByTags = (task) => {
    if (tagFilters.length === 0) return true;
    return tagFilters.every((tag) => task.tags.includes(tag));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });
 
  return (
    <div className="task-manager-container">
        <div className={`sidebar ${showSidebar ? '' : 'hide-sidebar'}`}>
        <h3>Сортировка</h3>
        <div className="sort-options">
          <label>
            <input
              type="radio"
              value="newest"
              checked={sortBy === 'newest'}
              onChange={() => setSortBy('newest')}
            />
            Новые
          </label>
          <label>
            <input
              type="radio"
              value="oldest"
              checked={sortBy === 'oldest'}
              onChange={() => setSortBy('oldest')}
            />
            Старые
          </label>
        </div>
        <h3>Приоритет</h3>
        <div className="priority-options">
          <label>
            <input
              type="checkbox"
              value="low"
              checked={priorityFilter === 'low'}
              onChange={() => setPriorityFilter('low')}
            />
            Низкий
          </label>
          <label>
            <input
              type="checkbox"
              value="normal"
              checked={priorityFilter === 'normal'}
              onChange={() => setPriorityFilter('normal')}
            />
            Средний
          </label>
          <label>
            <input
              type="checkbox"
              value="high"
              checked={priorityFilter === 'high'}
              onChange={() => setPriorityFilter('high')}
            />
            Высокий
          </label>
        </div>
        <h3>Отметки</h3>
        <div className="tag-options">
          <label>
            <input
              type="checkbox"
              value="research"
              checked={tagFilters.includes('research')}
              onChange={(e) =>
                setTagFilters((prevFilters) =>
                  e.target.checked
                    ? [...prevFilters, e.target.value]
                    : prevFilters.filter((tag) => tag !== 'research')
                )
              }
            />
            Research
          </label>
          <label>
            <input
              type="checkbox"
              value="design"
              checked={tagFilters.includes('design')}
              onChange={(e) =>
                setTagFilters((prevFilters) =>
                  e.target.checked
                    ? [...prevFilters, e.target.value]
                    : prevFilters.filter((tag) => tag !== 'design')
                )
}
            />
            Design
          </label>
          <label>
            <input
              type="checkbox"
              value="development"
              checked={tagFilters.includes('development')}
              onChange={(e) =>
                setTagFilters((prevFilters) =>
                  e.target.checked
                    ? [...prevFilters, e.target.value]
                    : prevFilters.filter((tag) => tag !== 'development')
                )
              }
            />
            Development
          </label>
        </div>
      </div>

      <div className="main-content">
        {!addingTask && (
          <>
             <h2>Список задач</h2>
            <button className="blue-button" onClick={() => { setAddingTask(true); setShowSidebar(false); }}>Добавить задачу</button>
            <div className="task-cards-container">
              {sortedTasks
                .filter((task) => filterTasksByPriority(task) && filterTasksByTags(task))
                .map((task) => (
                  <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />
                ))}
            </div>
          </>
        )}
        {addingTask && (
          <div className="show-form">
            <h2>Редактирование</h2>
            <TaskForm addTask={addTask} />
          </div>
        )}
        {selectedTask && (
          <div className="full-screen-task">
            <ViewTask task={selectedTask} onClose={handleCloseTask} onDelete={deleteTask} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;