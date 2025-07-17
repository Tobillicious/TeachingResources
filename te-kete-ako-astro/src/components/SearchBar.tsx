import React, { useState } from 'react';

const SearchBar: React.FC<{ className?: string }> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/library?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center ${className}`}>
      <input
        type="text"
        placeholder="Search all resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;