import React, { useState } from 'react';

interface FillInTheBlanksProps {
  text: string; // Text with blanks represented by underscores, e.g., "The capital of New Zealand is ___."
  answers: string[];
}

const FillInTheBlanks: React.FC<FillInTheBlanksProps> = ({ text, answers }) => {
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(answers.length).fill(''));
  const [showFeedback, setShowFeedback] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
    setShowFeedback(false);
  };

  const checkAnswers = () => {
    setShowFeedback(true);
  };

  const parts = text.split('___');

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="text-xl leading-loose">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < answers.length && (
              <input
                type="text"
                value={userAnswers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={`border-b-2 mx-2 px-2 w-32 text-center text-lg ${
                  showFeedback
                    ? userAnswers[index].toLowerCase() === answers[index].toLowerCase()
                      ? 'border-green-500 bg-green-100'
                      : 'border-red-500 bg-red-100'
                    : 'border-gray-400'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button onClick={checkAnswers} className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
          Check Answers
        </button>
      </div>
    </div>
  );
};

export default FillInTheBlanks;
