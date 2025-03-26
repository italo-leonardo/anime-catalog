// src/pages/edit/[id].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '../../services/api';

// Tipagem alinhada com a interface Anime do api.ts
interface AnimeFormData {
  title: string;
  genre: string;
}

export default function EditAnime() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState<AnimeFormData>({ title: '', genre: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carrega os dados do anime para edição
  useEffect(() => {
    if (!id) return;

    const loadAnimeData = async () => {
      try {
        const response = await api.getAnimes();
        const animeToEdit = response.data.find((anime) => anime.id === id);
        
        if (animeToEdit) {
          setForm({
            title: animeToEdit.title,
            genre: animeToEdit.genre
          });
        }
      } catch (error) {
        console.error('Erro ao carregar anime:', error);
        alert('Erro ao carregar dados do anime');
      } finally {
        setIsLoading(false);
      }
    };

    loadAnimeData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Ajuste para enviar apenas os campos editáveis conforme a interface ApiService
      const updateData: Partial<AnimeFormData> = {
        title: form.title,
        genre: form.genre
      };

      await api.updateAnime(id as string, updateData);
      router.push('/');
    } catch (error) {
      console.error('Erro na atualização:', error);
      alert('Erro ao salvar alterações');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando dados do anime...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Editar Anime</title>
      </Head>

      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Editar Anime</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2 font-medium">
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="genre" className="block mb-2 font-medium">
              Gênero
            </label>
            <input
              id="genre"
              name="genre"
              type="text"
              value={form.genre}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 border rounded hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}