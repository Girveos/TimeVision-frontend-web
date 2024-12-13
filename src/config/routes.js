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
      const data = response.data;

      const department = await getUserDepartment(data.id_department);
      
      data.department_name = department.data.name;

      console.log(data)
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUserDepartment = async (id) => {
  try {
    const token = await localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }
    console.log("Aqui", id);
    const response = await api.get(`/department/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("RESPONSE", response.data);

    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.log(error);
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
    const data = response.data;

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

    const response = await api.get("/request/requestsDeparment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const requests = response.data;
    const detailedRequest = [];

    for (const request of requests) {
      const requestDetails = await getUserById(request.id_user);
      if (requestDetails.success) {
        detailedRequest.push({
          ...request,
          user_name: `${requestDetails.data.name} ${requestDetails.data.lastname}`,
        });
      } else {
        console.error(
          `Error obteniendo detalles del turno ${request._id}:`,
          requestDetails.message
        );
      }
    }
    return { success: true, data: detailedRequest };
  } catch (error) {
    return { success: false, message: error };
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

export const updateRequestState = async (id, state) => {
  try {
    const token = await localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const form = new FormData();
    form.append("state", state);

    const response = await api.patch(`/request/update/${id}`, form, {
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

export const getUsers = async () => {
  try {
    const token = await localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const response = await api.get("/user/usersDepartment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = response.data;

      console.log(data)
      return { success: true, data: data };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return { 
      success: true, 
      message: response.data.msg 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.msg || "Error al solicitar el código" 
    };
  }
};

export const verifyResetCode = async (email, code) => {
  try {
    const response = await api.post("/reset-password/verify", { 
      email, 
      code 
    });
    return { 
      success: true, 
      message: response.data.msg 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.msg || "Error al verificar el código" 
    };
  }
};

export const resetPassword = async (email, token, newPassword) => {
  try {
    const response = await api.post("/reset-password", {
      email,
      token,
      newPassword
    });
    return { 
      success: true, 
      message: response.data.msg 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.msg || "Error al cambiar la contraseña" 
    };
  }
};