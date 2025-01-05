import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Export to Excel
export const exportToExcel = (questions) => {
  const ws = XLSX.utils.json_to_sheet(questions);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Questions");
  XLSX.writeFile(wb, "questions.xlsx");
};

// Export to PDF
export const exportToPDF = (questions) => {
  const doc = new jsPDF();
  questions.forEach((q, i) => {
    doc.text(`${i + 1}. ${q.questionType} - ${q.question}`, 10, 10 + i * 10);
  });
  doc.save("questions.pdf");
};

// Export to Word (DOCX)
export const exportToDocx = (questions) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: questions.map((q, i) => {
          return new Paragraph({
            children: [
              new TextRun({
                text: `${i + 1}. `,
                bold: true,
              }),
              new TextRun({
                text: `${q.questionType}: `,
                bold: true,
                italics: true,
              }),
              new TextRun(q.question),
            ],
          });
        }),
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "questions.docx");
  });
};
