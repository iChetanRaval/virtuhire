// "use client"
// import { db } from '@/utils/db'
// import { UserAnswer } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import React, { useEffect, useState } from 'react'
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import { ChevronDown, ChevronsUpDown } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'

// function Feedback({ params }) {

//   const [feedbackList, setFeedbackList] = useState([]);
//   const router = useRouter();
//   useEffect(() => {
//     GetFeedback();
//   }, [])

//   const GetFeedback = async () => {
//     const result = await db.select()
//       .from(UserAnswer)
//       .where(eq(UserAnswer.mockIdRef, params.interviewId))
//       .orderBy(UserAnswer.id);

//     console.log(result);
//     setFeedbackList(result)
//   }
//   return (
//     <div className='p-10'>

//       {feedbackList?.length == 0 ?
//         <h2 className='font-bold text-xl text-gray-500'>No Interview Record is Found</h2>
//         :
//         <>
//           <h2 className='text-3xl font-bold text-pink-400'>Congratulations</h2>
//           <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

//           <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>--/10</strong></h2>

//           <h2 className='text-sm text-grey-500'>Find interview question with correct answer,Your answer and feedback for improvement</h2>
//           {feedbackList && feedbackList.map((item, index) => (

//             <Collapsible key={index} className='mt-7'>
//               <CollapsibleTrigger className='p-2 bg-secondary rounded-lg  flex justify-between my-2 text-left gap-7 w-full'>
//                 {item.question} <ChevronsUpDown className='h-5 w-5' />
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <div className='flex flex-col gap-2'>
//                   <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:{item.rating}</strong></h2>
//                   <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong>{item.userAns}</h2>
//                   <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Model Answer:</strong>{item.correctAns}</h2>
//                   <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary-900'><strong>Feedback:</strong>{item.feedback}</h2>
//                 </div>
//               </CollapsibleContent>
//             </Collapsible>

//           ))}
//         </>}
//       <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
//     </div>
//   )
// }

// export default Feedback



//*******  2  ********//

// "use client"
// import { db } from '@/utils/db'
// import { UserAnswer } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import React, { useEffect, useState } from 'react'
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import { ChevronDown, ChevronsUpDown } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'

// function Feedback({ params }) {

//   const [feedbackList, setFeedbackList] = useState([]);
//   const [averageRating, setAverageRating] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     GetFeedback();
//   }, []);

//   const GetFeedback = async () => {
//     const result = await db.select()
//       .from(UserAnswer)
//       .where(eq(UserAnswer.mockIdRef, params.interviewId))
//       .orderBy(UserAnswer.id);

//     const filteredFeedback = [];
//     const questionRatings = new Map();

//     result.forEach((item) => {
//       const existingRating = questionRatings.get(item.question);
//       const cappedRating = Math.min(item.rating, 10); // Ensure rating does not exceed 10
//       if (!existingRating || cappedRating > existingRating) {
//         questionRatings.set(item.question, cappedRating);
//       }
//       filteredFeedback.push(item);
//     });

//     setFeedbackList(result);

//     const highestRatings = Array.from(questionRatings.values());
//     const totalRating = highestRatings.reduce((acc, rating) => acc + rating, 0);
//     const avgRating = (highestRatings.length > 0) ? (totalRating / highestRatings.length).toFixed(1) : '--';

//     setAverageRating(avgRating);
//   };


//   return (
//     <div className='p-10'>

//       {feedbackList?.length == 0 ? (
//         <h2 className='font-bold text-xl text-gray-500'>No Interview Record is Found</h2>
//       ) : (
//         <>
//           <h2 className='text-3xl font-bold text-pink-400'>Congratulations</h2>
//           <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

//           <h2 className='text-primary text-lg my-3'>
//             Your overall interview rating: <strong>{averageRating}/10</strong>
//           </h2>

//           <h2 className='text-sm text-grey-500'>Find interview question with correct answer, Your answer and feedback for improvement</h2>
//           {feedbackList.map((item, index) => (
//             <Collapsible key={index} className='mt-7'>
//               <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
//                 {item.question} <ChevronsUpDown className='h-5 w-5' />
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <div className='flex flex-col gap-2'>
//                   <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: {item.rating}</strong></h2>
//                   <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong> {item.userAns}</h2>
//                   <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Model Answer:</strong> {item.correctAns}</h2>
//                   <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary-900'><strong>Feedback:</strong> {item.feedback}</h2>
//                 </div>
//               </CollapsibleContent>
//             </Collapsible>
//           ))}
//         </>
//       )}
//       <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
//     </div>
//   )
// }

// export default Feedback;


// "use client";
// import { db } from '@/utils/db';
// import { UserAnswer } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';

// function Feedback() {
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [averageRating, setAverageRating] = useState(null);
//   const router = useRouter();
//   const { interviewId } = useParams(); // Use useParams to get interviewId

//   useEffect(() => {
//     if (interviewId) {
//       GetFeedback(interviewId);
//     }
//   }, [interviewId]);

//   const GetFeedback = async (interviewId) => {
//     try {
//       const result = await db.select()
//         .from(UserAnswer)
//         .where(eq(UserAnswer.mockIdRef, interviewId))
//         .orderBy(UserAnswer.id);

//       const filteredFeedback = [];
//       const questionRatings = new Map();

//       result.forEach((item) => {
//         const existingRating = questionRatings.get(item.question);
//         const cappedRating = Math.min(item.rating, 10);
//         if (!existingRating || cappedRating > existingRating) {
//           questionRatings.set(item.question, cappedRating);
//         }
//         filteredFeedback.push(item);
//       });

//       setFeedbackList(result);

//       const highestRatings = Array.from(questionRatings.values());
//       const totalRating = highestRatings.reduce((acc, rating) => acc + rating, 0);
//       const avgRating = (highestRatings.length > 0) ? (totalRating / highestRatings.length).toFixed(1) : '--';

//       setAverageRating(avgRating);
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//     }
//   };

//   return (
//     <div className='p-10'>
//       {feedbackList?.length === 0 ? (
//         <h2 className='font-bold text-xl text-gray-500'>No Interview Record is Found</h2>
//       ) : (
//         <>
//           <h2 className='text-3xl font-bold text-pink-400'>Congratulations</h2>
//           <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

//           <h2 className='text-primary text-lg my-3'>
//             Your overall interview rating: <strong>{averageRating}/10</strong>
//           </h2>
//           <h2 className='text-primary text-lg my-3 font-Arial'>
//             Your overall interview Conifence:<strong>80%</strong>
//           </h2>

//           <h2 className='text-sm text-grey-500'>Find interview question with correct answer, Your answer and feedback for improvement</h2>
//           {feedbackList.map((item, index) => (
//             <Collapsible key={index} className='mt-7'>
//               <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
//                 {item.question} <ChevronsUpDown className='h-5 w-5' />
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <div className='flex flex-col gap-2'>
//                   <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: {item.rating}</strong></h2>
//                   <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong> {item.userAns}</h2>
//                   <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Model Answer:</strong> {item.correctAns}</h2>
//                   <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary-900'><strong>Feedback:</strong> {item.feedback}</h2>
//                   <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary-900'><strong>Eye Contact: </strong>88%</h2>
//                   <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary-900'><strong> Confidence: </strong>82%</h2>
//                 </div>
//               </CollapsibleContent>
//             </Collapsible>
//           ))}
//         </>
//       )}
//       <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
//     </div>
//   );
// }

// export default Feedback;


// main
// "use client";
// import { db } from '@/utils/db';
// import { UserAnswer } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';

// function Feedback() {
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [averageRating, setAverageRating] = useState(null);
//   const [overallEyeContact, setOverallEyeContact] = useState(null);
//   const [overallConfidence, setOverallConfidence] = useState(null);
//   const router = useRouter();
//   const { interviewId } = useParams(); // Use useParams to get interviewId

//   useEffect(() => {
//     if (interviewId) {
//       GetFeedback(interviewId);
//       generateRandomMetrics(); // Generate random metrics on component load
//     }
//   }, [interviewId]);

//   // Function to fetch feedback data
//   const GetFeedback = async (interviewId) => {
//     try {
//       const result = await db.select()
//         .from(UserAnswer)
//         .where(eq(UserAnswer.mockIdRef, interviewId))
//         .orderBy(UserAnswer.id);

//       const filteredFeedback = [];
//       const questionRatings = new Map();

//       result.forEach((item) => {
//         const existingRating = questionRatings.get(item.question);
//         const cappedRating = Math.min(item.rating, 10);
//         if (!existingRating || cappedRating > existingRating) {
//           questionRatings.set(item.question, cappedRating);
//         }
//         filteredFeedback.push(item);
//       });

//       setFeedbackList(result);

//       const highestRatings = Array.from(questionRatings.values());
//       const totalRating = highestRatings.reduce((acc, rating) => acc + rating, 0);
//       const avgRating = (highestRatings.length > 0) ? (totalRating / highestRatings.length).toFixed(1) : '--';

//       setAverageRating(avgRating);
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//     }
//   };

//   // Function to generate random eye contact and confidence metrics
//   const generateRandomMetrics = () => {
//     const randomEyeContact = Math.floor(Math.random() * 21) + 80; // Random between 80-100%
//     const randomConfidence = Math.floor(Math.random() * 21) + 80; // Random between 80-100%
//     setOverallEyeContact(randomEyeContact);
//     setOverallConfidence(randomConfidence);
//   };

//   return (
//     <div className='p-10'>
//       {feedbackList?.length === 0 ? (
//         <h2 className='font-bold text-xl text-gray-500'>No Interview Record is Found</h2>
//       ) : (
//         <>
//           <h2 className='text-3xl font-bold text-pink-400'>Congratulations</h2>
//           <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

//           {/* Overall Feedback Card */}
//           <div className="bg-red-200 p-5 rounded-lg shadow-lg mt-4 text-center">
//             <h2 className='text-primary text-lg mb-2'>
//               Your overall interview rating: <strong>{averageRating}/10</strong>
//             </h2>
//             <div className='flex justify-around text-lg'>
//               <h3 className='text-blue-500'><strong>Eye Contact:</strong> {overallEyeContact}%</h3>
//               <h3 className='text-green-500'><strong>Confidence:</strong> {overallConfidence}%</h3>
//             </div>
//           </div>

//           <h2 className='text-sm text-grey-500 mt-5'>Find interview question with correct answer, Your answer, and feedback for improvement:</h2>
//           {feedbackList.map((item, index) => (
//             <Collapsible key={index} className='mt-7'>
//               <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
//                 {item.question} <ChevronsUpDown className='h-5 w-5' />
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <div className='flex flex-col gap-2'>
//                   <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: {item.rating}</strong></h2>
//                   <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer:</strong> {item.userAns}</h2>
//                   <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Model Answer:</strong> {item.correctAns}</h2>
//                   <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary-900'><strong>Feedback:</strong> {item.feedback}</h2>
//                   <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary-900'><strong>Eye Contact:</strong> {Math.floor(Math.random() * 21) + 80}%</h2>
//                   <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary-900'><strong>Confidence:</strong> {Math.floor(Math.random() * 21) + 80}%</h2>
//                 </div>
//               </CollapsibleContent>
//             </Collapsible>
//           ))}
//         </>
//       )}
//       <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
//     </div>
//   );
// }

// export default Feedback;


"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

ChartJS.register(ArcElement, Tooltip, Legend);

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [overallEyeContact, setOverallEyeContact] = useState(null);
  const [overallConfidence, setOverallConfidence] = useState(null);
  const router = useRouter();
  const { interviewId } = useParams(); // Use useParams to get interviewId

  useEffect(() => {
    if (interviewId) {
      GetFeedback(interviewId);
      generateRandomMetrics(); // Generate random metrics on component load
    }
  }, [interviewId]);

  // Function to fetch feedback data
  const GetFeedback = async (interviewId) => {
    try {
      const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

      const filteredFeedback = [];
      const questionRatings = new Map();

      result.forEach((item) => {
        const existingRating = questionRatings.get(item.question);
        const cappedRating = Math.min(item.rating, 10);
        if (!existingRating || cappedRating > existingRating) {
          questionRatings.set(item.question, cappedRating);
        }
        filteredFeedback.push(item);
      });

      setFeedbackList(result);

      const highestRatings = Array.from(questionRatings.values());
      const totalRating = highestRatings.reduce((acc, rating) => acc + rating, 0);
      const avgRating = (highestRatings.length > 0) ? (totalRating / highestRatings.length).toFixed(1) : '--';

      setAverageRating(avgRating);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // Function to generate random eye contact and confidence metrics
  const generateRandomMetrics = () => {
    const randomEyeContact = Math.floor(Math.random() * 21) + 65; // Random between 80-100%
    const randomConfidence = Math.floor(Math.random() * 21) + 60; // Random between 80-100%
    setOverallEyeContact(randomEyeContact);
    setOverallConfidence(randomConfidence);
  };

  // Data for the pie chart
  const chartData = {
    labels: ['Rating'],
    datasets: [
      {
        data: [averageRating || 0, 10 - (averageRating || 0)],
        backgroundColor: ['#34D399', '#E5E7EB'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  return (
    <div className='p-10 bg-gray-100 min-h-screen'>
      {feedbackList?.length === 0 ? (
        <h2 className='font-bold text-xl text-gray-500'>No Interview Record is Found</h2>
      ) : (
        <>
          <h2 className='text-4xl font-extrabold text-pink-500 text-center'>Congratulations!</h2>
          <h2 className='font-semibold text-xl text-center mb-5'>Here is your interview feedback</h2>

          {/* Overall Feedback Section */}
          <div className="bg-white p-10 rounded-lg shadow-lg mt-6 flex flex-col items-center">
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Overall Feedback</h3>
            <div className='flex items-center justify-around w-full'>
              {/* Pie Chart */}
              <div className='w-40'>
                <Doughnut data={chartData} options={chartOptions} />
                <p className='text-center text-lg font-semibold text-gray-600 mt-2'>
                  <span className='text-green-500'>{averageRating || '--'}</span>/10
                </p>
              </div>

              {/* Metrics */}
              <div className="text-lg font-medium text-gray-700 space-y-2">
                <h3 className='text-blue-500'>
                  <strong>Eye Contact:</strong> {overallEyeContact}%
                </h3>
                <h3 className='text-green-500'>
                  <strong>Confidence:</strong> {overallConfidence}%
                </h3>
              </div>
            </div>
          </div>

          {/* Individual Feedback */}
          <h2 className='text-lg text-gray-600 mt-8 font-bold text-primary'>Find interview questions with the correct answer, your answer, and feedback for improvement:</h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className='mt-7'>
              <CollapsibleTrigger className='p-3 bg-gray-200 rounded-lg flex justify-between items-center text-gray-800 w-full'>
                {item.question} <ChevronsUpDown className='h-5 w-5 text-gray-600' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-3 mt-2 p-4 bg-white rounded-lg shadow'>
                  <h3 className='text-red-500'><strong>Rating:</strong> {item.rating}</h3>
                  <h3 className='bg-gray-100 p-3 rounded-md text-gray-700'><strong>Your Answer:</strong> {item.userAns}</h3>
                  <h3 className='bg-green-100 p-3 rounded-md text-green-700'><strong>Correct Model Answer:</strong> {item.correctAns}</h3>
                  <h3 className='bg-blue-100 p-3 rounded-md text-blue-700'><strong>Feedback:</strong> {item.feedback}</h3>
                  <h3 className='bg-yellow-100 p-3 rounded-md text-yellow-700'><strong>Eye Contact:</strong> {Math.floor(Math.random() * 21) + 80}%</h3>
                  <h3 className='bg-yellow-100 p-3 rounded-md text-yellow-700'><strong>Confidence:</strong> {Math.floor(Math.random() * 21) + 80}%</h3>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button className='mt-6' onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;


// "use client";
// import { db } from '@/utils/db';
// import { UserAnswer } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// ChartJS.register(ArcElement, Tooltip, Legend);

// function Feedback() {
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [averageRating, setAverageRating] = useState(null);
//   const [overallEyeContact, setOverallEyeContact] = useState(null);
//   const [overallConfidence, setOverallConfidence] = useState(null);
//   const router = useRouter();
//   const { interviewId } = useParams(); // Use useParams to get interviewId

//   useEffect(() => {
//     if (interviewId) {
//       GetFeedback(interviewId);
//       generateRandomMetrics(); // Generate random metrics on component load
//     }
//   }, [interviewId]);

//   // Function to fetch feedback data
//   const GetFeedback = async (interviewId) => {
//     try {
//       const result = await db.select()
//         .from(UserAnswer)
//         .where(eq(UserAnswer.mockIdRef, interviewId))
//         .orderBy(UserAnswer.id);

//       const filteredFeedback = [];
//       const questionRatings = new Map();

//       result.forEach((item) => {
//         const existingRating = questionRatings.get(item.question);
//         const cappedRating = Math.min(item.rating, 10);
//         if (!existingRating || cappedRating > existingRating) {
//           questionRatings.set(item.question, cappedRating);
//         }
//         filteredFeedback.push(item);
//       });

//       setFeedbackList(result);

//       const highestRatings = Array.from(questionRatings.values());
//       const totalRating = highestRatings.reduce((acc, rating) => acc + rating, 0);
//       const avgRating = (highestRatings.length > 0) ? (totalRating / highestRatings.length).toFixed(1) : '--';

//       setAverageRating(avgRating);
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//     }
//   };

//   // Function to generate random eye contact and confidence metrics
//   const generateRandomMetrics = () => {
//     const randomEyeContact = Math.floor(Math.random() * 21) + 80; // Random between 80-100%
//     const randomConfidence = Math.floor(Math.random() * 21) + 80; // Random between 80-100%
//     setOverallEyeContact(randomEyeContact);
//     setOverallConfidence(randomConfidence);
//   };

//   // Data for the pie charts
//   const createChartData = (value) => ({
//     labels: ['Achieved', 'Remaining'],
//     datasets: [
//       {
//         data: [value, 100 - value],
//         backgroundColor: ['#34D399', '#E5E7EB'],
//         borderWidth: 1,
//       },
//     ],
//   });

//   const chartOptions = {
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     cutout: '70%',
//   };

//   return (
//     <div className='p-10 bg-gray-100 min-h-screen'>
//       {feedbackList?.length === 0 ? (
//         <h2 className='font-bold text-xl text-gray-500'>No Interview Record is Found</h2>
//       ) : (
//         <>
//           <h2 className='text-4xl font-extrabold text-pink-500 text-center'>Congratulations!</h2>
//           <h2 className='font-semibold text-xl text-center mb-5'>Here is your interview feedback</h2>

//           {/* Overall Feedback Section */}
//           <div className="bg-white p-10 rounded-lg shadow-lg mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Rating Chart */}
//             <div className="text-center">
//               <h3 className='text-lg font-bold text-gray-700'>Overall Rating</h3>
//               <Doughnut data={createChartData(averageRating || 0)} options={chartOptions} />
//               <p className='text-lg font-semibold text-gray-600 mt-2'>
//                 <span className='text-green-500'>{averageRating || '--'}</span>/10
//               </p>
//             </div>

//             {/* Eye Contact Chart */}
//             <div className="text-center">
//               <h3 className='text-lg font-bold text-gray-700'>Eye Contact</h3>
//               <Doughnut data={createChartData(overallEyeContact || 0)} options={chartOptions} />
//               <p className='text-lg font-semibold text-gray-600 mt-2'>
//                 <span className='text-blue-500'>{overallEyeContact || '--'}%</span>
//               </p>
//             </div>

//             {/* Confidence Chart */}
//             <div className="text-center">
//               <h3 className='text-lg font-bold text-gray-700'>Confidence</h3>
//               <Doughnut data={createChartData(overallConfidence || 0)} options={chartOptions} />
//               <p className='text-lg font-semibold text-gray-600 mt-2'>
//                 <span className='text-purple-500'>{overallConfidence || '--'}%</span>
//               </p>
//             </div>
//           </div>

//           {/* Individual Feedback */}
//           <h2 className='text-lg text-gray-600 mt-8'>Find interview questions with the correct answer, your answer, and feedback for improvement:</h2>
//           {feedbackList.map((item, index) => (
//             <Collapsible key={index} className='mt-7'>
//               <CollapsibleTrigger className='p-3 bg-gray-200 rounded-lg flex justify-between items-center text-gray-800 w-full'>
//                 {item.question} <ChevronsUpDown className='h-5 w-5 text-gray-600' />
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <div className='flex flex-col gap-3 mt-2 p-4 bg-white rounded-lg shadow'>
//                   <h3 className='text-red-500'><strong>Rating:</strong> {item.rating}</h3>
//                   <h3 className='bg-gray-100 p-3 rounded-md text-gray-700'><strong>Your Answer:</strong> {item.userAns}</h3>
//                   <h3 className='bg-green-100 p-3 rounded-md text-green-700'><strong>Correct Model Answer:</strong> {item.correctAns}</h3>
//                   <h3 className='bg-blue-100 p-3 rounded-md text-blue-700'><strong>Feedback:</strong> {item.feedback}</h3>
//                   <h3 className='bg-yellow-100 p-3 rounded-md text-yellow-700'><strong>Eye Contact:</strong> {Math.floor(Math.random() * 21) + 80}%</h3>
//                   <h3 className='bg-yellow-100 p-3 rounded-md text-yellow-700'><strong>Confidence:</strong> {Math.floor(Math.random() * 21) + 80}%</h3>
//                 </div>
//               </CollapsibleContent>
//             </Collapsible>
//           ))}
//         </>
//       )}
//       <Button className='mt-6' onClick={() => router.replace('/dashboard')}>Go Home</Button>
//     </div>
//   );
// }

// export default Feedback;
