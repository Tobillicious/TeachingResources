import React, { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizProps {
  data?: {
    questions: QuizQuestion[];
  };
  questions?: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = (props) => {
  const questions = props.data?.questions || props.questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (questions.length === 0) {
    return <p>No questions provided for this quiz.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    setShowFeedback(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-6">Your final score is: {score} out of {questions.length}</p>
        <button onClick={handleRestart} className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedAnswer;
          let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-colors";

          if (showFeedback) {
            if (isCorrect) {
              buttonClass += " bg-green-200 border-green-500";
            } else if (isSelected) {
              buttonClass += " bg-red-200 border-red-500";
            }
          } else if (isSelected) {
            buttonClass += " bg-blue-100 border-blue-400";
          } else {
            buttonClass += " hover:bg-gray-100";
          }

          return (
            <button key={index} onClick={() => handleAnswerSelect(option)} className={buttonClass} disabled={showFeedback}>
              {option}
            </button>
          );
        })}
      </div>
      <div className="mt-6 text-right">
        {showFeedback ? (
          <button onClick={handleNext} className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        ) : (
          <button onClick={handleSubmit} className="bg-green-500 text-white font-bold py-2 px-6 rounded hover:bg-green-700" disabled={!selectedAnswer}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
