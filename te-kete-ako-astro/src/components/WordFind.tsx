import React, { useState, useMemo } from 'react';

// --- Utility Functions (no changes) ---
const generateGrid = (words: string[], gridSize: number): (string | null)[][] => {
  const grid: (string | null)[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  const directions = [
    { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
    { x: 1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }
  ];

  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (canPlaceWord(grid, word, row, col, dir)) {
        placeWord(grid, word, row, col, dir);
        placed = true;
      }
      attempts++;
    }
  });

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === null) {
        grid[r][c] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
      }
    }
  }
  return grid;
};

const canPlaceWord = (grid: (string | null)[][], word: string, row: number, col: number, dir: { x: number; y: number }): boolean => {
  const gridSize = grid.length;
  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dir.y;
    const newCol = col + i * dir.x;
    if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) return false;
    const cell = grid[newRow][newCol];
    if (cell !== null && cell !== word[i].toUpperCase()) return false;
  }
  return true;
};

const placeWord = (grid: (string | null)[][], word: string, row: number, col: number, dir: { x: number; y: number }): void => {
  for (let i = 0; i < word.length; i++) {
    grid[row + i * dir.y][col + i * dir.x] = word[i].toUpperCase();
  }
};
// --- End of Utilities ---


interface WordFindProps {
  words: string[];
  gridSize?: number;
}

const WordFind: React.FC<WordFindProps> = ({ words: initialWords, gridSize = 12 }) => {
  const words = useMemo(() => initialWords.map(w => w.toUpperCase()), [initialWords]);
  const grid = useMemo(() => generateGrid(words, gridSize), [words, gridSize]);
  
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());

  const handleMouseDown = (index: number) => {
    setIsSelecting(true);
    setSelection([index]);
  };

  const handleMouseEnter = (index: number) => {
    if (isSelecting && !selection.includes(index)) {
      setSelection([...selection, index]);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    const selectedString = selection.map(i => grid.flat()[i]).join('');
    const reversedSelectedString = selectedString.split('').reverse().join('');

    if (words.includes(selectedString) && !foundWords.has(selectedString)) {
      setFoundWords(new Set(foundWords).add(selectedString));
    } else if (words.includes(reversedSelectedString) && !foundWords.has(reversedSelectedString)) {
      setFoundWords(new Set(foundWords).add(reversedSelectedString));
    }
    setSelection([]);
  };

  const getCellClass = (index: number) => {
    let baseClass = "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-lg font-bold rounded-md cursor-pointer transition-colors";
    if (selection.includes(index)) {
      return `${baseClass} bg-yellow-400`;
    }
    // A more advanced implementation would store the paths of found words
    return `${baseClass} bg-gray-200 hover:bg-yellow-300`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start" onMouseUp={handleMouseUp}>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-4">Find these words:</h3>
        <ul className="flex flex-wrap gap-4">
          {words.map(word => (
            <li 
              key={word} 
              className={`text-lg p-2 rounded ${foundWords.has(word) ? 'line-through text-gray-500 bg-green-200' : 'bg-gray-100'}`}
            >
              {word}
            </li>
          ))}
        </ul>
        {foundWords.size === words.length && (
          <p className="text-2xl font-bold text-green-600 mt-4">Congratulations! You found all the words!</p>
        )}
      </div>
      <div className="bg-surface p-4 rounded-lg shadow-md select-none">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
          {grid.flat().map((letter, index) => (
            <div
              key={index}
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              className={getCellClass(index)}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordFind;
