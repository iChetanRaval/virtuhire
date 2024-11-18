"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MockInterviewTable() {
  const [mockInterviews, setMockInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
  );
}
