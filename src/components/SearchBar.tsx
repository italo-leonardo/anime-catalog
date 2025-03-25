import React, { useState } from 'react';

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar anime..."
        className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5FFBF1]"
      />
      <button
        onClick={() => onSearch(query)}
        className="bg-[#86A8E7] text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
      >
        Buscar
      </button>
    </div>
  );
};