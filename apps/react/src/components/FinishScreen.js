import React from "react";

function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if(percentage === 100) emoji = '🥇'
  if(percentage >= 80 && percentage < 100) emoji = '🎉'
  if(percentage >= 50 && percentage < 80) emoji = '🙃'
  if(percentage >= 0 && percentage < 50) emoji = '🤨'
  if(percentage === 0) emoji = '🤦‍♀️'

  const handleRestartButton = () => {
    dispatch({type: "restartQuiz"})
    fetch("http://localhost:9000/highscore/1", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "highscore": highScore }),
    })
      .then((res) => res.json())
      .catch((err) => dispatch({ type: "dataFailed" }))
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
