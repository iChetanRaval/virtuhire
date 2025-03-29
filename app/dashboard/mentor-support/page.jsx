'use client';

import { useState } from 'react';
import Fuse from 'fuse.js';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function MentorSupport() {
  const [searchQuery, setSearchQuery] = useState('');

  const mentors = [
    {
      name: "Dr. Siddheshwar V. Patil",
      qualification: "Engineering IIT Bombay, PHD In Artificial intelligence and machine learning",
      expertise: "Deep Learning, Advance ML, Image Processing, Neural Networks",
      imageUrl: "https://storage.googleapis.com/a1aa/image/rwFH7GHqoyt-lm78-NHxhr8cwleUyRKg9sfhGn7VjLI.jpg"
    },
    {
      name: "Dr. Vivek Geeta Mane",
      qualification: "Engineering IIT Madras, PHD In Cyber Security and Ethical Hacking",
      expertise: "Symmetric Algorithm, Information Vulnerabilities, Digital Signature, Networking",
      imageUrl: "https://storage.googleapis.com/a1aa/image/kzVjlMZyreQn3YyG3orupB9hBjnJyqdOh8EU_9rnbCw.jpg"
    },
    {
      name: "Dr. Anjali Sharma",
      qualification: "Engineering IIT Delhi, PHD In Data Science",
      expertise: "Big Data, Data Mining, Statistical Analysis, Predictive Modeling",
      imageUrl: "https://storage.googleapis.com/a1aa/image/I_tL_pyQwyBOSdutJYRBYOrpj-f8sLo-O7wqlNbcK28.jpg"
    },
    {
      name: "Dr. Rajesh Kumar",
      qualification: "Engineering IIT Kanpur, PHD In Robotics",
      expertise: "Autonomous Systems, Control Systems, Machine Vision, Embedded Systems",
      imageUrl: "https://storage.googleapis.com/a1aa/image/Oysm7b73iuTopI0d5Y-efLByGqJv01XdIvqBYmii2IY.jpg"
    },
    {
      name: "Dr. Priya Mehta",
      qualification: "Engineering IIT Kharagpur, PHD In Quantum Computing",
      expertise: "Quantum Algorithms, Quantum Cryptography, Quantum Machine Learning",
      imageUrl: "https://storage.googleapis.com/a1aa/image/1.jpg"
    },
    {
      name: "Dr. Ramesh Gupta",
      qualification: "Engineering IIT Roorkee, PHD In Blockchain Technology",
      expertise: "Blockchain Development, Smart Contracts, Decentralized Applications",
      imageUrl: "https://storage.googleapis.com/a1aa/image/2.jpg"
    },
    {
      name: "Dr. Neha Verma",
      qualification: "Engineering IIT Guwahati, PHD In Bioinformatics",
      expertise: "Genomics, Proteomics, Computational Biology, Bioinformatics Algorithms",
      imageUrl: "https://storage.googleapis.com/a1aa/image/3.jpg"
    }
  ];

  const fuse = new Fuse(mentors, {
    keys: ['name', 'qualification', 'expertise'],
    threshold: 0.3
  });

  const filteredMentors = searchQuery
    ? fuse.search(searchQuery).map(result => result.item)
    : mentors;

  const handleImageError = (e) => {
    const target = e.target;
    target.src = 'https://placehold.co/100x100';
    target.onerror = null;
  };

  return (
    <div className="bg-white p-4">
      <Head>
        <title>Mentor Support</title>
        <meta name="description" content="Find expert mentors in various technical fields" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-blue-700 text-2xl font-bold mb-4">Mentor Support</h1>

        <div className="flex items-center mb-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Topic on which you want mentoring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800 transition-colors"
          >
            <FaSearch />
          </button>
        </div>

        <div className="space-y-4">
          {filteredMentors.map((mentor, index) => (
            <Link

              href={'/dashboard/schedule'}
              className="block"
            >
              <div
                key={index}
                className="flex items-center bg-gray-200 p-4 rounded-md border border-gray-300 hover:border-blue-500 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-24 h-24 rounded-full bg-gray-300 mr-4 overflow-hidden">
                  <img
                    src={mentor.imageUrl}
                    alt={`Profile picture of ${mentor.name}`}
                    className="object-cover w-full h-full"
                    onError={handleImageError}
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-bold">Name: {mentor.name}</p>
                  <p>Qualification: {mentor.qualification}</p>
                  <p>Expertise: {mentor.expertise}</p>
                </div>
                <div>
                  <FaArrowRight className="text-green-600 text-2xl" />

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}