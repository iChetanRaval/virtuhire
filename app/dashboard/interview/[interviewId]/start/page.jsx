// "use client"
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react'
// import QuestionsSection from './_components/QuestionsSection';
// import RecordAnswerSection from './_components/RecordAnswerSection';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// function StartInterview(params) {

//   const [interviewData, setInterviewData] = useState();
//   const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
//   const [mockInterviewOption, setMockInterviewOption] = useState();

//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
//   //Demo 
//   // const [TextUserAnswer, setTextUserAnswer] = useState();
//   useEffect(() => {
//     GetInterviewDetails();
//   }, []);
//   const GetInterviewDetails = async () => {
//     const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.params.interviewId))

//     const jsonMockResp = JSON.parse(result[0].jsonMockResp)

//     console.log(jsonMockResp);
//     setMockInterviewQuestion(jsonMockResp);
//     setInterviewData(result[0]);
//   }

//   return (

//     <div>
//       <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
//         {/* Question */}
//         <QuestionsSection
//           mockInterviewQuestion={mockInterviewQuestion}
//           activeQuestionIndex={activeQuestionIndex}
//         />

//         {/* Video/Audio Recording */}
//         <RecordAnswerSection
//           mockInterviewQuestion={mockInterviewQuestion}
//           activeQuestionIndex={activeQuestionIndex}
//           interviewData={interviewData}
//         // TextUserAnswer={TextUserAnswer} 
//         />
//       </div>
//       <div className='flex justify-end gap-6'>
//         {activeQuestionIndex > 0 &&
//           <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
//         {activeQuestionIndex != mockInterviewQuestion?.length - 1
//           && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
//         {activeQuestionIndex == mockInterviewQuestion?.length - 1 &&
//           <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
//             <Button>End Interview</Button>
//           </Link>}
//       </div>
//     </div>
//   )
// }

// export default StartInterview


"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview(params) {

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [mockInterviewOptions, setMockInterviewOptions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);

    // Extract options for each question if available
    const optionsArray = jsonMockResp.map((question) => question.options || []);

    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setMockInterviewOptions(optionsArray);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Question Section */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          mockInterviewOptions={mockInterviewOptions}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex > 0 &&
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
        {activeQuestionIndex !== mockInterviewQuestion.length - 1 &&
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
        {activeQuestionIndex === mockInterviewQuestion.length - 1 &&
          <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
            <Button>End Interview</Button>
          </Link>}
      </div>
    </div>
  );
}

export default StartInterview;
