import React from "react";
import Options from "./Options";
import useQuiz from "../hooks/useQuiz";

function Question() {
  const { getQuestions: questions, getIndex: index } = useQuiz()
  const question = questions.at(index);

  console.log(question)

  const { question: questionTitle, options, correctOption } = question;
  return (
    <div>
      <h4>{questionTitle}</h4>
      <Options options={options} correctOption={correctOption}/>
    </div>
  );
}

export default Question;
