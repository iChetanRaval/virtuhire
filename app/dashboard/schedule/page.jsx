'use client';

import { useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import { useRouter, useParams } from 'next/navigation';

export default function ScheduleMeeting() {
  const router = useRouter();
  const params = useParams();
  const mentorId = params.mentorId;
  const [meetingType, setMeetingType] = useState('message');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // Initialize date picker
    const datePicker = flatpickr("#datePicker", {
      dateFormat: "d/m/Y",
      onChange: (selectedDates) => {
        setDate(selectedDates[0]?.toLocaleDateString() || '');
      }
    });

    // Initialize time picker
    const timePicker = flatpickr("#timePicker", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      onChange: (selectedTimes) => {
        setTime(selectedTimes[0]?.toLocaleTimeString() || '');
      }
    });

    return () => {
      datePicker.destroy();
      timePicker.destroy();
    };
  }, []);

  const handleScheduleMeet = () => {
    if (!date || !time) {
      alert('Please select both date and time');
      return;
    }

    router.push('/dashboard/payment');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <button
          onClick={() => router.push('/dashboard/mentor-support')}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Mentors
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">Schedule Your Session</h2>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaCalendarAlt className="inline mr-2" />
            Select Date
          </label>
          <input
            id="datePicker"
            type="text"
            placeholder="DD/MM/YYYY"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 pl-10"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <FaClock className="inline mr-2" />
            Select Time
          </label>
          <input
            id="timePicker"
            type="text"
            placeholder="HH:MM"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 pl-10"
            required
          />
        </div>

        {/* <div className="mb-6 text-center">
          <label className="block text-gray-700 text-sm font-bold mb-2">Session Type</label>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setMeetingType('message')}
              className={`${meetingType === 'message' ? 'bg-blue-600' : 'bg-blue-400'} hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors`}
            >
              Message
            </button>
            <button
              onClick={() => setMeetingType('zoom')}
              className={`${meetingType === 'zoom' ? 'bg-blue-600' : 'bg-blue-400'} hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors`}
            >
              Zoom Meeting
            </button>
          </div>
        </div> */}

        <div className="text-center">
          <button
            onClick={handleScheduleMeet}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors transform hover:scale-105"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}