import React from 'react';
import { useRouter } from 'next/router';

interface AnimeCardProps {
  id: string;
  title: string;
  genre: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ 
  id, 
  title, 
  genre, 
  onEdit, 
  onDelete 
}) => {
  const router = useRouter();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-[#EE0000]">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-[#86A8E7] mb-2">{genre}</p>
        </div>
        
        {/* Botões de ação */}
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/edit/${id}`)} // Navega para edição
            className="text-white bg-[#86A8E7] hover:bg-blue-600 px-3 py-1 rounded-md transition"
            aria-label="Editar anime"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={() => onDelete(id)}
            className="text-white bg-[#EE0000] hover:bg-red-700 px-3 py-1 rounded-md transition"
            aria-label="Excluir anime"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};