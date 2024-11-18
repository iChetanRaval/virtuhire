// "use client"

import { Lightbulb, Volume2 } from "lucide-react";

// import { Button } from '@/components/ui/button';
// import { DialogDescription } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';
// import { UserAnswer } from '@/utils/schema';
// import { Dialog } from '@radix-ui/react-dialog';
// import { Lightbulb, Volume2 } from 'lucide-react'
// import React, { useState } from 'react'
// // import RecordAnswerSection from './RecordAnswerSection';


// function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {

//   //Demo start
//   // const [userAnswer, setUserAnswer] = useState('');
//   // const [openDailog, setOpenDialog] = useState(false)
//   // const [typedAnswer, setTypedAnswer] = useState('');  // State for typed answer
//   // const onSubmitTypedAnswer = (e) => {
//   //   e.preventDefault();
//   //   <RecordAnswerSection TextUserAnswer={e} />
//   //   console.log("Typed Answer: ", typedAnswer);  // You can later save this answer in the database

//   //   // Add database logic here to store typedAnswer
//   // };
//   //Demo end

//   // useEffect(() => {
//   //   results.map((result) => (
//   //     setUserAnswer(prevAns => prevAns + result?.transcript)
//   //   ))
//   // }, [results])

//   const onSubmit = async (e) => {
//     setLoading(true)
//     e.preventDefault();
//     console.log(jobPosition, jobDesc, jobExperience, jobResume);
//   }

//   const textToSpeech = (text) => {
//     if ('speechSynthesis' in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(speech);
//     }
//     else {
//       alert('Sorry, Your browser does not support text to speech');
//     }
//   }
//   return mockInterviewQuestion && (
//     <div className='p-5 border rounded-lg my-10'>
//       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
//         {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
//           <h2 key={index} className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer 
//             ${activeQuestionIndex == index && 'bg-primary text-white'}`}>Question #{index + 1}</h2>
//         ))}
//       </div>

//       <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
//       <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} />


//       {/* Typed Answer Section */}
//       {/* <form onSubmit={onSubmitTypedAnswer}>
//         <label className='font-bold text-primary'>Type your answer here:</label>
//         <Textarea
//           className='bg-grey mt-2'
//           placeholder="Type your answer"
//           value={typedAnswer}
//           onChange={(e) => setTypedAnswer(e.target.value)}
//           required
//         />
//         <Button className='mt-5' type='submit'>Submit Answer</Button>
//       </form> */}
//       {/* <RecordAnswerSection TextUserAnswer={typedAnswer} /> */}


//       <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
//         <h2 className='flex gap-2 items-center text-primary'>
//           <Lightbulb></Lightbulb>
//           <strong>Note:</strong>
//         </h2>
//         <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_NOTE}</h2>
//       </div>

//     </div>

//   )
// }

// export default QuestionsSection




// "use client";

// import { Button } from '@/components/ui/button';
// import { DialogDescription } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';
// import { UserAnswer } from '@/utils/schema';
// import { Dialog } from '@radix-ui/react-dialog';
// import { Lightbulb, Volume2 } from 'lucide-react';
// import React, { useState } from 'react';

// function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {

//   const onSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     console.log(jobPosition, jobDesc, jobExperience, jobResume);
//   }

//   const textToSpeech = (text) => {
//     if ('speechSynthesis' in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(speech);
//     }
//     else {
//       alert('Sorry, Your browser does not support text to speech');
//     }
//   }

//   return mockInterviewQuestion && (
//     <div className='p-6 border rounded-xl shadow-lg bg-white my-10 transition-transform hover:scale-105'>
//       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6'>
//         {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
//           <h2
//             key={index}
//             className={`p-3 border-2 rounded-full text-sm md:text-md text-center cursor-pointer transition-colors 
//             ${activeQuestionIndex == index
//                 ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-transparent'
//                 : 'bg-gray-200 hover:bg-gray-300'
//               }`}
//           >
//             Question #{index + 1}
//           </h2>
//         ))}
//       </div>

//       <div className="flex items-center justify-between mb-6">
//         <h2 className='text-lg md:text-xl font-semibold'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
//         <Volume2
//           className='cursor-pointer hover:text-blue-500 transition-colors'
//           onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
//         />
//       </div>

//       {/* Helpful Note Section */}
//       <div className='border rounded-lg p-5 bg-blue-50 mt-12 shadow-inner'>
//         <h2 className='flex gap-2 items-center text-blue-600 font-bold'>
//           <Lightbulb className='text-yellow-500' />
//           Important Note:
//         </h2>
//         <p className='text-sm text-blue-600 mt-2'>{process.env.NEXT_PUBLIC_NOTE}</p>
//       </div>
//     </div>
//   )
// }

// export default QuestionsSection;



///3_____________

function QuestionsSection({ mockInterviewQuestion, mockInterviewOptions, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, Your browser does not support text to speech');
    }
  };

  return mockInterviewQuestion && (
    <div className='p-6 border rounded-xl shadow-lg bg-white my-10 transition-transform hover:scale-105'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6'>
        {mockInterviewQuestion.map((_, index) => (
          <h2
            key={index}
            className={`p-3 border-1 rounded-full text-sm md:text-md text-center cursor-pointer transition-colors 
              ${activeQuestionIndex === index
                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-transparent'
                : 'bg-gray-200 hover:bg-gray-300'
              }`}
          >
            Question No.{index + 1}
          </h2>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className='text-lg md:text-xl font-semibold'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        <Volume2
          className='cursor-pointer hover:text-blue-500 transition-colors'
          onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
        />
      </div>

      {/* Options Section */}
      {mockInterviewOptions[activeQuestionIndex]?.length > 0 && (
        <div className='flex flex-col gap-2 mb-6'>
          <h3 className='text-md font-semibold text-gray-700'>Options:</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {mockInterviewOptions[activeQuestionIndex].map((option, idx) => (
              <button
                key={idx}
                className='p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors'
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Helpful Note Section */}
      <div className='border rounded-lg p-5 bg-blue-50 mt-12 shadow-inner'>
        <h2 className='flex gap-2 items-center text-blue-600 font-bold'>
          <Lightbulb className='text-yellow-500' />
          Important Note:
        </h2>
        <p className='text-sm text-blue-600 mt-2'>{process.env.NEXT_PUBLIC_NOTE}</p>
      </div>
    </div>
  );
}

export default QuestionsSection;
