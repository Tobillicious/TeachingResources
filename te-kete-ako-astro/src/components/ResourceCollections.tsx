import React, { useState, useEffect } from 'react';

interface Resource {
  id: string;
  collection: string;
  slug: string;
  data: {
    title: string;
  };
}

interface Collection {
  id: number;
  name: string;
  resources: Resource[];
}

const ResourceCollections: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    const savedCollections = localStorage.getItem('resourceCollections');
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resourceCollections', JSON.stringify(collections));
  }, [collections]);

  const createCollection = () => {
    if (newCollectionName.trim() === '') return;
    const newCollection: Collection = {
      id: Date.now(),
      name: newCollectionName,
      resources: [],
    };
    setCollections([...collections, newCollection]);
    setNewCollectionName('');
  };

  const addResource = (collectionId: number) => {
    alert(`This would open a modal to add resources to collection ${collectionId}`);
  };

  const shareCollection = (collection: Collection) => {
    const data = btoa(JSON.stringify(collection));
    const url = `${window.location.origin}/collections/shared?data=${data}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Shareable link copied to clipboard!');
    });
  };

  return (
    <div>
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Create a New Collection</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="e.g., 'Year 10 History Starters'"
            className="flex-grow p-2 border-2 border-gray-300 rounded-lg"
          />
          <button onClick={createCollection} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">Your Collections</h2>
        {collections.length === 0 ? (
          <p>You haven't created any collections yet.</p>
        ) : (
          <div className="space-y-6">
            {collections.map(collection => (
              <div key={collection.id} className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold mb-4">{collection.name}</h3>
                  <button onClick={() => shareCollection(collection)} className="bg-gray-200 text-sm font-bold py-1 px-3 rounded hover:bg-gray-300">
                    Share
                  </button>
                </div>
                {collection.resources.length === 0 ? (
                  <p className="text-gray-500">This collection is empty.</p>
                ) : (
                  <ul>
                    {collection.resources.map(resource => (
                      <li key={resource.id} className="border-b py-2">
                        <a href={`/${resource.collection}/${resource.slug}`} className="hover:underline">
                          {resource.data.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => addResource(collection.id)} className="mt-4 bg-green-500 text-white text-sm font-bold py-1 px-3 rounded">
                  + Add Resource
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCollections;
