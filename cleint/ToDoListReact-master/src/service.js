// import axios from 'axios';
// const apiUrl = process.env.REACT_APP_API_URL;
// export default {
//   getTasks: async () => {
//     const result = await axios.get(`${apiUrl}/tasks`);
//     return result.data;
//   },

//   addTask: async (name) => {
//     const result = await axios.post(`${apiUrl}/tasks`, { name, isComplete: false });
//     return result.data;
//   },

  // setCompleted: async (id, isComplete) => {
  //   const result = await axios.put(`${apiUrl}/tasks/${id}`, { isComplete });
  //   return result.data;
  // },

//   deleteTask: async (id) => {
//     const result = await axios.delete(`${apiUrl}/tasks/${id}`);
//     return result.data;
//   }
// };
// setCompleted: async (id, task) => {
//   const result = await axios.put(`${apiUrl}/tasks/${id}`, task);
//   return result.data;
// };


import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export default {
  getTasks: async () => {
    try {
      const result = await axios.get(`${apiUrl}/tasks`);
      return result.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  addTask: async (name) => {
    try {
      const task = { name, isComplete: false };
      const result = await axios.post(`${apiUrl}/tasks`, task);
      return result.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  setCompleted: async (task) => {
    try {
      if (!task.id) {
        throw new Error("Task ID is missing!");
      }

      const result = await axios.put(`${apiUrl}/tasks/${task.id}`, task, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return result.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      if (!id) throw new Error("Task ID is missing!");
      const result = await axios.delete(`${apiUrl}/tasks/${id}`);
      return result.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};
