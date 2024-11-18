"use client";  // Marking this as a client component
import { useState, useEffect } from 'react';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';

export default function UserAnswerTable() {
  // State to store the user answers and loading status
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        const userAnswers = await db.select().from(UserAnswer);
        setAnswers(userAnswers);
      } catch (error) {
        console.error("Error fetching user answers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAnswers();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Handle rating of answers
  const handleRating = (id, rating) => {
    // Update the rating in the state (you can send this to your API to update in the DB)
    setAnswers(answers.map((answer) =>
      answer.id === id ? { ...answer, rating } : answer
    ));
  };

  // Handle deleting a question
  const handleDelete = (id) => {
    // You can call an API to delete the question from the database
    setAnswers(answers.filter(answer => answer.id !== id));
  };

  // Loading and error handling UI
  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">User Answers</h3>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="text-left bg-blue-100">
            <th className="p-4 border">ID</th>
            <th className="p-4 border">Question</th>
            <th className="p-4 border">User Answer</th>
            <th className="p-4 border">Correct Answer</th>
            <th className="p-4 border">Rating</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer) => (
            <tr key={answer.id} className="hover:bg-gray-50">
              <td className="p-4 border">{answer.id}</td>
              <td className="p-4 border">{answer.question}</td>
              <td className="p-4 border">{answer.userAns}</td>
              <td className="p-4 border">{answer.correctAns}</td>

              {/* Rating section */}
              <td className="p-4 border">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      onClick={() => handleRating(answer.id, star)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={star <= answer.rating ? "gold" : "gray"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 17.27l4.15 2.18-1.64-5.03L20 9.24l-5.19-.43L12 2 9.19 8.81 4 9.24l3.49 5.18-1.64 5.03L12 17.27z"
                      />
                    </svg>
                  ))}
                </div>
              </td>

              {/* Delete Button */}
              <td className="p-4 border">
                <button
                  onClick={() => handleDelete(answer.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
