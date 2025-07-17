import React, { useState, useMemo } from 'react';
import ResourceCard from './ResourceCard';
import type { Resource } from '../data/sampleResources';

interface ResourceLibraryProps {
  resources: Resource[];
}

const ResourceLibrary: React.FC<ResourceLibraryProps> = ({ resources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLearningArea, setSelectedLearningArea] = useState('All');

  const learningAreas = useMemo(() =>
    ['All', ...new Set(resources.map(r => r.learningArea))]
  , [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLearningArea = selectedLearningArea === 'All' || resource.learningArea === selectedLearningArea;
      return matchesSearch && matchesLearningArea;
    });
  }, [resources, searchTerm, selectedLearningArea]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        {learningAreas.map(area => (
          <button
            key={area}
            onClick={() => setSelectedLearningArea(area)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
              selectedLearningArea === area
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by keyword..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <p className="text-gray-500 md:col-span-3 text-center">No resources match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;
