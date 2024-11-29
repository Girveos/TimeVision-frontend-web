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
    const token = await localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const response = await api.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } 
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const token = await localStorage.getItem("token");
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

export const getRequest = async () => {
  try {
    const token = await localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const response = await api.get("/request/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const requests = response.data
    const detailedRequest = [];

    for (const request of requests) {
      const requestDetails = await getUserById(request.id_user);
      if (requestDetails.success) {
        detailedRequest.push({
          ...request,
          user_name: `${requestDetails.data.name} ${requestDetails.data.lastname}`
        });
        
      } else {
        console.error(`Error obteniendo detalles del turno ${request._id}:`, requestDetails.message);
      }
    }
    return { success: true, data: detailedRequest };
  } catch (error) {
   return { success: false, message: error};
  }
};

export const getUserById = async (id) => {
  try {
    const token = await localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const response = await api.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return { success: false, message: error };
  }
};

export const getShifts = async () => {
  try {
    const token = await localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token");
    }

    const response = await api.get("/assignment/DepartmentAssignments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (response.status === 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error detallado en getShifts:", error);
    console.error("Respuesta del servidor:", error.response?.data);
    return { 
      success: false, 
      error: error.response?.data?.msg || error.message 
    };
  }
};

export const getShiftById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token");
    }

    const response = await api.get(`/shift/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("Error al obtener el turno:", error);
    return { success: false, error: error.message };
  }
};