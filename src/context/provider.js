import { createContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import initialState from "./initial";

export const QuizContext = createContext()

export const QuizProvider = ({children}) => {
    const [ { questions, status, index, answer, points, highScore, secondsRemaining, filterQuestions, questionsLevel }, dispatch] = useReducer(reducer, initialState)

    const numQuestions = filterQuestions.length;
    const maxPossiblePoints = filterQuestions.reduce(
      (prev, cur) => prev + cur.points,
      0
    );
  
    useEffect(function () {
      fetch("http://localhost:9000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);

    return <QuizContext.Provider value={{questions, status, index, answer, points, highScore, secondsRemaining, filterQuestions, questionsLevel, numQuestions, maxPossiblePoints, dispatch}}>{children}</QuizContext.Provider>
}

