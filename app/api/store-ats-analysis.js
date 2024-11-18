// // pages/api/analyzeResume.js
// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const { prompt } = req.body;

//     // Replace this with your actual API endpoint for resume analysis
//     const apiUrl = '';
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ prompt }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to analyze resume');
//     }

//     const data = await response.json();
//     return res.status(200).json(data);
//   } catch (error) {
//     console.error('Error in resume analysis API:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }


// /pages/api/store-ats-analysis.js
import { db } from '@/utils/db'; // Adjust the import path for your project

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { jobDescription, resumeText, ats_score, strengths, weaknesses, match_percentage } = req.body;

    try {
      await db.insert({
        jobDescription,
        resumeText,
        ats_score,
        strengths: JSON.stringify(strengths),
        weaknesses: JSON.stringify(weaknesses),
        match_percentage,
      });

      res.status(200).json({ message: "Data stored successfully." });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Failed to store data." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
