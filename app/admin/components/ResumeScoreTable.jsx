import { db } from '@/utils/db';
import { resumeScore } from '@/utils/schema';

export default async function ResumeScores() {
  const scores = await db.select().from(resumeScore);

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
