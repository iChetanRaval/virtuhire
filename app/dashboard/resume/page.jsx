

// "use client";
// import { useState } from 'react';
// import * as pdfjsLib from 'pdfjs-dist';
// import { db } from '@/utils/db'; // Ensure this path is correct for your db import
// import { resumeScore } from '@/utils/schema'; // Import your schema
// import { chatSession } from '@/utils/GeminiAiModel';

// // Point to the local worker file in the public directory
// pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

// export default function ATS() {
//   const [jobDescription, setJobDescription] = useState('');
//   const [resumeFile, setResumeFile] = useState(null);
//   const [extractedText, setExtractedText] = useState('');
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false); // For loading indicator

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     setResumeFile(file);
//     await extractTextFromPDF(file);
//   };

//   const extractTextFromPDF = async (file) => {
//     const reader = new FileReader();
//     reader.onload = async function () {
//       const typedarray = new Uint8Array(this.result);
//       const pdf = await pdfjsLib.getDocument(typedarray).promise;
//       let text = '';

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         text += content.items.map((item) => item.str).join(' ');
//       }
//       setExtractedText(text);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!resumeFile) {
//       alert("Please upload a resume PDF.");
//       return;
//     }

//     // Show loading state
//     setLoading(true);

//     // Create feedback prompt
//     const feedbackPrompt = `
//       Job Description: ${jobDescription}, 
//       Resume Text: ${extractedText}. 
//       Please provide an ATS score, strengths, weaknesses, and job match percentage (if job description is given) 
//       in JSON format with fields 'atsScore', 'strengths', 'weaknesses', and 'jobMatching'.
//     `;

//     try {
//       // Send feedback prompt to Gemini API
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       let responseText = await result.response.text();

//       // Extract JSON part from response
//       const jsonMatch = responseText.match(/\{.*\}/s); // Match JSON object in the response
//       if (jsonMatch) {
//         const JsonFeedbackResp = JSON.parse(jsonMatch[0]);

//         // Store the data in the database
//         await db.insert(resumeScore).values({
//           mockIdRef: "unique_mock_id", // Replace with the actual mock interview ID
//           resumeText: extractedText,
//           jobDescription: jobDescription,
//           atsScore: JsonFeedbackResp.atsScore || '',
//           strength: JsonFeedbackResp.strengths.join(', ') || '',
//           weakness: JsonFeedbackResp.weaknesses.join(', ') || '',
//           jobMatching: JsonFeedbackResp.jobMatching || '',
//         });

//         setResults(JsonFeedbackResp); // Update the UI with the response
//       } else {
//         console.error("No valid JSON found in the response:", responseText);
//         alert("Error: Could not parse feedback from the response.");
//       }
//     } catch (error) {
//       console.error("Error saving data or generating feedback:", error);
//     } finally {
//       setLoading(false); // Turn off loading state
//     }
//   };


//   return (
//     <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
//       <h1 className="text-2xl font-bold text-center mb-6">ATS Resume Analyzer</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea
//           placeholder="Paste Job Description"
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="6"
//         />

//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
//         />

//         <button
//           type="submit"
//           className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
//         >
//           {loading ? "Analyzing..." : "Analyze"}
//         </button>
//       </form>

//       {loading && (
//         <p className="text-center text-gray-600 mt-4">Analyzing resume and generating feedback...</p>
//       )}

//       {/* {extractedText && (
//         <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
//           <h2 className="text-xl font-semibold">Extracted Resume Text</h2>
//           <p className="mt-2 text-gray-700 whitespace-pre-wrap">{extractedText}</p>
//         </div>
//       )} */}

//       {results && (
//         <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
//           <h2 className="text-xl font-semibold">Results</h2>
//           <h3 className="mt-2 text-lg">ATS Score: <span className="font-bold">{results.atsScore}</span></h3>
//           {results.jobMatching && (
//             <p className="mt-4 font-semibold">Job Match Percentage: <span className="text-blue-600">{results.jobMatching}%</span></p>
//           )}
//           <div className="mt-4">
//             <h4 className="font-semibold">Strengths:</h4>
//             <ul className="list-disc ml-5">
//               {results.strengths.map((str, index) => (
//                 <li key={index} className="text-gray-700">{str}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="mt-4">
//             <h4 className="font-semibold">Weaknesses:</h4>
//             <ul className="list-disc ml-5">
//               {results.weaknesses.map((weak, index) => (
//                 <li key={index} className="text-gray-700">{weak}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { db } from '@/utils/db'; // Ensure this path is correct for your db import
import { resumeScore } from '@/utils/schema'; // Import your schema
import { chatSession } from '@/utils/GeminiAiModel';

// Point to the local worker file in the public directory
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

export default function ATS() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [results, setResults] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false); // For loading indicator

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    await extractTextFromPDF(file);
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      let text = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(' ');
      }
      setExtractedText(text);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload a resume PDF.");
      return;
    }

    // Show loading state
    setLoading(true);

    // Create feedback prompt
    const feedbackPrompt = `
      Job Description: ${jobDescription}, 
      Resume Text: ${extractedText},
      Please provide an ATS score, strengths, weaknesses, missing keywords, suggestions, and job match percentage (if job description is given) in JSON format with fields 'atsScore', 'strengths', 'weaknesses', 'missingKeywords', 'suggestions', and 'jobMatching'.
    `;

    try {
      // Send feedback prompt to Gemini API
      const result = await chatSession.sendMessage(feedbackPrompt);
      let responseText = await result.response.text();

      // Extract JSON part from response
      const jsonMatch = responseText.match(/\{.*\}/s); // Match JSON object in the response
      if (jsonMatch) {
        const JsonFeedbackResp = JSON.parse(jsonMatch[0]);

        // Store the data in the database
        await db.insert(resumeScore).values({
          mockIdRef: "unique_mock_id", // Replace with the actual mock interview ID
          resumeText: extractedText, // Not displaying extracted text anymore
          jobDescription: jobDescription,
          atsScore: JsonFeedbackResp.atsScore || '',
          strength: JsonFeedbackResp.strengths.join(', ') || '',
          weakness: JsonFeedbackResp.weaknesses.join(', ') || '',
          jobMatching: JsonFeedbackResp.jobMatching || '',
          missingKeywords: JsonFeedbackResp.missingKeywords.join(', ') || '',
          suggestions: JsonFeedbackResp.suggestions.join(', ') || '',
        });

        setResults(JsonFeedbackResp); // Update the UI with the response
      } else {
        console.error("No valid JSON found in the response:", responseText);
        alert("Error: Could not parse feedback from the response.");
      }
    } catch (error) {
      console.error("Error saving data or generating feedback:", error);
    } finally {
      setLoading(false); // Turn off loading state
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
      <h1 className="text-2xl font-bold text-center mb-6">ATS Resume Analyzer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="6"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {loading && (
        <p className="text-center text-gray-600 mt-4">Analyzing resume and generating feedback...</p>
      )}

      {results && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
          {/* flex justify-center ===> to align text at center */}
          <h2 className="text-xl font-semibold">Results</h2>
          <h3 className="mt-2 text-lg">ATS Score: <span className="font-bold">{results.atsScore}</span></h3>
          {results.jobMatching && (
            <p className="mt-4 font-semibold">Job Match Percentage: <span className="text-blue-600">{results.jobMatching}%</span></p>
          )}
          <div className="mt-4">
            <h4 className="font-semibold">Strengths:</h4>
            <ul className="list-disc ml-5">
              {results.strengths.map((str, index) => (
                <li key={index} className="text-gray-700">{str}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Weaknesses:</h4>
            <ul className="list-disc ml-5">
              {results.weaknesses.map((weak, index) => (
                <li key={index} className="text-gray-700">{weak}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Missing Keywords:</h4>
            <ul className="list-disc ml-5">
              {results.missingKeywords && results.missingKeywords.length > 0 ? (
                results.missingKeywords.map((keyword, index) => (
                  <li key={index} className="text-gray-700">{keyword}</li>
                ))
              ) : (
                <li className="text-gray-700">No missing keywords.</li>
              )}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Suggestions:</h4>
            <ul className="list-disc ml-5">
              {results.suggestions && results.suggestions.length > 0 ? (
                results.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">{suggestion}</li>
                ))
              ) : (
                <li className="text-gray-700">No suggestions available.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
