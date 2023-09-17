import React from "react";
import useQuiz from "../hooks/useQuiz";

function Options({ options, correctOption }) {
  const { getAnswer: answer, onNewAnswer } = useQuiz()

  const handleOption = (idx) => {
    onNewAnswer(idx)
  };
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => handleOption(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
