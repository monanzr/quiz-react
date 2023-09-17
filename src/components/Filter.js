import React from "react";
import useQuiz from "../hooks/useQuiz";

function Filter() {
  const { getQuestionsLevel: questionsLevel, onFilteredQuestions} = useQuiz()

  console.log("questionsLevel", questionsLevel)

  const handleFilterChange = (event) => {
    onFilteredQuestions(event.target.value )
  };
  return (
    <select className="btn btn-select" onChange={handleFilterChange} value={questionsLevel}>
      <option value="all">All</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
}

export default Filter;
