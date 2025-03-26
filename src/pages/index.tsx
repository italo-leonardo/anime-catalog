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

      <div className="min-h-screen bg-gradient-to-br from-[#86A8E7] to-[#5FFBF1] p-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#EE0000] mb-2">
              Meu Catálogo de Animes
            </h1>
            <p className="text-gray-600">
              {animes.length} {animes.length === 1 ? 'anime' : 'animes'} cadastrados
            </p>
          </header>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-6">
            <button
              onClick={() => router.push('/add')}
              className="bg-[#EE0000] text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition flex items-center mx-auto mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Adicionar Anime
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {animes.map((anime) => (
                <div key={anime.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#EE0000] hover:shadow-lg transition">
                  <h2 className="text-xl font-semibold text-gray-800">{anime.title}</h2>
                  <p className="text-[#86A8E7] mb-2">{anime.genre}</p>
                  <p className="text-sm text-gray-400">
                    Cadastrado em: {new Date(anime.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => router.push(`/edit/${anime.id}`)}
                      className="text-[#86A8E7] hover:text-blue-600 px-2 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(anime.id)}
                      className="text-[#EE0000] hover:text-red-600 px-2 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}