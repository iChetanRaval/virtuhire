// app/admin/dashboard/page.jsx

"use client"
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  const [mockInterviewData, setMockInterviewData] = useState([]);

  // Fetch mock interview data here (replace with your actual data-fetching logic)
  useEffect(() => {
    // Simulated API call
    const fetchData = async () => {
      const data = await fetch("/api/mock-interviews").then((res) => res.json());
      setMockInterviewData(data);
    };
    fetchData();
  }, []);

  // Example data for a bar chart (replace with actual fetched data)
  const chartData = {
    labels: mockInterviewData.map((item) => item.userName),
    datasets: [
      {
        label: "Mock Interviews Taken",
        backgroundColor: "rgba(34, 202, 236, 0.5)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(34, 202, 236, 0.75)",
        hoverBorderColor: "rgba(34, 202, 236, 1)",
        data: mockInterviewData.map((item) => item.interviewsTaken),
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
        Admin Dashboard
      </h1>
      <p className="text-lg text-gray-700 text-center mb-12">
        Welcome to the Admin Dashboard! Use the navigation to explore the different sections.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardCard
          title="Total Users"
          value={mockInterviewData.length}
          icon="👥"
          color="bg-blue-500"
        />
        <DashboardCard
          title="Total Mock Interviews"
          value={mockInterviewData.reduce((acc, curr) => acc + curr.interviewsTaken, 0)}
          icon="📄"
          color="bg-green-500"
        />
        <DashboardCard
          title="Avg Interviews/User"
          value={(
            mockInterviewData.reduce((acc, curr) => acc + curr.interviewsTaken, 0) /
            (mockInterviewData.length || 1)
          ).toFixed(2)}
          icon="📊"
          color="bg-yellow-500"
        />
        <DashboardCard
          title="New Messages"
          value="4" // Replace with actual message count
          icon="📬"
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-6 text-blue-600">
          User Mock Interview Activity
        </h2>
        {mockInterviewData.length > 0 ? (
          <Bar data={chartData} options={{ responsive: true }} />
        ) : (
          <p className="text-gray-500">Loading data...</p>
        )}
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, color }) {
  return (
    <div className={`p-6 rounded-lg shadow-md flex items-center ${color} text-white`}>
      <div className="text-4xl mr-4">{icon}</div>
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
