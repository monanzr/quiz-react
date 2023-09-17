import React from "react";
import Question from "./Question";
import { questionsLevel } from "./App";

function Filter({ dispatch, questionsLevel }) {
  const handleFilterChange = (event) => {
    dispatch({ type: "filteredQuestions", payload: event.target.value });
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
