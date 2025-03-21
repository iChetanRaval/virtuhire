// "use client";
// import { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import { db } from "@/utils/db"; // Ensure this path is correct
// import { jobMatchScore } from "@/utils/schema"; // Assuming a new schema for storing job matches
// import { chatSession } from "@/utils/GeminiAiModel";

// // Point to the local worker file in the public directory
// pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

// export default function JobProfileMatcher() {
//   const [skills, setSkills] = useState("");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [extractedText, setExtractedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState(null);

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
//       let text = "";

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         text += content.items.map((item) => item.str).join(" ");
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

//     setLoading(true);

//     const feedbackPrompt = `
// Candidate Skills: ${skills}
// Resume Text: ${extractedText}
// Task: Identify potential job profiles and map a skill-based roadmap.
// For each job, show:
// 1. Completed stations (skills the candidate already has)
// 2. Next stations (skills needed to unlock advanced profiles)
// 3. Destination (job profile)

// Return JSON with:
// {
//   "roadmap": [
//     {
//       "job": "MERN Stack Developer",
//       "completedStations": ["HTML", "CSS", "JavaScript"],
//       "nextStations": ["React", "MongoDB", "Express.js"],
//       "destination": "MERN Stack Developer"
//     },
//     ...
//   ]
// }
// `;


//     try {
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       let responseText = await result.response.text();

//       const jsonMatch = responseText.match(/\{.*\}/s);
//       if (jsonMatch) {
//         const JsonFeedbackResp = JSON.parse(jsonMatch[0]);

//         await db.insert(jobMatchScore).values({
//           resumeText: extractedText,
//           skills: skills,
//           matchingProfiles: JsonFeedbackResp.matchingProfiles.join(", ") || "",
//           missingSkills: JsonFeedbackResp.missingSkills.join(", ") || "",
//         });

//         setResults(JsonFeedbackResp);
//       } else {
//         console.error("No valid JSON found in the response:", responseText);
//         alert("Error: Could not parse feedback from the response.");
//       }
//     } catch (error) {
//       console.error("Error saving data or generating feedback:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
//       <h1 className="text-2xl font-bold text-center mb-6">
//         Job Profile & Skill Matcher
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea
//           placeholder="Enter Your Skills (e.g., JavaScript, Python, Machine Learning)"
//           value={skills}
//           onChange={(e) => setSkills(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="4"
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
//           {loading ? "Analyzing..." : "Find Matching Profiles"}
//         </button>
//       </form>

//       {loading && (
//         <p className="text-center text-gray-600 mt-4">
//           Analyzing resume and skills to find job matches...
//         </p>
//       )}

//       {results && (
//         <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
//           <h2 className="text-xl font-semibold mb-4">Results</h2>

//           <div className="mb-4">
//             <h3 className="text-lg font-semibold">Matching Job Profiles:</h3>
//             <ul className="list-disc ml-5 text-blue-600">
//               {results.matchingProfiles?.length > 0 ? (
//                 results.matchingProfiles.map((profile, index) => (
//                   <li key={index}>{profile}</li>
//                 ))
//               ) : (
//                 <li>No matching profiles found.</li>
//               )}
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold">Skills to Learn:</h3>
//             <ul className="list-disc ml-5 text-red-600">
//               {results.missingSkills?.length > 0 ? (
//                 results.missingSkills.map((skill, index) => (
//                   <li key={index}>{skill}</li>
//                 ))
//               ) : (
//                 <li>No missing skills identified.</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







// "use client";
// import { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import { db } from "@/utils/db";
// import { jobMatchScore } from "@/utils/schema";
// import { chatSession } from "@/utils/GeminiAiModel2";

// // Point to the local worker file in the public directory
// pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

// export default function JobProfileMatcher() {
//   const [skills, setSkills] = useState("");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [extractedText, setExtractedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [roadmap, setRoadmap] = useState([]);

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
//       let text = "";

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         text += content.items.map((item) => item.str).join(" ");
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

//     setLoading(true);

//     const feedbackPrompt = `
//       Candidate Skills: ${skills}
//       Resume Text: ${extractedText}
//       Task: Identify potential job profiles and map a skill-based roadmap.
//       For each job, show:
//       1. Completed stations (skills the candidate already has)
//       2. Next stations (skills needed to unlock advanced profiles)
//       3. Destination (job profile)

//       Return JSON with:
//       {
//         "roadmap": [
//           {
//             "job": "MERN Stack Developer",
//             "completedStations": ["HTML", "CSS", "JavaScript"],
//             "nextStations": ["React", "MongoDB", "Express.js"],
//             "destination": "MERN Stack Developer"
//           },
//           ...
//         ]
//       }
//     `;

//     try {
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       let responseText = await result.response.text();

//       const jsonMatch = responseText.match(/\{.*\}/s);
//       if (jsonMatch) {
//         const roadmapData = JSON.parse(jsonMatch[0]);
//         setRoadmap(roadmapData.roadmap || []);

//         await db.insert(jobMatchScore).values({
//           resumeText: extractedText,
//           skills: skills,
//           matchingProfiles: roadmapData.roadmap
//             .map((item) => item.destination)
//             .join(", "),
//           missingSkills: roadmapData.roadmap
//             .flatMap((item) => item.nextStations)
//             .join(", "),
//         });
//       } else {
//         console.error("No valid JSON found in the response:", responseText);
//         alert("Error: Could not parse feedback from the response.");
//       }
//     } catch (error) {
//       console.error("Error saving data or generating feedback:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         🚀 Job Profile & Skill Matcher
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea
//           placeholder="Enter Your Skills (e.g., HTML, CSS, JavaScript)"
//           value={skills}
//           onChange={(e) => setSkills(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="4"
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
//           {loading ? "Analyzing..." : "Find Matching Profiles"}
//         </button>
//       </form>

//       {loading && (
//         <p className="text-center text-gray-600 mt-4">
//           Analyzing resume and skills to find job matches...
//         </p>
//       )}

//       {roadmap.length > 0 && (
//         <div className="mt-8 p-6 border border-gray-300 rounded-lg bg-gray-100">
//           <h2 className="text-2xl font-semibold mb-4">🚧 Your Skill Roadmap</h2>

//           {roadmap.map((item, index) => (
//             <div key={index} className="mb-6">
//               <h3 className="text-xl font-bold mb-2">
//                 🎯 {item.destination}
//               </h3>

//               <div className="flex space-x-6 items-center">
//                 <div className="flex-1">
//                   <p className="font-semibold mb-1">✅ Completed:</p>
//                   <ul className="list-disc ml-5 text-green-600">
//                     {item.completedStations.map((skill, i) => (
//                       <li key={i}>{skill}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 {item.nextStations.length > 0 && (
//                   <>
//                     <div className="flex items-center justify-center">
//                       <span className="text-xl">➡️</span>
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-semibold mb-1">📚 Learn Next:</p>
//                       <ul className="list-disc ml-5 text-red-600">
//                         {item.nextStations.map((skill, i) => (
//                           <li key={i}>{skill}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





"use client";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { db } from "@/utils/db";
import { jobMatchScore } from "@/utils/schema";
import { chatSession } from "@/utils/GeminiAiModel2";

// PDF worker file location
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

export default function JobProfileMatcher() {
  const [skills, setSkills] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState([]);

  // Handles PDF upload and extraction
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
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ");
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

    setLoading(true);

    const feedbackPrompt = `
      Candidate Skills: ${skills}
      Resume Text: ${extractedText}

      Task: Identify job profiles across three career levels:
      1. Beginner (Entry-Level)
      2. Intermediate (Mid-Level)
      3. Advanced (Senior-Level)

      For each job profile, return:
      - Industry (e.g., Web Development, Data Science, AI)
      - Completed skills (skills the candidate already knows)
      - Pending skills (skills to unlock the job profile)
      - Career Level (Beginner, Intermediate, Advanced)

      Return structured JSON as:
      {
        "roadmap": [
          {
            "industry": "Web Development",
            "careerLevel": "Beginner",
            "job": "Frontend Developer",
            "completedStations": ["HTML", "CSS"],
            "nextStations": ["JavaScript", "React"]
          },
          ...
        ]
      }
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      let responseText = await result.response.text();

      const jsonMatch = responseText.match(/\{.*\}/s);
      if (jsonMatch) {
        const roadmapData = JSON.parse(jsonMatch[0]);
        setRoadmap(roadmapData.roadmap || []);

        await db.insert(jobMatchScore).values({
          resumeText: extractedText,
          skills: skills,
          matchingProfiles: roadmapData.roadmap
            .map((item) => item.job)
            .join(", "),
          missingSkills: roadmapData.roadmap
            .flatMap((item) => item.nextStations)
            .join(", "),
        });
      } else {
        console.error("No valid JSON found in the response:", responseText);
        alert("Error: Could not parse feedback from the response.");
      }
    } catch (error) {
      console.error("Error saving data or generating feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderRoadmapByLevel = (level) =>
    roadmap
      .filter((item) => item.careerLevel === level)
      .map((item, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-bold mb-2">
            🎯 {item.job} ({item.industry})
          </h3>

          <div className="flex space-x-6 items-center">
            <div className="flex-1">
              <p className="font-semibold mb-1">✅ Completed:</p>
              <ul className="list-disc ml-5 text-green-600">
                {item.completedStations.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            {item.nextStations.length > 0 && (
              <>
                <div className="flex items-center justify-center">
                  <span className="text-xl">➡️</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-1">📚 Learn Next:</p>
                  <ul className="list-disc ml-5 text-red-600">
                    {item.nextStations.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      ));

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        🚀 Job Profile & Skill Matcher
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Enter Your Skills (e.g., HTML, CSS, JavaScript)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
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
          {loading ? "Analyzing..." : "Find Matching Profiles"}
        </button>
      </form>

      {loading && (
        <p className="text-center text-gray-600 mt-4">
          Analyzing resume and skills to find job matches...
        </p>
      )}

      {roadmap.length > 0 && (
        <div className="mt-8 p-6 border border-gray-300 rounded-lg bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">🚧 Your Career Map</h2>

          <h3 className="text-xl font-bold mb-3">🟢 Beginner Level</h3>
          {renderRoadmapByLevel("Beginner")}

          <h3 className="text-xl font-bold mb-3">🟡 Intermediate Level</h3>
          {renderRoadmapByLevel("Intermediate")}

          <h3 className="text-xl font-bold mb-3">🔴 Advanced Level</h3>
          {renderRoadmapByLevel("Advanced")}
        </div>
      )}
    </div>
  );
}
