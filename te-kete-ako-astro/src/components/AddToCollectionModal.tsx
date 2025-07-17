import React, { useState, useEffect } from 'react';

interface Collection {
  id: number;
  name: string;
  resources: any[];
}

interface AddToCollectionModalProps {
  resource: any;
  onClose: () => void;
}

const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({ resource, onClose }) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const savedCollections = localStorage.getItem('resourceCollections');
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    }
  }, []);

  const addToCollection = (collectionId: number) => {
    const updatedCollections = collections.map(c => {
      if (c.id === collectionId) {
        // Avoid adding duplicates
        if (!c.resources.find(r => r.id === resource.id && r.collection === resource.collection)) {
          return { ...c, resources: [...c.resources, resource] };
        }
      }
      return c;
    });
    localStorage.setItem('resourceCollections', JSON.stringify(updatedCollections));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add to Collection</h2>
        <p className="mb-6">Add "{resource.data.title}" to one of your collections:</p>
        <div className="space-y-2">
          {collections.length > 0 ? (
            collections.map(collection => (
              <button
                key={collection.id}
                onClick={() => addToCollection(collection.id)}
                className="w-full text-left p-3 bg-gray-100 hover:bg-blue-100 rounded-lg"
              >
                {collection.name}
              </button>
            ))
          ) : (
            <p>You don't have any collections yet. Go to "My Collections" to create one.</p>
          )}
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-gray-200 hover:bg-gray-300 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddToCollectionModal;
