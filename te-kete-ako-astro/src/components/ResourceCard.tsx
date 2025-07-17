import React, { useState } from 'react';
import AddToCollectionModal from './AddToCollectionModal';

interface Props {
  resource: any;
  collection: 'lessons' | 'handouts' | 'pbl' | 'unitPlans';
}

const ResourceCard: React.FC<Props> = ({ resource, collection }) => {
  const { data } = resource;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="block p-6 bg-surface rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-border transform hover:-translate-y-1 flex flex-col h-full">
        <a href={`/${collection}/${resource.slug}`} className="flex-grow">
          <h3 className="text-xl font-bold font-heading text-primary mb-2">{data.title}</h3>
          <span className="inline-block bg-accent text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 capitalize">
            {collection.replace(/s$/, '')}
          </span>
          <p className="text-text-light text-sm mb-4">{data.description}</p>
        </a>
        <div className="mt-auto">
          {data.learningArea && (
            <span className="inline-block bg-primary-dark text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">
              {data.learningArea}
            </span>
          )}
          {data.level && (
            <span className="inline-block bg-secondary text-text text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
              Level {data.level}
            </span>
          )}
          {data.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {data.tags.map((tag: string) => (
                <span key={tag} class="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full bg-green-500 text-white text-sm font-bold py-2 px-3 rounded hover:bg-green-700 transition-colors"
          >
            + Add to Collection
          </button>
        </div>
      </div>
      {isModalOpen && <AddToCollectionModal resource={resource} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ResourceCard;
