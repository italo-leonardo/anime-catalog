// src/services/api.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

// 1. Configuração base do Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/animes',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptores para tratamento global de erros
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('Erro na resposta:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('Sem resposta do servidor:', error.request);
    } else {
      console.error('Erro na requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

// 3. Tipagem das respostas
interface Anime {
  id: string;
  title: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

// 4. Interface do serviço
interface ApiService {
  getAnimes: () => Promise<AxiosResponse<Anime[]>>;
  addAnime: (data: Omit<Anime, 'id' | 'createdAt' | 'updatedAt'>) => Promise<AxiosResponse<Anime>>;
  updateAnime: (id: string, data: Partial<Omit<Anime, 'id' | 'createdAt'>>) => Promise<AxiosResponse<Anime>>;
  deleteAnime: (id: string) => Promise<AxiosResponse<void>>;
}

// 5. Implementação do serviço
const apiService: ApiService = {
  getAnimes: () => api.get('/'),

  addAnime: (data) => api.post('/', data),

  updateAnime: (id, data) => api.put(`/${id}`, data),

  deleteAnime: (id) => api.delete(`/${id}`),
};

// 6. Exportação padrão
export default apiService;