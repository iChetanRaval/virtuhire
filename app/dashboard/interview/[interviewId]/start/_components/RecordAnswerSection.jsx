// "use client"
// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import Webcam from 'react-webcam'
// import useSpeechToText from 'react-hook-speech-to-text'
// import { Mic } from 'lucide-react'
// import { toast } from 'sonner'
// import { chatSession } from '@/utils/GeminiAiModel'
// import { useUser } from '@clerk/nextjs'
// import moment from 'moment/moment'
// import { UserAnswer } from '@/utils/schema'
// import { db } from '@/utils/db'
// // import { typedAnswer } from './QuestionsSection.jsx'


// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const [userAnswer, setUserAnswer] = useState('');
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false
//   });

//   useEffect(() => {
//     results.map((result) => (
//       setUserAnswer(prevAns => prevAns + result?.transcript)
//       //Demo
//       // setUserAnswer(prevAns => prevAns + typedAnswer + result?.transcript)
//     ))
//   }, [results])

//   useEffect(() => {

//     if (!isRecording && userAnswer.length > 10) {
//       UpdateUserAnswer();
//     }

//   }, [userAnswer])
//   //Demo
//   // useEffect(() => {

//   //   if (!typedAnswer && isRecording) {
//   //     UpdateUserAnswer();
//   //   }

//   // }, [typedAnswer])

//   // const StartStopRecording = async () => {
//   //   if (isRecording) {
//   //     setLoading(true);
//   //     stopSpeechToText()
//   //     // if (userAnswer?.length < 10) {
//   //     //   setLoading(false);
//   //     //   toast("Error while saving your answer, Please record again");
//   //     //   return;
//   //     // }
//   //   }
//   //   else {
//   //     startSpeechToText()
//   //   }
//   // }

//   const StartStopRecording = async () => {
//     if (isRecording) {
//       setLoading(true);
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//   };

//   const UpdateUserAnswer = async () => {

//     console.log(userAnswer)
//     setLoading(true);
//     const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestionIndex]?.question + ", User Answer:" + userAnswer + ",Depends on question and user answer for given interview question " + " please give us rating for answer and feedback as area of improvement if any " + "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field ";

//     //Demo 
//     // const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestionIndex]?.question + ", User Answer:" + userAnswer + " " + typedAnswer + ",Depends on question and user answer for given interview question " + " please give us rating for answer and feedback as area of improvement if any " + "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field ";

//     const result = await chatSession.sendMessage(feedbackPrompt);

//     const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
//     console.log(mockJsonResp);

//     const JsonFeedbackResp = JSON.parse(mockJsonResp);

//     const resp = await db.insert(UserAnswer).values({
//       mockIdRef: interviewData?.mockId,
//       question: mockInterviewQuestion[activeQuestionIndex]?.question,
//       correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//       userAns: userAnswer,
//       feedback: JsonFeedbackResp?.feedback,
//       rating: JsonFeedbackResp?.rating,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//       createdAt: moment().format('DD-MM-YYYY')
//     })

//     if (resp) {
//       toast("User Answer recorded successfully")
//       setUserAnswer('');
//       setResults([]);
//     }

//     setResults([]);

//     setLoading(false);

//   }

//   return (
//     <div className='flex items-center justify-center flex-col'>
//       <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
//         <Image src={'/interviewer.png'} width={200} height={200}
//           className='absolute' />
//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: '100%',
//             zIndex: 10,
//           }}
//         />

//       </div>
//       {/* <Button
//         disabled={loading}
//         variant="outline" className="my-10"
//         onClick={StartStopRecording}
//       >
//         {isRecording ?
//           <h2 className='text-red-600 flex gap-2'>
//             <Mic />'Stop Recording'
//           </h2>
//           :
//           'Record Answer'}</Button> */}
//       {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}
//       <Button
//         onClick={StartStopRecording}
//         variant="outline"
//         // className='mt-5 bg-primary text-white p-2 rounded-full'
//         className='mt-10'
//       >
//         {/* {isRecording ? 'Stop Recording' : 'Start Recording'} */}
//         {isRecording ?
//           <h2 className='text-red-600 flex gap-2'><Mic></Mic>'Stop Recording'</h2>
//           : 'Start Recording'}

//       </Button>
//     </div>
//   )
// }

// export default RecordAnswerSection



// "use client";
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React, { useEffect, useState, useRef } from 'react';
// import Webcam from 'react-webcam';
// import useSpeechToText from 'react-hook-speech-to-text';
// import { Mic } from 'lucide-react';
// import { toast } from 'sonner';
// import { chatSession } from '@/utils/GeminiAiModel';
// import { useUser } from '@clerk/nextjs';
// import moment from 'moment/moment';
// import { UserAnswer } from '@/utils/schema';
// import { db } from '@/utils/db';

// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const [userAnswer, setUserAnswer] = useState('');
//   const [typedAnswer, setTypedAnswer] = useState('');
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [recordingStarted, setRecordingStarted] = useState(false);
//   const isSpeaking = useRef(false); // Track if question is currently being spoken

//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   const speakQuestion = (text) => {
//     if ('speechSynthesis' in window && !isSpeaking.current) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       isSpeaking.current = true; // Mark that speaking has started

//       utterance.onend = () => {
//         isSpeaking.current = false; // Reset speaking status once done
//       };

//       window.speechSynthesis.speak(utterance);
//     } else if (!('speechSynthesis' in window)) {
//       toast.error('Text-to-speech is not supported in your browser.');
//     }
//   };

//   useEffect(() => {
//     if (mockInterviewQuestion && mockInterviewQuestion.length > 0) {
//       const currentQuestion = mockInterviewQuestion[activeQuestionIndex]?.question;
//       if (currentQuestion) {
//         speakQuestion(currentQuestion);
//       }
//     }
//   }, [activeQuestionIndex, mockInterviewQuestion]);

//   useEffect(() => {
//     if (results.length > 0) {
//       const newText = results.map(result => result.transcript).join(' ');
//       setUserAnswer((prev) => prev + ' ' + newText);
//       setResults([]); // Clear results to prevent repeated entries
//     }
//   }, [results]);

//   const StartStopRecording = () => {
//     if (isRecording || recordingStarted) {
//       setLoading(true);
//       stopSpeechToText();
//       setRecordingStarted(false);
//       UpdateUserAnswer(); // Save the answer when recording is stopped
//     } else if (!isRecording && !loading && !recordingStarted) {
//       setUserAnswer(''); // Clear previous answer if starting fresh
//       startSpeechToText();
//       setRecordingStarted(true);
//     }
//   };

//   const UpdateUserAnswer = async () => {
//     setLoading(true);
//     const fullAnswer = `${userAnswer} ${typedAnswer}`.trim();

//     const feedbackPrompt = `
//       Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
//       User Answer: ${fullAnswer}, Depends on question and user answer for given interview question.
//       Please give us a rating (out of 10) for the answer and feedback in just 3 to 5 lines as area of improvement if any in JSON format with fields 'rating' and 'feedback'.
//     `;

//     try {
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
//       const JsonFeedbackResp = JSON.parse(mockJsonResp);

//       await db.insert(UserAnswer).values({
//         mockIdRef: interviewData?.mockId,
//         question: mockInterviewQuestion[activeQuestionIndex]?.question,
//         correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//         userAns: fullAnswer,
//         feedback: JsonFeedbackResp?.feedback,
//         rating: JsonFeedbackResp?.rating,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//         createdAt: moment().format('DD-MM-YYYY'),
//       });

//       toast("User Answer recorded successfully");
//       setUserAnswer(''); // Clear answer after saving
//       setTypedAnswer('');
//       setResults([]);
//     } catch (error) {
//       toast.error("Failed to save the answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
//         <Image
//           src={'/interviewer.png'}
//           width={200}
//           height={200}
//           className="absolute"
//         />
//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: '100%',
//             zIndex: 10,
//           }}
//         />
//       </div>

//       {/* Start/Stop Recording Button */}
//       <Button
//         onClick={StartStopRecording}
//         variant="outline"
//         className="mt-10"
//       >
//         {isRecording ? (
//           <h2 className="text-red-600 flex gap-2">
//             <Mic /> Stop Recording
//           </h2>
//         ) : (
//           'Start Recording'
//         )}
//       </Button>

//       {/* Typed Answer Textarea with Submit Button */}
//       <div className="mt-6 w-full max-w-lg">
//         <label className="block mb-2 text-sm font-medium text-gray-700">
//           Type Your Answer Only for MCQ or Coding Question:
//         </label>
//         <textarea
//           className="w-full border rounded-md p-2 text-gray-700"
//           rows="4"
//           placeholder="Type your answer here..."
//           value={typedAnswer}
//           onChange={(e) => setTypedAnswer(e.target.value)}
//         />
//         <Button
//           onClick={UpdateUserAnswer}
//           variant="outline"
//           className="mt-2"
//           disabled={loading || typedAnswer.trim() === ''}
//         >
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default RecordAnswerSection;



"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAiModel';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { UserAnswer } from '@/utils/schema';
import { db } from '@/utils/db';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [recordingStarted, setRecordingStarted] = useState(false);
  const isSpeaking = useRef(false); // Track if question is currently being spoken

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const speakQuestion = (text) => {
    if ('speechSynthesis' in window && !isSpeaking.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      isSpeaking.current = true;

      utterance.onend = () => {
        isSpeaking.current = false;
      };

      window.speechSynthesis.speak(utterance);
    } else if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported in your browser.');
    }
  };

  useEffect(() => {
    if (mockInterviewQuestion && mockInterviewQuestion.length > 0) {
      const currentQuestion = mockInterviewQuestion[activeQuestionIndex]?.question;
      if (currentQuestion) {
        speakQuestion(currentQuestion);
      }
    }
  }, [activeQuestionIndex, mockInterviewQuestion]);

  useEffect(() => {
    console.log("Speech-to-text results:", results);
    if (results.length > 0) {
      const newText = results.map(result => result.transcript).join(' ');
      setUserAnswer((prev) => prev + ' ' + newText);
      setResults([]);
    }
  }, [results]);

  const StartStopRecording = () => {
    if (isRecording || recordingStarted) {
      setLoading(true);
      stopSpeechToText();
      setRecordingStarted(false);
      UpdateUserAnswer();
    } else if (!isRecording && !loading && !recordingStarted) {
      setUserAnswer('');
      startSpeechToText();
      setRecordingStarted(true);
    }
  };

  const videoFile = "/Avtar_Video.mp4";

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const fullAnswer = `${userAnswer} ${typedAnswer}`.trim();

    const feedbackPrompt = `
      Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
      User Answer: ${fullAnswer}, Depends on question and user answer for given interview question.
      Please give us a rating (out of 10) for the answer and feedback in just 3 to 5 lines as area of improvement if any in JSON format with fields 'rating' and 'feedback'.
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: fullAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY'),
      });

      toast("User Answer recorded successfully");
      setUserAnswer('');
      setTypedAnswer('');
      setResults([]);
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save the answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {/* UI Components */}
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        {/* //         <Image
          src={'/interviewer.png'}
          width={200}
          height={200}
          className="absolute"
        /> */}
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
            opacity: 0,
            position: 'absolute',
          }}
        />
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
      <Button
        onClick={StartStopRecording}
        variant="outline"
        className="mt-10"
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          'Start Recording'
        )}
      </Button>

      <div className="mt-6 w-full max-w-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Type Your Answer Only for MCQ or Coding Question:
        </label>
        <textarea
          className="w-full border rounded-md p-2 text-gray-700"
          rows="4"
          placeholder="Type your answer here..."
          value={typedAnswer}
          onChange={(e) => setTypedAnswer(e.target.value)}
        />
        <Button
          onClick={UpdateUserAnswer}
          variant="outline"
          className="mt-2"
          disabled={loading || typedAnswer.trim() === ''}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;




// //***** 3 *******
// "use client";
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import Webcam from 'react-webcam';
// import useSpeechToText from 'react-hook-speech-to-text';
// import { Mic } from 'lucide-react';
// import { toast } from 'sonner';
// import { chatSession } from '@/utils/GeminiAiModel';
// import { useUser } from '@clerk/nextjs';
// import moment from 'moment/moment';
// import { UserAnswer } from '@/utils/schema';
// import { db } from '@/utils/db';

// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const [userAnswer, setUserAnswer] = useState('');
//   const [typedAnswer, setTypedAnswer] = useState('');
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);

//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false
//   });

//   // Auto-submit if the user stops recording or if the answer length is long enough
//   useEffect(() => {
//     if (!isRecording && userAnswer.length > 10) {
//       UpdateUserAnswer();
//     }
//   }, [userAnswer]);

//   // Function to play the question using Text-to-Speech
//   const textToSpeech = (text) => {
//     if ('speechSynthesis' in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(speech);
//     } else {
//       alert('Sorry, Your browser does not support text to speech');
//     }
//   };

//   // Auto-play the question when loaded for the first time
//   useEffect(() => {
//     if (mockInterviewQuestion && mockInterviewQuestion.length > 0) {
//       if (activeQuestionIndex >= 0 && activeQuestionIndex < mockInterviewQuestion.length) {
//         textToSpeech(mockInterviewQuestion[activeQuestionIndex].question);
//       }
//     }
//   }, [activeQuestionIndex]);

//   // Start/Stop Recording
//   const StartStopRecording = () => {
//     if (isRecording) {
//       setLoading(true);
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//   };

//   // Function to handle form submission and save the user's answer
//   const UpdateUserAnswer = async () => {
//     setLoading(true);

//     // Combine spoken and typed answers
//     const fullAnswer = `${userAnswer} ${typedAnswer}`;

//     const feedbackPrompt = `
//       Question: ${mockInterviewQuestion[activeQuestionIndex]?.question},
//       User Answer: ${fullAnswer}.
//       Please give us a rating for the answer and feedback in JSON format with fields 'rating' and 'feedback'.
//     `;

//     const result = await chatSession.sendMessage(feedbackPrompt);
//     const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
//     const JsonFeedbackResp = JSON.parse(mockJsonResp);

//     const resp = await db.insert(UserAnswer).values({
//       mockIdRef: interviewData?.mockId,
//       question: mockInterviewQuestion[activeQuestionIndex]?.question,
//       correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//       userAns: fullAnswer,
//       feedback: JsonFeedbackResp?.feedback,
//       rating: JsonFeedbackResp?.rating,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//       createdAt: moment().format('DD-MM-YYYY'),
//     });

//     if (resp) {
//       toast("User Answer recorded successfully");
//       setUserAnswer('');
//       setTypedAnswer('');
//       setResults([]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className='flex items-center justify-center flex-col'>
//       <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
//         <Image
//           src={'/interviewer.png'}
//           width={200}
//           height={200}
//           className='absolute'
//         />
//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: '100%',
//             zIndex: 10,
//           }}
//         />
//       </div>

//       {/* Start/Stop Recording Button */}
//       <Button
//         onClick={StartStopRecording}
//         variant="outline"
//         className='mt-10'
//       >
//         {isRecording ?
//           <h2 className='text-red-600 flex gap-2'><Mic /> Stop Recording</h2>
//           : 'Start Recording'}
//       </Button>

//       {/* Typed Answer Textarea with Submit Button */}
//       <div className="mt-6 w-full max-w-md">
//         <label className="block mb-2 text-sm font-medium text-gray-700">
//           Or Type Your Answer:
//         </label>
//         <textarea
//           className="w-full h-24 border-2 border-gray-300 rounded-md p-3 text-gray-700"
//           placeholder="Type your answer here..."
//           value={typedAnswer}
//           onChange={(e) => setTypedAnswer(e.target.value)}
//         />
//         <Button
//           onClick={UpdateUserAnswer}
//           className="mt-3 w-full"
//           variant="secondary"
//         >
//           Submit Answer
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default RecordAnswerSection;
