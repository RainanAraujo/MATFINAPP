import { quiz } from "@/assets/questionsQuiz";
import Navbar from "../components/ui/navbar";
// @ts-ignore
import Quiz from "react-quiz-component";
import { useEffect, useState } from "react";

function QuizPage() {
  const [quizFiltered, setQuizFiltered] = useState(quiz);

  function getRandomQuiz(numQuestions = 10) {
    const shuffledQuestions = [...quiz.questions].sort(
      () => Math.random() - 0.5
    );
    const selectedQuestions = shuffledQuestions.slice(0, numQuestions);

    return {
      ...quiz,
      nrOfQuestions: String(numQuestions),
      questions: selectedQuestions,
    };
  }

  useEffect(() => {
    setQuizFiltered(getRandomQuiz(10));
  }, []);

  return (
    <div className="flex flex-col gap-10 h-full">
      <Navbar title="Quiz" />
      <Quiz quiz={quizFiltered} shuffle={true} shuffleAnswer={true} />
    </div>
  );
}

export default QuizPage;
