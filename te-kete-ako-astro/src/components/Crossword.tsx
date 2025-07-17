import React, { useState, useEffect } from 'react';

interface CrosswordData {
  clues: {
    across: { [key: string]: { clue: string; answer: string; row: number; col: number } };
    down: { [key: string]: { clue: string; answer: string; row: number; col: number } };
  };
  gridSize: number;
}

interface CrosswordProps {
  data: CrosswordData;
}

// Generate the grid layout and numbering from the clues
const generateGridData = (data: CrosswordData) => {
  const grid = Array(data.gridSize).fill(null).map(() => Array(data.gridSize).fill(null));
  const numbers: { [key: string]: number } = {};
  let number = 1;

  const allClues = [
    ...Object.entries(data.clues.across).map(([num, info]) => ({ ...info, dir: 'across', num: parseInt(num) })),
    ...Object.entries(data.clues.down).map(([num, info]) => ({ ...info, dir: 'down', num: parseInt(num) }))
  ];

  allClues.sort((a, b) => a.num - b.num).forEach(({ answer, row, col, dir, num }) => {
    numbers[`${row},${col}`] = num;
    for (let i = 0; i < answer.length; i++) {
      const r = row + (dir === 'down' ? i : 0);
      const c = col + (dir === 'across' ? i : 0);
      grid[r][c] = ''; // Mark as an active cell
    }
  });

  return { grid, numbers };
};


const Crossword: React.FC<CrosswordProps> = ({ data }) => {
  const { grid: initialGrid, numbers } = React.useMemo(() => generateGridData(data), [data]);
  const [gridState, setGridState] = useState(initialGrid);
  const [isComplete, setIsComplete] = useState(false);

  const checkCompletion = () => {
    let correct = true;
    Object.values(data.clues.across).forEach(({ answer, row, col }) => {
      for (let i = 0; i < answer.length; i++) {
        if (gridState[row][col + i] !== answer[i].toUpperCase()) correct = false;
      }
    });
    Object.values(data.clues.down).forEach(({ answer, row, col }) => {
      for (let i = 0; i < answer.length; i++) {
        if (gridState[row + i][col] !== answer[i].toUpperCase()) correct = false;
      }
    });
    setIsComplete(correct);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const newGridState = gridState.map(r => [...r]);
    newGridState[row][col] = e.target.value.toUpperCase().slice(0, 1);
    setGridState(newGridState);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="bg-surface p-4 rounded-lg shadow-md inline-block">
          {gridState.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="w-8 h-8 md:w-10 md:h-10 border border-gray-300 relative bg-white">
                  {cell === null ? (
                    <div className="w-full h-full bg-gray-900"></div>
                  ) : (
                    <>
                      {numbers[`${rowIndex},${colIndex}`] && (
                        <span className="absolute top-0 left-0.5 text-xs font-bold text-gray-500">
                          {numbers[`${rowIndex},${colIndex}`]}
                        </span>
                      )}
                      <input
                        type="text"
                        maxLength={1}
                        value={gridState[rowIndex][colIndex] || ''}
                        onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                        className="w-full h-full text-center text-lg font-bold uppercase bg-transparent"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={checkCompletion} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Check My Answers
        </button>
        {isComplete && (
          <p className="text-2xl font-bold text-green-600 mt-4">Congratulations! You've completed the puzzle!</p>
        )}
      </div>
      <div className="w-full lg:w-1/3">
        <div>
          <h3 className="text-xl font-bold mb-2">Across</h3>
          <ul className="space-y-1">
            {Object.entries(data.clues.across).map(([num, { clue }]) => (
              <li key={`across-${num}`}><strong>{num}.</strong> {clue}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Down</h3>
          <ul className="space-y-1">
            {Object.entries(data.clues.down).map(([num, { clue }]) => (
              <li key={`down-${num}`}><strong>{num}.</strong> {clue}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Crossword;
