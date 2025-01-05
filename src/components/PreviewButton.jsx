import React from "react";

const PreviewButton = ({ questions }) => {
  const handlePreview = () => {
    alert(JSON.stringify(questions, null, 2)); // Replace with a modal in production
  };

  return (
    <button
      onClick={handlePreview}
      className="bg-yellow-500  px-4 py-2 rounded-lg"
    >
      Preview Questions
    </button>
  );
};

export default PreviewButton;
