// "use client";
// import { useState } from "react";

// export default function ReportBug() {
//   const [bugReport, setBugReport] = useState("");
//   const [bugImage, setBugImage] = useState(null);
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setBugImage(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!bugReport.trim()) {
//       alert("Please describe the bug before submitting.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("bugReport", bugReport);
//     if (bugImage) {
//       formData.append("bugImage", bugImage);
//     }

//     try {
//       const response = await fetch("/api/report-bug", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         setSuccess(true);
//         setBugReport("");
//         setBugImage(null);
//       } else {
//         alert("Error submitting the bug report. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error reporting bug:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-5">
//       <h1 className="text-2xl font-bold text-center mb-4">🐞 Report a Bug</h1>

//       {success && (
//         <p className="text-green-600 text-center mb-4">
//           ✅ Bug reported successfully!
//         </p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea placeholder="Enter you name"
//           value={userName} onChange={(e) => setUserName(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
//           rows="1"
//         />

//         <textarea placeholder="Enter your email"
//           value={email} onChange={(e) => setEmail(e.target.value)}
//           typeof="email"
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
//           rows="1"
//         />

//         <textarea
//           placeholder="Describe the issue..."
//           value={bugReport}
//           onChange={(e) => setBugReport(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
//           rows="4"
//         />


//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-red-500 file:text-white hover:file:bg-red-600"
//         />

//         <button
//           type="submit"
//           className="w-full py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
//         >
//           {loading ? "Submitting..." : "Submit Bug Report"}
//         </button>
//       </form>
//     </div>
//   );
// }



"use client";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch("/api/results");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-5">
      <h1 className="text-3xl font-bold text-center mb-6">📊 VirtuHire Results</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-500">No results available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((candidate) => (
            <div key={candidate.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-24 h-24 rounded-full mx-auto mb-3 border border-gray-300"
              />
              <h2 className="text-xl font-semibold text-center">{candidate.name}</h2>
              <p className="text-center text-gray-600">{candidate.experience}</p>

              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-700">Before Interview:</p>
                <div className="w-full bg-gray-300 rounded-full h-4">
                  <div
                    className="bg-red-500 h-4 rounded-full text-xs text-white text-center"
                    style={{ width: `${candidate.beforeScore}%` }}
                  >
                    {candidate.beforeScore}%
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-700">After Interview:</p>
                <div className="w-full bg-gray-300 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full text-xs text-white text-center"
                    style={{ width: `${candidate.afterScore}%` }}
                  >
                    {candidate.afterScore}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
