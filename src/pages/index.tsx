// pages/index.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '../services/api';

interface Anime {
  id: string;
  title: string;
  genre: string;
  createdAt: string;
}

export default function Home() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Carrega os animes ao iniciar
  useEffect(() => {
    async function loadAnimes() {
      try {
        const response = await api.getAnimes();
        setAnimes(response.data);
      } catch (err) {
        setError('Falha ao carregar animes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAnimes();
  }, []);

  // Função para deletar anime
  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este anime?')) {
      try {
        await api.deleteAnime(id);
        setAnimes(animes.filter(anime => anime.id !== id));
      } catch (err) {
        alert('Erro ao excluir anime');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Catálogo de Animes</title>
      </Head>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Meu Catálogo de Animes</h1>
        
        <button
          onClick={() => router.push('/add')}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Adicionar Anime
        </button>

        {animes.length === 0 ? (
          <p className="text-center">Nenhum anime cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {animes.map((anime) => (
              <div key={anime.id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{anime.title}</h2>
                <p className="text-gray-600">{anime.genre}</p>
                <p className="text-sm text-gray-400">
                  Cadastrado em: {new Date(anime.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => router.push(`/edit/${anime.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(anime.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}