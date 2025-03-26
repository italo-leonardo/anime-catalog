// pages/add/index.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '../../services/api';

export default function AddAnime() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    genre: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validação simples
    if (!form.title.trim() || !form.genre.trim()) {
      setError('Preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      await api.addAnime({
        title: form.title,
        genre: form.genre
      });
      router.push('/'); // Volta para a lista após cadastro
    } catch (err) {
      setError('Erro ao cadastrar anime');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Head>
        <title>Adicionar Anime</title>
      </Head>

      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Adicionar Novo Anime</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ex: Attack on Titan"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
              Gênero *
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ex: Ação, Fantasia"
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-2">↻</span>
                  Salvando...
                </>
              ) : (
                'Salvar Anime'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}