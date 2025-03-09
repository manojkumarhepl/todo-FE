import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskservices';
import "../assets/todolist.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleCreateTask = async () => {
    if (!newTaskName.trim()) return;
    try {
      await createTask({ taskName: newTaskName, isActive: true });
      setNewTaskName('');
      loadTasks();
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  const handleEditTask = (task) => {
    setEditTaskId(task.id);
    setEditTaskName(task.taskName);
  };

  const handleUpdateTask = async () => {
    if (!editTaskName.trim()) return;
    try {
      await updateTask(editTaskId, { taskName: editTaskName, isActive: true });
      setEditTaskId(null);
      setEditTaskName('');
      loadTasks();
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditTaskName('');
  };

  const handleToggleTask = async (task) => {
    try {
      await updateTask(task.id, { ...task, isActive: !task.isActive });
      loadTasks();
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List</h1>

      {/* Create Task */}
      <div className="todo-input-container">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter new task"
          className="todo-input"
        />
        <button onClick={handleCreateTask} className="todo-add-button">
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            {editTaskId === task.id ? (
              <>
                {/* Editing Task */}
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  className="todo-edit-input"
                />
                <div className='btns'>
                <button onClick={handleUpdateTask} className="todo-save-button">
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="todo-cancel-button"
                >
                  Cancel
                </button>
                </div>
                
              </>
            ) : (
              <>
                {/* Task Display */}
                <span
                  className={`todo-task-name ${
                    !task.isActive ? 'todo-completed' : ''
                  }`}
                  onClick={() => handleToggleTask(task)}
                >
                  {task.taskName}
                </span>
                <div className='btns'>
                <button
                  onClick={() => handleEditTask(task)}
                  className="todo-edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="todo-delete-button"
                >
                  Delete
                </button>
                </div>
                
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
