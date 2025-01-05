import React, { useState } from "react";

const AddQuestionForm = ({ onAddQuestion, competencyLevel }) => {
  const [questionType, setQuestionType] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // Start with 2 options
  const [errors, setErrors] = useState({}); // For validation

  // Handle dynamic option changes for MCQs
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Add a new empty option for MCQs
  const addOption = () => {
    setOptions([...options, ""]);
  };

  // Remove an option
  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  // Validate the form before adding a question
  const validateForm = () => {
    const newErrors = {};

    if (!questionType) newErrors.questionType = "Question type is required.";
    if (!competencyLevel)
      newErrors.competencyLevel = "Competency level is required.";
    if (!question) newErrors.question = "Question text is required.";

    if (
      questionType === "Multiple Choice" ||
      questionType === "Case Study with MCQs"
    ) {
      if (options.some((option) => option.trim() === "")) {
        newErrors.options = "All options must be filled out.";
      }
      if (options.length < 2) {
        newErrors.options = "At least two options are required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddQuestion = () => {
    if (!validateForm()) return;

    const formattedQuestion =
      questionType === "Multiple Choice" ||
      questionType === "Case Study with MCQs"
        ? { questionType, competencyLevel, question, options }
        : { questionType, competencyLevel, question };

    onAddQuestion(formattedQuestion);

    // Reset form
    setQuestionType("");
    setQuestion("");
    setOptions(["", ""]);
    setErrors({});
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4">Add New Question</h2>

      {/* Question Type */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Question Type</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select Question Type</option>
          <option value="Fill in the Blanks">Fill in the Blanks</option>
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="True/False">True/False</option>
          <option value="Short/One Word Answer">Short/One Word Answer</option>
          <option value="Case Study with MCQs">Case Study with MCQs</option>
        </select>
        {errors.questionType && (
          <p className="text-red-500 text-sm">{errors.questionType}</p>
        )}
      </div>

      {/* Question Text */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here..."
          className="w-full p-2 border rounded-lg"
        />
        {errors.question && (
          <p className="text-red-500 text-sm">{errors.question}</p>
        )}
      </div>

      {/* Dynamic Form Elements Based on Question Type */}
      {questionType === "True/False" && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Sample Answer</label>
          <div>
            <label className="mr-4">
              <input type="radio" name="trueFalse" value="True" /> True
            </label>
            <label>
              <input type="radio" name="trueFalse" value="False" /> False
            </label>
          </div>
        </div>
      )}

      {questionType === "Multiple Choice" ||
      questionType === "Case Study with MCQs" ? (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Options</label>
          {options.map((option, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 p-2 border rounded-lg mr-2"
              />
              {options.length > 2 && (
                <button
                  onClick={() => removeOption(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addOption}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            Add Option
          </button>
          {errors.options && (
            <p className="text-red-500 text-sm">{errors.options}</p>
          )}
        </div>
      ) : null}

      <button
        onClick={handleAddQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add Question
      </button>
    </div>
  );
};

export default AddQuestionForm;
