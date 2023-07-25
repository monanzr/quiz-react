import React from "react";
import Filter from "./Filter";

function StartScreen({ numQuestions, dispatch, questionsLevel, questions }) {
  const handleSelectedQuestions = (event) => {
    dispatch({type: "selectedQuestions", payload: event.target.value});
  }

  const handleStartGame = () => dispatch({ type: "start"})

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <div className="level-wrapper"><h5>Filter by Difficulty Level</h5><Filter dispatch={dispatch} questionsLevel={questionsLevel} /></div>
      <div className="selected-questions-wrapper"><h5>Select Certain Number of Questions</h5><input type="number" max={questions.length} className="selected-questions" onChange={handleSelectedQuestions}/></div>
      <button className="btn btn-ui" onClick={handleStartGame}>Let's start</button>
    </div>
  ); 
}

export default StartScreen;
