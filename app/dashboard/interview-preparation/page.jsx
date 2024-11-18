"use client";

import React, { useState } from "react";

const interviewVideos = [
  {
    id: 1,
    title: "Interview Preparation Video 1",
    url: "https://www.youtube.com/embed/ASj1_wPppFg?si=YFba18cwBB9DOWt1",

    articles: [
      { title: "Mastering Interview Techniques", link: "/path-to-article-1" },
    ],
    pdfNotes: [
      { title: "Interview Preparation Notes PDF", link: "/path-to-pdf-notes-1" },
    ],
  },
  {
    id: 2,
    title: "Interview Communication Skills Video",
    url: "https://www.youtube.com/embed/gDN7cJ3Rt80?si=KNRw8__M5xoEjs0J",
    articles: [
      { title: "Effective Communication in Interviews", link: "/path-to-article-2" },
    ],
    pdfNotes: [
      { title: "Interview Communication Skills PDF", link: "/path-to-pdf-notes-2" },
    ],
  },
];

const InterviewPage = () => {
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState(Array(interviewVideos.length).fill(""));

  const handleCompletionToggle = () => {
    setCompleted(!completed);
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  return (
    <div className="flex flex-col lg:flex-row p-10 bg-gradient-to-br from-gray-50 to-yellow-100 min-h-screen">
      {/* Main Content */}
      <div className="flex-1 pr-10">
        <h1 className="text-4xl font-extrabold text-yellow-800 mb-8 text-center lg:text-left">
          Interview Preparation & Communication
        </h1>
        <div className="space-y-10">
          {interviewVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-lg shadow-lg bg-white p-6 transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
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
                        className="text-yellow-600 hover:underline"
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
                        className="text-yellow-600 hover:underline"
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
                  className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
        <h2 className="text-2xl font-bold text-yellow-800 mb-6 text-center">
          Resources
        </h2>

        <div className="space-y-6">
          {/* Mark as Completed */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCompletionToggle}
              className="h-5 w-5 text-yellow-600 border-gray-300 rounded focus:ring-2 focus:ring-yellow-500"
            />
            <label className="ml-3 text-lg text-gray-700">Mark as Completed</label>
          </div>

          {/* Motivational Section */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-yellow-800">
              Ace Your Interview!
            </h3>
            <p className="text-gray-600">
              Preparation is key. Be confident, stay calm, and showcase your
              best self during interviews.
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
                  href="/path-to-interview-questions"
                  className="text-yellow-600 hover:underline"
                >
                  Common Interview Questions
                </a>
              </li>
              <li>
                <a
                  href="/path-to-communication-tips"
                  className="text-yellow-600 hover:underline"
                >
                  Communication Tips for Interviews
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
