import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { api } from '../../services/api'; // Importação adicionada

export default function AddAnime() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', genre: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado de loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Ativa o loading
    
    try {
      await api.addAnime(form);
      router.push('/');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar anime!');
    } finally {
      setIsSubmitting(false); // Desativa o loading
    }
  };

  return (
    <>
      <Head>
        <title>Adicionar Anime</title>
      </Head>

      <div className="min-h-screen bg-[#F8F9FA] p-6">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-[#EE0000] mb-4">Adicionar Anime</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Título*</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#5FFBF1] focus:border-transparent"
                placeholder="Ex: Attack on Titan"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Gênero*</label>
              <input
                type="text"
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#5FFBF1] focus:border-transparent"
                placeholder="Ex: Ação, Fantasia"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting} // Desabilita durante o carregamento
              className={`w-full bg-[#EE0000] text-white py-2 rounded hover:bg-red-700 transition flex justify-center items-center ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                'Salvar'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}