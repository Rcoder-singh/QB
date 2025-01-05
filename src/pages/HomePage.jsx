import { useState } from "react";
import AddQuestionForm from "../components/AddQuestionForm";
import QuestionList from "../components/QuestionList";
import ExportButtons from "../components/ExportButtons";
import PreviewButton from "../components/PreviewButton";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="container mx-auto p-4">
      <AddQuestionForm onAddQuestion={addQuestion} />
      <QuestionList questions={questions} />
      <ExportButtons questions={questions} />
      <PreviewButton questions={questions}/>
    </div>
  );
};

export default HomePage;
