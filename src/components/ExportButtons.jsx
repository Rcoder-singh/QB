// import { exportToExcel, exportToPDF, exportToDocx } from "../utils/exportUtils";

// const ExportButtons = ({ questions }) => {
//   return (
//     <div className="mt-6 flex gap-4 flex-wrap">
//       <button
//         onClick={() => exportToExcel(questions)}
//         className="bg-green-500 text-white px-4 py-2 rounded-lg"
//       >
//         Export to Excel
//       </button>
//       <button
//         onClick={() => exportToPDF(questions)}
//         className="bg-red-500 text-white px-4 py-2 rounded-lg"
//       >
//         Export to PDF
//       </button>
//       <button
//         onClick={() => exportToDocx(questions)}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//       >
//         Export to Word
//       </button>
//     </div>
//   );
// };

// export default ExportButtons;

import { useState } from "react";
import { exportToExcel, exportToPDF, exportToDocx } from "../utils/exportUtils";


const ExportButtons = ({ questions, onExport }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Manage dropdown state

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleExport = (format) => {
    // Handle export based on selected format
    if (format === "Excel") {
      exportToExcel(questions);
    } else if (format === "Word") {
      exportToDocx(questions);
    } else if (format === "PDF") {
      exportToPDF(questions);
    }

    // Reset dropdown and any other states after export
    setIsDropdownOpen(false);
    onExport();
  };

  return (
    <div className="mb-6">
      {/* Export Button with Dropdown */}
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Export
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="mt-2 absolute bg-white shadow-lg rounded-lg  w-40">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleExport("Excel")}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Export to Excel
              </button>
            </li>
            <li>
              <button
                onClick={() => handleExport("Word")}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Export to Word
              </button>
            </li>
            <li>
              <button
                onClick={() => handleExport("PDF")}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Export to PDF
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExportButtons;
