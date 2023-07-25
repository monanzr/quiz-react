import React from "react";
import Filter from "./Filter";

function StartScreen({ numQuestions, dispatch, questionsLevel }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <div className="level-wrapper"><h5>Filter by Difficulty Level</h5><Filter dispatch={dispatch} questionsLevel={questionsLevel} /></div>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "start"})}>Let's start</button>
    </div>
  ); 
}

export default StartScreen;
