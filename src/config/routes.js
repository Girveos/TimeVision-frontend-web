import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001/api/v1', 
    timeout: 5000, 
  });
  
  export const login = async (email, password) => {
    const form = new FormData();
    form.append('email', email);   
    form.append('password', password); 
    console.log(form);
    try {  
      const response = await api.post('/login', form);
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error; 
    }
  };
