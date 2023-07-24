import React from "react";

function Options({ options, dispatch, answer, correctOption }) {
  const handleOption = (idx) => {
    dispatch({ type: "newAnswer", payload: idx });
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
