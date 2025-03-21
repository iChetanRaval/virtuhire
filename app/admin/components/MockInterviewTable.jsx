// "use client"
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function MockInterviewTable() {
//   const [mockInterviews, setMockInterviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch mock interviews data
//   useEffect(() => {
//     const fetchMockInterviews = async () => {
//       try {
//         const interviews = await db.select().from(MockInterview);
//         setMockInterviews(interviews);
//       } catch (error) {
//         console.error("Error fetching mock interviews:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMockInterviews();
//   }, []);

//   // Group interviews by job position and count the occurrences
//   const jobPositionCount = mockInterviews.reduce((acc, interview) => {
//     acc[interview.jobPosition] = (acc[interview.jobPosition] || 0) + 1;
//     return acc;
//   }, {});

//   // Prepare data for the bar chart
//   const chartData = {
//     labels: Object.keys(jobPositionCount),
//     datasets: [
//       {
//         label: 'Total Mock Interviews',
//         data: Object.values(jobPositionCount),
//         backgroundColor: '#4A90E2',
//         borderColor: '#4A90E2',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h3 className="text-2xl font-semibold mb-6">Mock Interviews</h3>

//       {/* Bar Chart */}
//       <div className="mb-8">
//         <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Total Mock Interviews by Job Position' } } }} />
//       </div>

//       {/* Table of Mock Interviews */}
//       <table className="w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
//         <thead className="bg-blue-100">
//           <tr>
//             <th className="p-4 border text-left">ID</th>
//             <th className="p-4 border text-left">Job Position</th>
//             <th className="p-4 border text-left">Job Description</th>
//             <th className="p-4 border text-left">Experience</th>
//             <th className="p-4 border text-left">Created By</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mockInterviews.map((interview) => (
//             <tr key={interview.id} className="hover:bg-blue-50">
//               <td className="p-4 border">{interview.id}</td>
//               <td className="p-4 border">{interview.jobPosition}</td>
//               <td className="p-4 border">{interview.jobDesc}</td>
//               <td className="p-4 border">{interview.jobExperience}</td>
//               <td className="p-4 border">{interview.createdBy || 'N/A'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MockInterviewTable() {
  const [mockInterviews, setMockInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef(); // Ref to capture the content for PDF

  // Fetch mock interviews data
  useEffect(() => {
    const fetchMockInterviews = async () => {
      try {
        const interviews = await db.select().from(MockInterview);
        setMockInterviews(interviews);
      } catch (error) {
        console.error("Error fetching mock interviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMockInterviews();
  }, []);

  // Group interviews by job position and count the occurrences
  const jobPositionCount = mockInterviews.reduce((acc, interview) => {
    acc[interview.jobPosition] = (acc[interview.jobPosition] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the bar chart
  const chartData = {
    labels: Object.keys(jobPositionCount),
    datasets: [
      {
        label: 'Total Mock Interviews',
        data: Object.values(jobPositionCount),
        backgroundColor: '#4A90E2',
        borderColor: '#4A90E2',
        borderWidth: 1,
      },
    ],
  };

  // Function to generate and download PDF report
  const downloadPDF = () => {
    const input = pdfRef.current; // Capture the content of the ref

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true); // Create a new PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('mock_interviews_report.pdf'); // Save the PDF
    });
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Download PDF Button */}
      <div className="mb-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Download PDF Report
        </button>
      </div>

      {/* Content to be captured for PDF */}
      <div ref={pdfRef}>
        <h3 className="text-2xl font-semibold mb-6">Mock Interviews</h3>

        {/* Bar Chart */}
        <div className="mb-8">
          <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Total Mock Interviews by Job Position' } } }} />
        </div>

        {/* Table of Mock Interviews */}
        <table className="w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 border text-left">ID</th>
              <th className="p-4 border text-left">Job Position</th>
              <th className="p-4 border text-left">Job Description</th>
              <th className="p-4 border text-left">Experience</th>
              <th className="p-4 border text-left">Created By</th>
            </tr>
          </thead>
          <tbody>
            {mockInterviews.map((interview) => (
              <tr key={interview.id} className="hover:bg-blue-50">
                <td className="p-4 border">{interview.id}</td>
                <td className="p-4 border">{interview.jobPosition}</td>
                <td className="p-4 border">{interview.jobDesc}</td>
                <td className="p-4 border">{interview.jobExperience}</td>
                <td className="p-4 border">{interview.createdBy || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}