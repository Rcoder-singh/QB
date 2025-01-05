// import React, { useState } from "react";
// import AddQuestionForm from "./AddQuestionForm";
// import QuestionList from "./QuestionList";
// import ExportButtons from "./ExportButtons";

// const QuestionBankApp = () => {
//   const [questions, setQuestions] = useState([]);
//   const [competencyLevel, setCompetencyLevel] = useState(""); // Persisted competency level

//   const addQuestion = (question) => {
//     setQuestions([...questions, question]);
//   };

//   const handleExport = () => {
//     // Reset the competency level and clear questions on export
//     setCompetencyLevel("");
//     setQuestions([]);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">Question Bank Application</h1>

//       {/* Competency Level Selection */}
//       <div className="mb-6">
//         <label className="block mb-2 font-medium">
//           Select Competency Level
//         </label>
//         <select
//           value={competencyLevel}
//           onChange={(e) => setCompetencyLevel(e.target.value)}
//           className="w-full p-2 border rounded-lg"
//         >
//           <option value="">Select Competency Level</option>
//           <option value="Learner">Learner</option>
//           <option value="Practitioner">Practitioner</option>
//           <option value="Specialist">Specialist</option>
//           <option value="Expert">Expert</option>
//         </select>
//       </div>

//       {/* Add Question Form */}
//       <AddQuestionForm
//         onAddQuestion={addQuestion}
//         competencyLevel={competencyLevel}
//       />

//       {/* Question List */}
//       <QuestionList questions={questions} />

//       {/* Export Buttons */}
//       <ExportButtons questions={questions} onExport={handleExport} />
//     </div>
//   );
// };

// export default QuestionBankApp;

// import  { useState } from "react";
// import AddQuestionForm from "./AddQuestionForm";
// import QuestionList from "./QuestionList";
// import ExportButtons from "./ExportButtons";

// const QuestionBankApp = () => {
//   const [questions, setQuestions] = useState([]);
//   const [competencyLevel, setCompetencyLevel] = useState(""); // Persisted competency level

//   const addQuestion = (question) => {
//     setQuestions([...questions, question]);
//   };

//   const handleExport = () => {
//     // Reset the competency level and clear questions on export
//     setCompetencyLevel("");
//     setQuestions([]);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">Question Bank Application</h1>

//       {/* Display Selected Competency Level or Dropdown */}
//       {competencyLevel ? (
//         <div className="mb-6">
//           <p className="text-lg font-medium">
//             Selected Competency Level: {competencyLevel}
//           </p>
//         </div>
//       ) : (
//         <div className="mb-6">
//           <label className="block mb-2 font-medium">
//             Select Competency Level
//           </label>
//           <select
//             value={competencyLevel}
//             onChange={(e) => setCompetencyLevel(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//           >
//             <option value="">Select Competency Level</option>
//             <option value="Learner">Learner</option>
//             <option value="Practitioner">Practitioner</option>
//             <option value="Specialist">Specialist</option>
//             <option value="Expert">Expert</option>
//           </select>
//         </div>
//       )}

//       {/* Add Question Form */}
//       <AddQuestionForm
//         onAddQuestion={addQuestion}
//         competencyLevel={competencyLevel}
//       />

//       {/* Question List */}
//       <QuestionList questions={questions} />

//       {/* Export Buttons */}
//       <ExportButtons questions={questions} onExport={handleExport} />
//     </div>
//   );
// };

// export default QuestionBankApp;

import { useState } from "react";
import AddQuestionForm from "./AddQuestionForm";
import QuestionList from "./QuestionList";
import ExportButtons from "./ExportButtons";

const QuestionBankApp = () => {
  const [questions, setQuestions] = useState([]);
  const [competencyLevel, setCompetencyLevel] = useState(""); // Persisted competency level
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // For managing preview visibility

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleExport = () => {
    setCompetencyLevel("");
    setQuestions([]);
  };

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Question Bank Application</h1>

      {/* Competency Level Section */}
      {competencyLevel ? (
        <div className="mb-6">
          <p className="text-lg font-medium">
            Selected Competency Level: {competencyLevel}
          </p>
        </div>
      ) : (
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Select Competency Level
          </label>
          <select
            value={competencyLevel}
            onChange={(e) => setCompetencyLevel(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Competency Level</option>
            <option value="Learner">Learner</option>
            <option value="Practitioner">Practitioner</option>
            <option value="Specialist">Specialist</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      )}

      {/* Add Question Form */}
      <AddQuestionForm
        onAddQuestion={addQuestion}
        competencyLevel={competencyLevel}
      />

      {/* Question List */}
      <QuestionList questions={questions} />

      {/* Preview Button */}
      <div className="mb-6">
        <button
          onClick={togglePreview}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          {isPreviewOpen ? "Close Preview" : "Preview Questions"}
        </button>
      </div>

      {/* Preview Modal or Section */}
      {isPreviewOpen && (
        <div className="mb-6 border p-4 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Preview of Questions</h2>
          <ul>
            {questions.length > 0 ? (
              questions.map((q, index) => (
                <li key={index} className="mb-4">
                  <strong>{q.question}</strong>
                  {q.questionType === "Multiple Choice" ||
                  q.questionType === "Case Study with MCQs" ? (
                    <ul className="ml-4">
                      {q.options.map((option, i) => (
                        <li key={i}>{option}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))
            ) : (
              <p>No questions added yet.</p>
            )}
          </ul>
        </div>
      )}

      {/* Export Buttons */}
      <ExportButtons questions={questions} onExport={handleExport} />
    </div>
  );
};

export default QuestionBankApp;
