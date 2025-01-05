

const QuestionList = ({ questions }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Question List</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">#</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Competency</th>
            <th className="border p-2">Question</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-100">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{q.questionType}</td>
              <td className="border p-2">{q.competencyLevel}</td>
              <td className="border p-2">{q.question}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
