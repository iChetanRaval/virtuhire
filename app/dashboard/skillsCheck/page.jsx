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






// maim   




// "use client";
// import { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import { db } from "@/utils/db";
// import { jobMatchScore } from "@/utils/schema";
// import { chatSession } from "@/utils/GeminiAiModel2";

// // PDF worker file location
// pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

// export default function JobProfileMatcher() {
//   const [skills, setSkills] = useState("");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [extractedText, setExtractedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [roadmap, setRoadmap] = useState([]);

//   // Handles PDF upload and extraction
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
//     // if (!resumeFile) {
//     //   alert("Please upload a resume PDF.");
//     //   return;
//     // }

//     setLoading(true);

//     const feedbackPrompt = `
//       Candidate Skills or Degree or Job Experience: ${skills}
//       Resume Text: ${extractedText}

//       Task: Identify job profiles across three career levels for any job field i.e for Technical fields(e.g. Developer jobs) or Non Technical fields(e.g. Business Analyst jobs, Banking Fields or Jobs after passing from B.Sc,B.Com or any other Degree ) :
//       1. Beginner (Entry-Level)
//       2. Intermediate (Mid-Level)
//       3. Advanced (Senior-Level)

//       For each job profile, return:
//       - Industry (e.g., Web Development, Data Science, AI,Banking, Teaching etc.)
//       - Completed skills (skills the candidate already knows)
//       - Pending skills (skills to unlock the job profile)
//       - Career Level (Beginner, Intermediate, Advanced)

//       Return structured JSON as:
//       {
//         "roadmap": [
//           {
//             "industry": "Web Development",
//             "careerLevel": "Beginner",
//             "job": "Frontend Developer",
//             "completedStations": ["HTML", "CSS"],
//             "nextStations": ["JavaScript", "React"]
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
//             .map((item) => item.job)
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

//   const renderRoadmapByLevel = (level) =>
//     roadmap
//       .filter((item) => item.careerLevel === level)
//       .map((item, index) => (
//         <div key={index} className="mb-6">
//           <h3 className="text-xl font-bold mb-2">
//             🎯 {item.job} ({item.industry})
//           </h3>

//           <div className="flex space-x-6 items-center">
//             <div className="flex-1">
//               <p className="font-semibold mb-1">✅ Completed:</p>
//               <ul className="list-disc ml-5 text-green-600">
//                 {item.completedStations.map((skill, i) => (
//                   <li key={i}>{skill}</li>
//                 ))}
//               </ul>
//             </div>

//             {item.nextStations.length > 0 && (
//               <>
//                 <div className="flex items-center justify-center">
//                   <span className="text-xl">➡️</span>
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-semibold mb-1">📚 Learn Next:</p>
//                   <ul className="list-disc ml-5 text-red-600">
//                     {item.nextStations.map((skill, i) => (
//                       <li key={i}>{skill}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       ));

//   return (
//     <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
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
//           <h2 className="text-2xl font-semibold mb-4">🚧 Your Career Map</h2>

//           <h3 className="text-xl font-bold mb-3">🟢 Beginner Level</h3>
//           {renderRoadmapByLevel("Beginner")}

//           <h3 className="text-xl font-bold mb-3">🟡 Intermediate Level</h3>
//           {renderRoadmapByLevel("Intermediate")}

//           <h3 className="text-xl font-bold mb-3">🔴 Advanced Level</h3>
//           {renderRoadmapByLevel("Advanced")}
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
  const [error, setError] = useState(null);

  // Handles PDF upload and extraction
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    try {
      await extractTextFromPDF(file);
    } catch (err) {
      setError("Failed to extract text from PDF");
      console.error("PDF extraction error:", err);
    }
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async function () {
      try {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ");
        }
        setExtractedText(text);
      } catch (err) {
        setError("Error processing PDF file");
        throw err;
      }
    };
    reader.onerror = () => {
      setError("Error reading PDF file");
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skills && !extractedText) {
      setError("Please enter skills or upload a resume");
      return;
    }

    setLoading(true);
    setError(null);

    const feedbackPrompt = `
      Candidate Skills or Degree or Job Experience: ${skills}
      Resume Text: ${extractedText}

      Task: Identify job profiles across three career levels for any job field:
      1. Beginner (Entry-Level)
      2. Intermediate (Mid-Level)
      3. Advanced (Senior-Level)

      For each job profile, return:
      - Industry (e.g., Web Development, Data Science, AI, Banking, Teaching etc.)
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
        try {
          const roadmapData = JSON.parse(jsonMatch[0]);
          if (!roadmapData.roadmap || !Array.isArray(roadmapData.roadmap)) {
            throw new Error("Invalid roadmap format");
          }

          const validatedRoadmap = roadmapData.roadmap.map(item => ({
            industry: item.industry || "Unknown",
            careerLevel: item.careerLevel || "Unknown",
            job: item.job || "Unknown Position",
            completedStations: Array.isArray(item.completedStations) ? item.completedStations : [],
            nextStations: Array.isArray(item.nextStations) ? item.nextStations : []
          }));

          setRoadmap(validatedRoadmap);

          await db.insert(jobMatchScore).values({
            resumeText: extractedText,
            skills: skills,
            matchingProfiles: validatedRoadmap
              .map((item) => item.job)
              .join(", "),
            missingSkills: validatedRoadmap
              .flatMap((item) => item.nextStations)
              .join(", "),
          });
        } catch (parseError) {
          setError("Failed to parse response from AI");
          console.error("JSON parsing error:", parseError);
        }
      } else {
        setError("Could not understand AI response");
        console.error("No valid JSON found in response:", responseText);
      }
    } catch (error) {
      setError("Error generating career roadmap");
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderRoadmapByLevel = (level) => {
    const levelItems = roadmap.filter((item) => item.careerLevel === level);

    if (levelItems.length === 0) {
      return <p className="text-gray-500 mb-4">No {level.toLowerCase()} level positions found</p>;
    }

    return levelItems.map((item, index) => (
      <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-2">
          🎯 {item.job} ({item.industry})
        </h3>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          <div className="flex-1">
            <p className="font-semibold mb-1">✅ Completed Skills:</p>
            {item.completedStations.length > 0 ? (
              <ul className="list-disc ml-5 text-green-600">
                {item.completedStations.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 ml-5">No skills matched</p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <span className="text-xl hidden md:block">➡️</span>
            <span className="text-xl md:hidden">⬇️</span>
          </div>

          <div className="flex-1">
            <p className="font-semibold mb-1">📚 Skills to Learn:</p>
            {item.nextStations.length > 0 ? (
              <ul className="list-disc ml-5 text-blue-600">
                {item.nextStations.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 ml-5">No additional skills required</p>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg mt-5">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        🚀 Job Profile & Skill Matcher
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Your Skills/Experience:
          </label>
          <textarea
            placeholder="Enter skills separated by commas (e.g., HTML, CSS, JavaScript, Accounting, Teaching)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Or Upload Resume (PDF):
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white rounded-lg transition duration-300 ${loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            "Find Matching Profiles"
          )}
        </button>
      </form>

      {roadmap.length > 0 && (
        <div className="mt-8 p-4 md:p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">🚧 Your Career Roadmap</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-green-600">🟢 Beginner Level</h3>
              {renderRoadmapByLevel("Beginner")}
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-yellow-600">🟡 Intermediate Level</h3>
              {renderRoadmapByLevel("Intermediate")}
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-red-600">🔴 Advanced Level</h3>
              {renderRoadmapByLevel("Advanced")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}