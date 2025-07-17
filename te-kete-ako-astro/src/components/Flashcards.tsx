import React, { useState } from 'react';

interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardsProps {
  cards: Flashcard[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full max-w-lg h-64 perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-blue-200 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold">{currentCard.front}</p>
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 bg-green-200 rounded-lg shadow-lg">
            <p className="text-xl">{currentCard.back}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between w-full max-w-lg">
        <button onClick={handlePrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          &larr; Prev
        </button>
        <p className="text-lg font-medium">{currentIndex + 1} / {cards.length}</p>
        <button onClick={handleNext} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
