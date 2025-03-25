import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { api } from '../../services/api';

export default function EditAnime() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ title: '', genre: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Carrega os dados do anime ao iniciar
  useEffect(() => {
    const loadAnime = async () => {
      try {
        const response = await api.getAnimes();
        const anime = response.data.find((a: any) => a.id === id);
        if (anime) {
          setForm({ title: anime.title, genre: anime.genre });
        }
      } catch (error) {
        console.error('Erro ao carregar anime:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) loadAnime();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateAnime(id as string, form);
      router.push('/');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      alert('Erro ao salvar alterações!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Editar Anime</title>
      </Head>

      <div className="min-h-screen bg-[#F8F9FA] p-6">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-[#EE0000] mb-4">Editar Anime</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Título*</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#5FFBF1]"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Gênero*</label>
              <input
                type="text"
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#5FFBF1]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#EE0000] text-white py-2 rounded hover:bg-red-700"
            >
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </>
  );
}