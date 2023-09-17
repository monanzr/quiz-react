import React from "react";
import Options from "./Options";

function Question({ question, dispatch, answer }) {
  const { question: questionTitle, options, correctOption } = question;
  return (
    <div>
      <h4>{questionTitle}</h4>
      <Options options={options} dispatch={dispatch} answer={answer} correctOption={correctOption}/>
    </div>
  );
}

export default Question;
