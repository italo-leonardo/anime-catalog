// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SearchBar } from '../components/SearchBar';
import { AnimeCard } from '../components/AnimeCard';
import { api } from '../services/api';

interface Anime {
  id: string;
  title: string;
  genre: string;
}

export default function Home() {
  const router = useRouter();
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Carrega os animes ao iniciar
  useEffect(() => {
    const loadAnimes = async () => {
      try {
        const response = await api.getAnimes();
        setAnimes(response.data);
      } catch (error) {
        console.error('Erro ao carregar animes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAnimes();
  }, []);

  // Filtra os animes conforme o termo de busca
  const filteredAnimes = animes.filter(
    (anime) =>
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteAnime(id);
      setAnimes(animes.filter((anime) => anime.id !== id));
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Catálogo de Animes</title>
        <meta name="description" content="Gerencie sua coleção de animes" />
      </Head>

      <div className="min-h-screen bg-[#F8F9FA] p-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#EE0000] mb-2">
              Meu Catálogo de Animes
            </h1>
            <p className="text-gray-600">
              Gerencie sua lista de animes favoritos
            </p>
          </header>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-[#86A8E7]">
            <SearchBar onSearch={handleSearch} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {filteredAnimes.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title}
                  genre={anime.genre}
                  onEdit={(id) => router.push(`/edit/${id}`)}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => router.push('/add')}
                className="bg-[#EE0000] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition flex items-center mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Adicionar Anime
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}