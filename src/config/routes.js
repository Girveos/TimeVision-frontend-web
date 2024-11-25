import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 10000,
});

export const login = async (email, password) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  try {
    const response = await api.post("/login", form);
    const data = response.data;
    if (response.status === 200) {
      await localStorage.setItem("token", data.access);
      return { success: true, data };
    } else {
      return {
        success: false,
        message: data.msg,
      };
    }
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const response = await api.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const form = new FormData();
    form.append("currentPassword", currentPassword);
    form.append("newPassword", newPassword);

    const response = await api.post("/user/changepassword", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data

    if (response.status === 200) {
      return { success: true, message: data };
    } 
  } catch (error) {
    return { success: false, message: error.message };
  }
};

