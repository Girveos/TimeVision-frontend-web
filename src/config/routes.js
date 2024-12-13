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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }
    console.log("Aqui", id);
    const response = await api.get(`/department/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const response = await api.get("/user/usersDepartment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const users = response.data;

      const usersWithDepartments = await Promise.all(
        users.map(async (user) => {
          try {
            const department = await getUserDepartment(user.id_department);
            return {
              ...user,
              department_name: department.data.name, 
            };
          } catch {
            return { ...user, department_name: "No encontrado" }; 
          }
        })
      );

      console.log(usersWithDepartments);
      return { success: true, data: usersWithDepartments };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updatePhoto = async (photo) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token. Inicia sesión nuevamente.");
  }

  const form = new FormData();
  form.append("photo", photo);

  try {
    const response = await api.post("/user/photo", form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.photo;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || error.message;
    throw new Error(`Error al subir la foto: ${errorMsg}`);
  }
};

export const createUser = async (name, lastname, type_doc, num_doc, telephone, email, password, position) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const form = new FormData();
    form.append("name", name);
    form.append("lastname", lastname);
    form.append("type_doc", type_doc);
    form.append("num_doc", num_doc);
    form.append("telephone", telephone);
    form.append("email", email);
    form.append("password", password);
    form.append("position", position);

    const response = await api.post("/user/createuser", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    if (response.status === 201) {
      return { success: true, message: data };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateUser = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const form = new FormData();
    form.append("name", data.name);
    form.append("lastname", data.lastname);
    form.append("telephone", data.telephone);
    form.append("email", data.email);
    form.append("position", data.position);
    form.append("active", data.active);

    const response = await api.patch(`/user/update/${id}`, form, {
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

    console.log(response.data);
    if (response.status === 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    console.error("Error detallado en getShifts:", error);
    console.error("Respuesta del servidor:", error.response?.data);
    return {
      success: false,
      error: error.response?.data?.msg || error.message,
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

export const getHomeStatistics = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const response = await api.get("/user/statususers", {
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

export const getNews = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const response = await api.get("/request/TenUpdates", {
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
    return { success: false, message: error.message };
  }
};

export const shiftsAssigments = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token. Inicia sesión nuevamente.");
    }

    const form = new FormData();
    form.append("start", data.start);
    form.append("end", data.end);
    form.append("restriction1", data.restriction1);
    form.append("restriction2", data.restriction2);
    form.append("restriction3", data.restriction3);
    form.append("employees", data.employees);

    const response = await api.post("/assigment/automaticassignment", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    if (response.status === 201) {
      return { success: true, message: data };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};