import React, { useState, useEffect } from 'react';

interface MatchPair {
  id: number;
  content: string;
  matchId: number;
}

interface MatchingPairsProps {
  pairs: { id: number; item1: string; item2: string }[];
}

const MatchingPairs: React.FC<MatchingPairsProps> = ({ pairs }) => {
  const [cards, setCards] = useState<MatchPair[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    const gameCards = pairs.flatMap(pair => [
      { id: pair.id * 2, content: pair.item1, matchId: pair.id },
      { id: pair.id * 2 + 1, content: pair.item2, matchId: pair.id },
    ]);
    setCards(gameCards.sort(() => Math.random() - 0.5));
  }, [pairs]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].matchId === cards[second].matchId) {
        setMatched(prev => [...prev, cards[first].matchId]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards]);

  const handleCardClick = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(cards[index].matchId)) {
      setFlipped(prev => [...prev, index]);
    }
  };

  const isFlipped = (index: number) => flipped.includes(index) || matched.includes(cards[index].matchId);

  if (matched.length === pairs.length) {
    return <div className="text-2xl font-bold text-green-600 text-center p-8">You found all the matches!</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={card.id}
          onClick={() => handleCardClick(index)}
          className={`h-24 flex items-center justify-center p-2 rounded-lg cursor-pointer transition-transform transform ${
            isFlipped(index) ? 'bg-blue-400 text-white [transform:rotateY(180deg)]' : 'bg-gray-300'
          }`}
        >
          <div className={`transition-opacity duration-300 ${isFlipped(index) ? 'opacity-100' : 'opacity-0'}`}>
            {card.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchingPairs;
