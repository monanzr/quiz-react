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

  export default initialState