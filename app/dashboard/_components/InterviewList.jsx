// "use client"
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs'
// import { desc, eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react'
// import InterviewItemCard from './InterviewItemCard';

// function InterviewList() {
//   const { user } = useUser();
//   const [interviewList, setInterviewList] = useState([]);

//   useEffect(() => {
//     user && GetInterviewList();
//   }, [user])

//   const GetInterviewList = async () => {
//     const result = await db.select()
//       .from(MockInterview)
//       .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
//       .orderBy(desc(MockInterview.id));

//     console.log(result);
//     setInterviewList(result);
//   }

//   return (
//     <div>
//       <h2 className='font-medium text-xl font-arial-bold'>Previous Interview's</h2>
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//         {interviewList && interviewList.map((interview, index) => (
//           <InterviewItemCard
//             interview={interview}
//             key={index} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default InterviewList 






"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function InterviewList({ searchTerm = '' }) { // Default value for searchTerm
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localSearchTerm, setLocalSearchTerm] = useState(''); // Local search term

  // Fetch interviews when the component mounts or the user changes
  useEffect(() => {
    if (user) {
      fetchInterviews();
    }
  }, [user]);

  // Fetch interviews based on searchTerm
  const fetchInterviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));

      // console.log('Fetched Interviews:', result); // Log the data
      setInterviewList(result);
      setFilteredInterviews(result); // Initialize filteredInterviews with all interviews
    } catch (err) {
      console.error('Error fetching interviews:', err);
      setError('Failed to fetch interviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter the interview list based on the local search term
  const handleLocalSearch = (e) => {
    e.preventDefault();
    const filtered = interviewList.filter((interview) => {
      const jobPosition = interview.jobPosition || ''; // Fallback to empty string
      return jobPosition.toLowerCase().includes(localSearchTerm.toLowerCase());
    });
    setFilteredInterviews(filtered);
  };

  return (
    <div>
      <h2 className='font-medium text-xl font-arial-bold'>Previous Interview's</h2>

      {/* Local Search Bar */}
      <form onSubmit={handleLocalSearch} className="my-4 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search by job profile..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
        <Button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-all"
        >
          Search
        </Button>
      </form>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {filteredInterviews.map((interview, index) => (
          <InterviewItemCard
            interview={interview}
            key={index}
          />
        ))}
      </div>
      <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></script>
      <script src="https://files.bpcontent.cloud/2025/02/27/12/20250227125015-9GLESEKC.js"></script>
    </div>
  );
}

export default InterviewList;