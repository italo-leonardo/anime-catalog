import axios from 'axios';

// Mock de dados (simula um banco de dados)
let mockAnimes = [
  { id: '1', title: 'Attack on Titan', genre: 'Ação, Fantasia' },
  { id: '2', title: 'Demon Slayer', genre: 'Ação, Aventura' },
];

export const api = {
  // Busca todos os animes (simula uma API real)
  getAnimes: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Delay de 0.5s
    return { data: mockAnimes };
  },

  // Deleta um anime
  deleteAnime: async (id: string) => {
    mockAnimes = mockAnimes.filter(anime => anime.id !== id);
    return { data: { success: true } };
  },

  addAnime: async (newAnime: { title: string; genre: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay
    const anime = { 
      id: Date.now().toString(), // Gera um ID único
      ...newAnime 
    };
    mockAnimes.push(anime);
    return { data: anime };
  },

  updateAnime: async (id: string, data: { title: string; genre: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockAnimes.findIndex(anime => anime.id === id);
    if (index !== -1) {
      mockAnimes[index] = { ...mockAnimes[index], ...data };
    }
    return { data: mockAnimes[index] };
  }
};