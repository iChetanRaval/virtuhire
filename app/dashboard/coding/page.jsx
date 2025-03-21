"use client";

import React, { useState } from "react";

const logicalReasoningVideos = [
  {
    id: 1,
    title: "DSA Video 1",
    url: "https://www.youtube.com/embed/J0OvDNmAWNw",
    articles: [
      { title: "Understanding DSA Concepts", link: "https://drive.google.com/file/d/1QfYg-TkfYlTzC_8vmRshWHGJd4MFMmEA/view" },
    ],
    pdfNotes: [
      { title: "DSA Notes PDF", link: "https://w3.cs.jmu.edu/spragunr/CS240_F12/ConciseNotes.pdf" },
    ],
  },
  {
    id: 2,
    title: "Web Development Video 2",
    url: "https://www.youtube.com/embed/iG2jotQo9NI",
    articles: [
      { title: "The Ultimate Web Development Roadmap", link: "https://www.browserstack.com/guide/web-development-roadmap" },
    ],
    pdfNotes: [
      { title: "Web Development Project Ideas", link: "https://www.softlogicsys.in/wp-content/uploads/2024/11/Web-Development-Project-Ideas.pdf" },
    ],
  },
];

const LogicalReasoningPage = () => {
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState(Array(logicalReasoningVideos.length).fill(""));

  const handleCompletionToggle = () => {
    setCompleted(!completed);
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  return (
    <div className="flex flex-col lg:flex-row p-10 bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen">
      {/* Main Content */}
      <div className="flex-1 pr-10">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center lg:text-left">
          Coding / Development Practice
        </h1>
        <div className="space-y-10">
          {logicalReasoningVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-lg shadow-lg bg-white p-6 transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                {video.title}
              </h2>
              <iframe
                className="w-full rounded-lg overflow-hidden"
                height="315"
                src={video.url}
                title={`YouTube video player - ${video.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Articles Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Related Articles
                </h3>
                <ul className="list-disc list-inside">
                  {video.articles.map((article, index) => (
                    <li key={index}>
                      <a
                        href={article.link}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PDF Notes Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Downloadable Notes
                </h3>
                <ul className="list-disc list-inside">
                  {video.pdfNotes.map((pdf, index) => (
                    <li key={index}>
                      <a
                        href={pdf.link}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pdf.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notes Field */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Personal Notes for {video.title}:
                </label>
                <textarea
                  rows="3"
                  className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your notes here..."
                  value={notes[video.id - 1]}
                  onChange={(e) =>
                    handleNoteChange(video.id - 1, e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-8 mt-10 lg:mt-0">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Resources
        </h2>

        <div className="space-y-6">
          {/* Mark as Completed */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCompletionToggle}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label className="ml-3 text-lg text-gray-700">
              Mark as Completed
            </label>
          </div>

          {/* Motivational Section */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-blue-800">
              Stay Motivated!
            </h3>
            <p className="text-gray-600">
              Consistency is key! Regular practice will sharpen your reasoning
              skills and boost your confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Quick Links
            </h3>
            <ul className="list-disc list-inside">
              <li>
                <a
                  href="https://www.naukri.com/code360/library/complete-data-structures-and-algorithms-roadmap-for-placements"
                  className="text-blue-600 hover:underline"
                >
                  DSA Roadmap
                </a>
              </li>
              <li>
                <a
                  href="https://www.byte-by-byte.com/wp-content/uploads/2019/01/50-Coding-Interview-Questions.pdf"
                  className="text-blue-600 hover:underline"
                >
                  Additional Resources
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogicalReasoningPage;