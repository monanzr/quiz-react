const SECS_PER_QUESTION = 30;

const questionsLevelObj = {
    all: "all",
    easy: "easy",
    medium: "medium",
    hard: "hard",
  };

const reducer = (state, action) => {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          filterQuestions: state.questions,
          status: "ready",
        };
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
      case "selectedQuestions":
        return {
          ...state,
          status: "ready",
          filterQuestions: state.questions.slice(0, action.payload).map((question) => question)
        };
      default:
        throw new Error("action unknown");
    }
  };

  export default reducer
  