// import DateCounter from "./DateCounter"
import { useEffect, useReducer, Fragment } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const questionsLevelObj = {
  all: "all",
  easy: "easy",
  medium: "medium",
  hard: "hard",
};

const initialState = {
  questions: [],

  // 'loading, 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
  filterQuestions: [],
  questionsLevel: questionsLevelObj.all,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload,         filterQuestions: state.questions
,        status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.filterQuestions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.filterQuestions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "prevQuestion":
      return { ...state, index: state.index - 1, answer: null };
    case "finishedQuiz":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        secondsRemaining: 10,
      };
    case "restartQuiz":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        highScore: state.highScore,
        secondsRemaining: 10,
        filterQuestions: [],
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    case "filteredQuestions":
      return {
        ...state,
        status: "ready",
        questionsLevel: action.payload,
        filterQuestions:
          (action.payload === questionsLevelObj.all && state.questions) ||
          (action.payload === questionsLevelObj.easy &&
            state.questions.filter((question) => question.points === 10)) ||
          (action.payload === questionsLevelObj.medium &&
            state.questions.filter((question) => question.points === 20)) ||
          (action.payload === questionsLevelObj.hard &&
            state.questions.filter((question) => question.points === 30)),
      };
    default:
      throw new Error("action unknown");
  }
};

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      secondsRemaining,
      filterQuestions,
      questionsLevel,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(
    filterQuestions,
    questionsLevel,
    questionsLevel === questionsLevelObj.medium
  );

  const numQuestions = filterQuestions.length;
  const maxPossiblePoints = filterQuestions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  console.log(filterQuestions);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            questionsLevel={questionsLevel}
          />
        )}
        {status === "active" && (
          <Fragment>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={filterQuestions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
              index={index}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </Fragment>
        )}
        {status === "finish" && (
          <FinishScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
