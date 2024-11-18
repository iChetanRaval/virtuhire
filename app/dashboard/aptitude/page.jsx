"use client";

import React, { useState } from "react";

const videos = [
  {
    id: 1,
    title: "Aptitude Video 1",
    url: "https://www.youtube.com/embed/ETiRE7N7pEI",
    articles: [
      { title: "Understanding Aptitude", link: "/path-to-article-1" },
      { title: "Aptitude Tests Overview", link: "/path-to-article-2" },
    ],
    pdfNotes: [{ title: "Aptitude Notes PDF", link: "/path-to-pdf-notes-1" }],
  },
  {
    id: 2,
    title: "Aptitude Video 2",
    url: "https://www.youtube.com/embed/jzNxXm5twx4",
    articles: [{ title: "Aptitude Practice Questions", link: "/path-to-article-3" }],
    pdfNotes: [{ title: "Aptitude Practice PDF", link: "/path-to-pdf-notes-2" }],
  },
];

const AptitudePage = () => {
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState(Array(videos.length).fill(""));

  const handleCompletionToggle = () => {
    setCompleted(!completed);
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  return (
    <div className="flex flex-col lg:flex-row p-10 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="flex-1 pr-10">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center lg:text-left">
          Aptitude Practice
        </h1>
        <div className="space-y-10">
          {videos.map((video) => (
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
              Remember, every step you take brings you closer to mastering your
              aptitude skills. Practice regularly and track your progress!
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
                  href="/path-to-practice-questions"
                  className="text-blue-600 hover:underline"
                >
                  Practice Questions
                </a>
              </li>
              <li>
                <a
                  href="/path-to-more-resources"
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

export default AptitudePage;
