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
  // שליפת כל המשימות
  getTasks: async () => {
    try {
      const result = await axios.get(`${apiUrl}/tasks`);
      return result.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // הוספת משימה חדשה
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

  // עדכון סטטוס של משימה (PUT)
  setCompleted: async (task) => {
    try {
      // בדיקה שה־id קיים
      if (!task.id) {
        throw new Error("Task ID is missing!");
      }

      // שולחים את האובייקט המלא ל־backend (id, name, isComplete)
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

  // מחיקת משימה
  deleteTask: async (id) => {
    try {
      if (!id) {
        throw new Error("Task ID is missing!");
      }

      const result = await axios.delete(`${apiUrl}/tasks/${id}`);
      return result.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};
