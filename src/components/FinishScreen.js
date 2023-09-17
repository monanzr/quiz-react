import React from "react";
import useQuiz from "../hooks/useQuiz";

function FinishScreen() {
  const { getPoints: points, getMaxPossiblePoints: maxPossiblePoints, getHighScore: highScore, onRestartQuiz, onDataFailed } = useQuiz()

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if(percentage === 100) emoji = '🥇'
  if(percentage >= 80 && percentage < 100) emoji = '🎉'
  if(percentage >= 50 && percentage < 80) emoji = '🙃'
  if(percentage >= 0 && percentage < 50) emoji = '🤨'
  if(percentage === 0) emoji = '🤦‍♀️'

  const handleRestartButton = () => {
    onRestartQuiz()
    fetch("http://localhost:9000/highscore/1", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "highscore": highScore }),
    })
      .then((res) => res.json())
      .catch((err) => onDataFailed())
  }

  return (
    <>
    <p className="result">
      <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)})
    </p>
    <p className="highscore">(Highscore : {highScore} points)</p>
    <button className="btn btn-ui" onClick={handleRestartButton}>
      Restart Quiz
    </button>
    </>
  );
}

export default FinishScreen;
