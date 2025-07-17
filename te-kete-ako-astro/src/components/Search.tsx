import React, { useState, useEffect, useMemo } from 'react';
import ResourceCard from './ResourceCard';
import FlexSearch from 'flexsearch';

interface Resource {
  id: number;
  collection: 'lessons' | 'handouts' | 'pbl' | 'unitPlans';
  slug: string;
  data: {
    title: string;
    description: string;
    tags?: string[];
    learningArea?: string;
    level?: number;
  };
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const index = useMemo(() => new FlexSearch.Document<Resource>({
    document: {
      id: "id",
      index: ["data:title", "data:description", "data:tags", "data:learningArea"],
      store: true // Store the full document to display results
    },
    tokenize: "forward"
  }), []);

  useEffect(() => {
    const fetchAndIndexResources = async () => {
      try {
        const response = await fetch('/resources.json');
        const resources: Resource[] = await response.json();
        resources.forEach(resource => {
          index.add(resource);
        });
      } catch (error) {
        console.error("Failed to fetch or index resources:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndIndexResources();
  }, [index]);

  useEffect(() => {
    if (query.length > 2) {
      const searchResults = index.search(query, { enrich: true });
      // The result from an enriched search is a flat array of objects,
      // each containing a `result` array of document IDs.
      // We need to flatten these and get the actual documents.
      const finalResults = searchResults.flatMap(r => r.result);
      setResults(finalResults);
    } else {
      setResults([]);
    }
  }, [query, index]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for anything..."
        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
      />
      
      <div className="mt-8">
        {loading && <p>Loading and building search index...</p>}
        {!loading && query.length > 2 && (
          <p className="text-text-light mb-4">{results.length} results found for "{query}"</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map(resource => (
            <ResourceCard key={`${resource.collection}-${resource.id}`} resource={resource} collection={resource.collection} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
