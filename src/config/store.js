import { create } from 'zustand';
import { getRequest, updateRequestState, getUsers, getUser } from './routes';

// Store para solicitudes
const useRequestStore = create((set, get) => ({
  requests: [],
  isLoading: false,
  error: null,

  getPendingRequests: () => {
    return get().requests
      .filter(request => request.state.toLowerCase() === 'pendiente')
      .sort((a, b) => new Date(a.create_date) - new Date(b.create_date));
  },

  fetchRequests: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await getRequest();
      
      if (response.success) {
        const sortedRequests = response.data.sort(
          (a, b) => new Date(b.start_date) - new Date(a.start_date)
        );
        
        set({ requests: sortedRequests, isLoading: false });
      } else {
        set({ 
          error: 'No se pudieron cargar las solicitudes', 
          isLoading: false 
        });
      }
    } catch (err) {
      set({ 
        error: err.message || 'Ocurrió un error desconocido', 
        isLoading: false 
      });
    }
  },

  updateRequestState: async (id, newState) => {
    try {
      await updateRequestState(id, newState);
      
      set(state => ({
        requests: state.requests.map(request => 
          request._id === id 
            ? { ...request, state: newState } 
            : request
        )
      }));
    } catch (err) {
      set({ 
        error: err.message || 'No se pudo actualizar el estado de la solicitud' 
      });
    }
  }
}));


const useEmployeeStore = create((set) => ({
  employees: [],
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await getUsers();
      
      if (response.success) {
        set({ 
          employees: response.data, 
          isLoading: false 
        });
      } else {
        set({ 
          error: 'No se pudieron cargar los empleados', 
          isLoading: false 
        });
      }
    } catch (err) {
      set({ 
        error: err.message || 'Error al obtener los empleados', 
        isLoading: false 
      });
    }
  },
}));

export { useRequestStore, useEmployeeStore };
