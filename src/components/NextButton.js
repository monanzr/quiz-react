import React from "react";
import useQuiz from "../hooks/useQuiz";

function NextButton() {
  const { getAnswer: answer, getIndex: index, getNumQuestions: numQuestions, onNextQuestion, onFinishedQuiz } = useQuiz()

  if (answer === null) return null;
  const hasLastQuestion = index === numQuestions - 1;
  const handleNextButton = () => {
    hasLastQuestion
      ? onFinishedQuiz()
      : onNextQuestion();
  };
  return (
    <button className="btn btn-ui" onClick={handleNextButton}>
      {hasLastQuestion ? "Finish Quiz" : "Next Button"} 
    </button>
  );
}

export default NextButton;
