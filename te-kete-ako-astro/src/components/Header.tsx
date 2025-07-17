// DocumentationAgent: This component renders the main navigation header for the application.
// DeveloperAgent: Added a link to the agent communication log.
import React from 'react';
import SearchBar from './SearchBar.tsx';

const Header: React.FC = () => {
  return (
    <header className="bg-surface shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-text">Te Kete Ako</a>
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2">
            <a href="/" className="text-sm font-medium text-text-light hover:text-primary">Home</a>
            <a href="/library" className="text-sm font-medium text-text-light hover:text-primary">All Resources</a>
            <a href="/collections" className="text-sm font-medium text-text-light hover:text-primary">My Collections</a>
            <a href="/about" className="text-sm font-medium text-text-light hover:text-primary">About</a>
            <a href="/agents.md" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-text-light hover:text-primary">Agent Log</a>
            <SearchBar client:load className="w-full md:w-auto" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
