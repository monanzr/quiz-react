import { useContext, useMemo } from "react"
import { QuizContext } from "../context/provider"

const useQuiz = () => {
    const { questions, status, index, answer, points, highScore, secondsRemaining, filterQuestions, questionsLevel, numQuestions, maxPossiblePoints, dispatch } = useContext(QuizContext)

    return {
        getQuestions: useMemo(() => questions, [questions]),
        getStatus: useMemo(() => status, [status]),
        getIndex: useMemo(() => index, [index]),
        getAnswer: useMemo(() => answer, [answer]),
        getPoints: useMemo(() => points, [points]),
        getHighScore: useMemo(() => highScore, [highScore]),
        getSecondsRemaining: useMemo(() => secondsRemaining, [secondsRemaining]),
        getFilterQuestions: useMemo(() => filterQuestions, [filterQuestions]),
        getQuestionsLevel: useMemo(() => questionsLevel, [questionsLevel]),
        getNumQuestions: useMemo(() => numQuestions, [numQuestions]),
        getMaxPossiblePoints: useMemo(() => maxPossiblePoints, [maxPossiblePoints]),
        onDataReceived: (data) => dispatch({ type: "dataReceived", payload: data }),
        onDataFailed: () => dispatch({ type: "dataFailed" }),
        onStart: () => dispatch({ type: "start" }),
        onNewAnswer: (data) => dispatch({ type: "newAnswer", payload: data }),
        onNextQuestion: () => dispatch({ type: "nextQuestion", }),
        onPrevQuestion: () => dispatch({ type: "prevQuestion", }),
        onFinishedQuiz: () => dispatch({ type: "finishedQuiz", }),
        onRestartQuiz: () => dispatch({ type: "restartQuiz", }),
        onTick: () => dispatch({ type: "tick", }),
        onFilteredQuestions: (data) => dispatch({ type: "filteredQuestions", payload: data }),
        onSelectedQuestions: (data) => dispatch({ type: "selectedQuestions", payload: data }),
    }
}

export default useQuiz