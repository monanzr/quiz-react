import React from "react";

function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  const hasLastQuestion = index === numQuestions - 1;
  const handleNextButton = () => {
    hasLastQuestion
      ? dispatch({ type: "finishedQuiz" })
      : dispatch({ type: "nextQuestion" });
  };
  return (
    <button className="btn btn-ui" onClick={handleNextButton}>
      {hasLastQuestion ? "Finish Quiz" : "Next Button"} 
    </button>
  );
}

export default NextButton;
