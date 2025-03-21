// import { db } from '@/utils/db';
// import { resumeScore } from '@/utils/schema';

// export default async function ResumeScores() {
//   const scores = await db.select().from(resumeScore);

//   return (
//     <div className="container mx-auto p-8">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Resume Scores</h2>
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <table className="w-full border-collapse table-auto">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="border p-4 text-left">ID</th>
//               <th className="border p-4 text-left">ATS Score</th>
//               <th className="border p-4 text-left">Strengths</th>
//               <th className="border p-4 text-left">Weaknesses</th>
//               <th className="border p-4 text-left">Job Match</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {scores.map((score) => (
//               <tr key={score.id} className="hover:bg-blue-100 transition duration-200">
//                 <td className="border p-4">{score.id}</td>
//                 <td className="border p-4">{score.atsScore}</td>
//                 <td className="border p-4">{score.strength}</td>
//                 <td className="border p-4">{score.weakness}</td>
//                 <td className="border p-4">{score.jobMatching}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div> 
//   );
// }

"use client"
import { db } from '@/utils/db';
import { resumeScore } from '@/utils/schema';
import jsPDF from 'jspdf';

export default async function ResumeScores() {
  const scores = await db.select().from(resumeScore);

  // Function to generate and download PDF
  const downloadPDF = (score) => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(18);
    doc.text('Resume Score Report', 10, 20);
    doc.setFontSize(12);
    doc.text(`ID: ${score.id}`, 10, 30);
    doc.text(`ATS Score: ${score.atsScore}`, 10, 40);
    doc.text(`Strengths: ${score.strength}`, 10, 50);
    doc.text(`Weaknesses: ${score.weakness}`, 10, 60);
    doc.text(`Job Match: ${score.jobMatching}`, 10, 70);

    // Save the PDF
    doc.save(`resume_score_${score.id}.pdf`);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Resume Scores</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-4 text-left">ID</th>
              <th className="border p-4 text-left">ATS Score</th>
              <th className="border p-4 text-left">Strengths</th>
              <th className="border p-4 text-left">Weaknesses</th>
              <th className="border p-4 text-left">Job Match</th>
              <th className="border p-4 text-left">Download Report</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {scores.map((score) => (
              <tr key={score.id} className="hover:bg-blue-100 transition duration-200">
                <td className="border p-4">{score.id}</td>
                <td className="border p-4">{score.atsScore}</td>
                <td className="border p-4">{score.strength}</td>
                <td className="border p-4">{score.weakness}</td>
                <td className="border p-4">{score.jobMatching}</td>
                <td className="border p-4">
                  <button
                    onClick={() => downloadPDF(score)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}