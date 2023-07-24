import React from "react";

function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
    console.log("num", Number(answer !== null))
    console.log("num2", index + Number(answer !== null))
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
