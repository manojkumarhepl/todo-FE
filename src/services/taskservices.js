import axios from 'axios';

// const API_URL = 'http://localhost:8080/api';

const API_URL = 'https://todo-be-q9sl.onrender.com/api'

export const getTasks = async () => {
  return axios.get(API_URL+"/tasks");
};

export const createTask = async (task) => {
  return axios.post(API_URL+"/tasks", task);
};

export const updateTask = async (id, task) => {
  return axios.put(`${API_URL}/tasks`, { ...task, id }); // Send 'id' in the request body
};

export const deleteTask = async (id) => {
  return axios.delete(`${API_URL}/tasks/${id}`); // Use path variable for id
};
