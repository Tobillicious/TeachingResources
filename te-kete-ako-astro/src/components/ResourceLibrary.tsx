import React, { useState, useEffect } from 'react';

interface ResourceLibraryProps {
  resources: any[];
  initialSearchTerm?: string;
}

const ResourceLibrary: React.FC<ResourceLibraryProps> = ({ resources: initialResources, initialSearchTerm = '' }) => {
  const [resources, setResources] = useState(initialResources);
  const [filteredResources, setFilteredResources] = useState(initialResources);
  const [learningAreaFilter, setLearningAreaFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setResources(initialResources);
    setFilteredResources(initialResources);
    setSearchTerm(initialSearchTerm);
  }, [initialResources, initialSearchTerm]);

  useEffect(() => {
    let currentFiltered = resources;

    // Apply learning area filter
    if (learningAreaFilter !== 'all') {
      currentFiltered = currentFiltered.filter(
        (resource) => resource.data.learningArea === learningAreaFilter
      );
    }

    // Apply level filter
    if (levelFilter !== 'all') {
      currentFiltered = currentFiltered.filter(
        (resource) => resource.data.level === parseInt(levelFilter)
      );
    }

    // Apply tag filter
    if (tagFilter !== 'all') {
      currentFiltered = currentFiltered.filter(
        (resource) => resource.data.tags && resource.data.tags.includes(tagFilter)
      );
    }

    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentFiltered = currentFiltered.filter(
        (resource) =>
          resource.data.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          resource.data.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredResources(currentFiltered);
  }, [learningAreaFilter, levelFilter, tagFilter, searchTerm, resources]);

  const allLearningAreas = ['all', ...new Set(resources.map((resource) => resource.data.learningArea).filter(Boolean))].sort();
  const allLevels = ['all', ...new Set(resources.map((resource) => resource.data.level).filter(Boolean))].sort((a, b) => a - b);
  const allTags = ['all', ...new Set(resources.flatMap((resource) => resource.data.tags).filter(Boolean))].sort();

  return (
    <div>
      <div className="flex flex-col items-center mb-8">
        <input
          type="text"
          placeholder="Search resources by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <select
            value={learningAreaFilter}
            onChange={(e) => setLearningAreaFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allLearningAreas.map((area) => (
              <option key={area} value={area}>
                {area === 'all' ? 'All Learning Areas' : area}
              </option>
            ))}
          </select>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allLevels.map((level) => (
              <option key={level} value={level}>
                {level === 'all' ? 'All Year Levels' : `Year ${level}`}
              </option>
            ))}
          </select>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag === 'all' ? 'All Tags' : tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{resource.data.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{resource.data.description}</p>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              {resource.data.learningArea && (
                <span className="mr-2 px-2 py-1 bg-gray-100 rounded-full">{resource.data.learningArea}</span>
              )}
              {resource.data.level && (
                <span className="px-2 py-1 bg-gray-100 rounded-full">Year {resource.data.level}</span>
              )}
            </div>
            <a href={`/${resource.collection}/${resource.slug}`} className="text-blue-500 hover:underline">
              View Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceLibrary;