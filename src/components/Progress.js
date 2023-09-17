import React from "react";
import useQuiz from "../hooks/useQuiz";

function Progress() {
  const { getIndex: index, getNumQuestions: numQuestions, getPoints: points, getMaxPossiblePoints: maxPossiblePoints, getAnswer: answer } = useQuiz()

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1} </strong> / {numQuestions}
      </p>
      <p>
        {points} / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
