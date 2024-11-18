// "use client"
// import { Button } from '@/components/ui/button'
// import { db } from '@/utils/db'
// import { MockInterview } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import { Lightbulb, WebcamIcon } from 'lucide-react'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'

// function Interview(params) {

//   // const [interviewData, setInterviewData] = useState();
//   const [interviewData, setInterviewData] = useState({
//     jobPosition: '',
//     jobDesc: '',
//     jobExperience: '',
//     jobResume: ''
//   });
//   const [webCamEnabled, setWebCamEnabled] = useState(false);
//   useEffect(() => {
//     console.log(params.params.interviewId)
//     GetInterviewDetails();
//   }, [])
//   /**
//    * Used to Get Interview Details by MockId/Interview Id
//    */
//   const GetInterviewDetails = async () => {
//     const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.params.interviewId))

//     // console.log(result)
//     setInterviewData(result[0]);
//   }

//   /// Demooooo
//   const handleStartInterview = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/start_detection'); // Your Python API endpoint
//       const data = await response.json();
//       console.log("Detection status:", data.status);
//       // Proceed to navigate or handle interview start if needed
//     } catch (error) {
//       console.error("Error starting detection:", error);
//     }
//   };

//   // End Demo

//   return (
//     <div className='my-10'>
//       <h2 className='font-bold text-2xl'>Let's Get Started</h2>

//       <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

//         <div className='flex flex-col my-5 gap-4'>
//           <div className='flex flex-col p-5 rounded-lg border gap-5'>
//             <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData.jobPosition}</h2>
//             <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData.jobDesc}</h2>
//             <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData.jobExperience}</h2>
//             <h2 className='text-lg'><strong>Resume:</strong>{interviewData.jobResume}</h2>
//           </div>
//           <div className='p-5 border rounded-lg border-orange-300 bg-orange-200'>
//             <h2 className='flex gap-2 items-center text-orange-500'><Lightbulb></Lightbulb><strong>Information</strong></h2>
//             <h2 className='mt-3 text-orange-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
//           </div>
//         </div>
//         <div>
//           {webCamEnabled ? <Webcam
//             onUserMedia={() => setWebCamEnabled(true)}
//             onUserMediaError={() => setWebCamEnabled(false)}
//             mirrored={true}
//             style={{
//               height: 300,
//               width: 300
//             }}
//           />
//             :
//             <>
//               {/* Use JSX comment syntax */}
//               <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary' />

//               <Button variant="ghost" className='w-full bg-green-200' onClick={() => setWebCamEnabled(true)} req>Enable web Camera and Microphone</Button>
//             </>
//           }
//         </div>
//       </div>
//       <div className='flex justify-end items-end'>

//         <Link href={`/dashboard/interview/${params.params.interviewId}/start`}>
//           <Button onClick={handleStartInterview}>Start Interview</Button>
//         </Link>
//       </div>

//     </div>
//   )
// }

// export default Interview



// "use client"
// import { Button } from '@/components/ui/button'
// import { db } from '@/utils/db'
// import { MockInterview } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import { Lightbulb, WebcamIcon } from 'lucide-react'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'

// function Interview(params) {

//   const [interviewData, setInterviewData] = useState({
//     jobPosition: '',
//     jobDesc: '',
//     jobExperience: '',
//     jobResume: ''
//   });
//   const [webCamEnabled, setWebCamEnabled] = useState(false);
//   const [detectionStarted, setDetectionStarted] = useState(false);

//   useEffect(() => {
//     GetInterviewDetails();
//   }, [])

//   const GetInterviewDetails = async () => {
//     const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.params.interviewId))
//     setInterviewData(result[0]);
//   }

//   const handleStartInterview = async () => {
//     if (!webCamEnabled) {
//       alert("Please enable the webcam and microphone first.");
//       return;
//     }
//     try {
//       const response = await fetch('http://localhost:8000/start_detection'); // Your Python API endpoint
//       const data = await response.json();
//       console.log("Detection started:", data);
//       setDetectionStarted(true); // Update state to indicate detection has started
//     } catch (error) {
//       console.error("Error starting detection:", error);
//     }
//   };

//   return (
//     <div className='my-10'>
//       <h2 className='font-bold text-2xl'>Let's Get Started</h2>
//       <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
//         <div className='flex flex-col my-5 gap-4'>
//           <div className='flex flex-col p-5 rounded-lg border gap-5'>
//             <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData.jobPosition}</h2>
//             <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData.jobDesc}</h2>
//             <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData.jobExperience}</h2>
//             <h2 className='text-lg'><strong>Resume:</strong>{interviewData.jobResume}</h2>
//           </div>
//           <div className='p-5 border rounded-lg border-orange-300 bg-orange-200'>
//             <h2 className='flex gap-2 items-center text-orange-500'><Lightbulb /><strong>Information</strong></h2>
//             <h2 className='mt-3 text-orange-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
//           </div>
//         </div>
//         <div>
//           {webCamEnabled ? (
//             <Webcam
//               onUserMedia={() => setWebCamEnabled(true)}
//               onUserMediaError={() => setWebCamEnabled(false)}
//               mirrored={true}
//               style={{ height: 300, width: 300 }}
//             />
//           ) : (
//             <>
//               <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary' />
//               <Button variant="ghost" className='w-full bg-green-200' onClick={() => setWebCamEnabled(true)}>Enable web Camera and Microphone</Button>
//             </>
//           )}
//         </div>
//       </div>
//       <div className='flex justify-end items-end'>
//         <Link href={`/dashboard/interview/${params.params.interviewId}/start`}>
//           <Button onClick={handleStartInterview}>Start Interview</Button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Interview


"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';


function Interview(params) {
  const [interviewData, setInterviewData] = useState({
    jobPosition: '',
    jobDesc: '',
    jobExperience: '',
    jobResume: '',
  });
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  useEffect(() => {
    console.log(params.params.interviewId);
    GetInterviewDetails();
  }, []);

  /**
   * Used to Get Interview Details by MockId/Interview Id
   */
  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.params.interviewId));
    setInterviewData(result[0]);
  };

  const videoFile = "/Avtar_Video.mp4";


  // Handle Starting the Interview
  const handleStartInterview = async () => {
    try {
      const response = await fetch('http://localhost:8000/start_detection'); // Your Python API endpoint
      const data = await response.json();
      console.log("Detection status:", data.status);

      // Start the interview video
      setIsInterviewStarted(true);
    } catch (error) {
      console.error("Error starting detection:", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section: Job Details */}
        <div className="flex flex-col my-5 gap-4">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg"><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
            <h2 className="text-lg"><strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}</h2>
            <h2 className="text-lg"><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
            <h2 className="text-lg"><strong>Resume:</strong> {interviewData.jobResume}</h2>
          </div>
          <div className="p-5 border rounded-lg border-orange-300 bg-orange-200">
            <h2 className="flex gap-2 items-center text-orange-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-orange-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        {/* Right Section: Webcam and Video */}
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary" />
              <Button
                variant="ghost"
                className="w-full bg-green-200"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Camera and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Video Playback Section */}
      {isInterviewStarted && (
        <div className="mt-10">
          <video
            src={videoFile}
            autoPlay
            loop
            muted
            style={{
              width: '100%',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          ></video>
        </div>
      )}

      {/* Start Interview Button */}
      <div className="flex justify-end items-end mt-6">
        <Link href={`/dashboard/interview/${params.params.interviewId}/start`}>
          <Button onClick={handleStartInterview}>
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
