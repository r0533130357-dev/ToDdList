import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/tasks`);
    return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post(`${apiUrl}/tasks`, { name, isComplete: false });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const result = await axios.put(`${apiUrl}/tasks/${id}`, { isComplete });
    return result.data;
  },

  deleteTask: async (id) => {
    const result = await axios.delete(`${apiUrl}/tasks/${id}`);
    return result.data;
  }
};
