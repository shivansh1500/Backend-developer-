import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: 'pending' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/tasks');
      setTasks(res.data.data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/tasks/${currentTask._id}`, currentTask);
      } else {
        await axios.post('http://localhost:8080/api/tasks', currentTask);
      }
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:8080/api/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const openNewTaskModal = () => {
    setCurrentTask({ title: '', description: '', status: 'pending' });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Task Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome, {user.email} <span className="badge pending">{user.role}</span></p>
        </div>
        <div className="flex-row">
          <button className="btn-primary" onClick={openNewTaskModal} style={{ width: 'auto' }}>+ New Task</button>
          <button className="btn-secondary" onClick={logout}>Sign Out</button>
        </div>
      </div>

      {error && <div className="text-error" style={{ marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center' }}>
          <h3>No tasks found</h3>
          <p>Create your first task to get started.</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <div key={task._id} className={`glass-panel task-card ${task.status}`}>
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`badge ${task.status}`}>{task.status.replace('-', ' ')}</span>
              </div>
              <p className="task-details">{task.description || 'No description provided.'}</p>
              <div className="task-actions">
                <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} onClick={() => openEditModal(task)}>Edit</button>
                <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', color: 'var(--error)', borderColor: 'rgba(239,68,68,0.3)' }} onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="glass-panel modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>{isEditing ? 'Edit Task' : 'New Task'}</h2>
            <form onSubmit={handleSaveTask}>
              <div className="input-group">
                <label>Title</label>
                <input 
                  type="text" 
                  value={currentTask.title} 
                  onChange={e => setCurrentTask({...currentTask, title: e.target.value})} 
                  required 
                />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea 
                  rows="3"
                  value={currentTask.description} 
                  onChange={e => setCurrentTask({...currentTask, description: e.target.value})} 
                />
              </div>
              <div className="input-group">
                <label>Status</label>
                <select 
                  value={currentTask.status} 
                  onChange={e => setCurrentTask({...currentTask, status: e.target.value})}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex-row" style={{ marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
