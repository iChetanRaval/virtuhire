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
//       isSpeaking.current = true;

//       utterance.onend = () => {
//         isSpeaking.current = false;
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
//     console.log("Speech-to-text results:", results);
//     if (results.length > 0) {
//       const newText = results.map(result => result.transcript).join(' ');
//       setUserAnswer((prev) => prev + ' ' + newText);
//       setResults([]);
//     }
//   }, [results]);

//   const StartStopRecording = () => {
//     if (isRecording || recordingStarted) {
//       setLoading(true);
//       stopSpeechToText();
//       setRecordingStarted(false);
//       UpdateUserAnswer();
//     } else if (!isRecording && !loading && !recordingStarted) {
//       setUserAnswer('');
//       startSpeechToText();
//       setRecordingStarted(true);
//     }
//   };

//   const videoFile = "/Avtar_Video.mp4";

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
//       setUserAnswer('');
//       setTypedAnswer('');
//       setResults([]);
//     } catch (error) {
//       console.error("Error saving answer:", error);
//       toast.error("Failed to save the answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center flex-col">
//       {/* UI Components */}
//       <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
//         {/* //         <Image
//           src={'/interviewer.png'}
//           width={200}
//           height={200}
//           className="absolute"
//         /> */}
//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: '100%',
//             zIndex: 10,
//             opacity: 0,
//             position: 'absolute',
//           }}
//         />
//         <video
//           src={videoFile}
//           autoPlay
//           loop
//           muted
//           style={{
//             width: '100%',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           }}
//         ></video>
//       </div>
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
//   const isSpeaking = useRef(false);
//   const videoRef = useRef(null);

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
//       isSpeaking.current = true;

//       utterance.onstart = () => {
//         if (videoRef.current) {
//           videoRef.current.play();
//         }
//       };

//       utterance.onend = () => {
//         isSpeaking.current = false;
//         if (videoRef.current) {
//           videoRef.current.pause();
//         }
//       };

//       window.speechSynthesis.speak(utterance);
//     } else {
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
//       setResults([]);
//     }
//   }, [results]);

//   const StartStopRecording = () => {
//     if (isRecording || recordingStarted) {
//       setLoading(true);
//       stopSpeechToText();
//       setRecordingStarted(false);
//       UpdateUserAnswer();
//     } else {
//       setUserAnswer('');
//       startSpeechToText();
//       setRecordingStarted(true);
//     }
//   };

//   const videoFile = "/Avtar_Video.mp4";

//   const UpdateUserAnswer = async () => {
//     setLoading(true);
//     const fullAnswer = `${userAnswer} ${typedAnswer}`.trim();

//     const feedbackPrompt = `
//       Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
//       User Answer: ${fullAnswer}, 
//       Please give a rating (out of 10) and feedback in JSON format with fields 'rating' and 'feedback'.
//     `;

//     try {
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       const mockJsonResp = result.response.text().replace('```json', '').replace('```', '');
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
//       setUserAnswer('');
//       setTypedAnswer('');
//       setResults([]);
//     } catch (error) {
//       console.error("Error saving answer:", error);
//       toast.error("Failed to save the answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: '100%',
//             zIndex: 10,
//             opacity: 0,
//             position: 'absolute',
//           }}
//         />
//         <video
//           ref={videoRef}
//           src={videoFile}
//           muted
//           style={{
//             width: '100%',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           }}
//         ></video>
//       </div>
//       <Button onClick={StartStopRecording} variant="outline" className="mt-10">
//         {isRecording ? (
//           <h2 className="text-red-600 flex gap-2">
//             <Mic /> Stop Recording
//           </h2>
//         ) : (
//           'Start Recording'
//         )}
//       </Button>
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
//         <Button onClick={UpdateUserAnswer} variant="outline" className="mt-2" disabled={loading || typedAnswer.trim() === ''}>
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default RecordAnswerSection;


// ^^^^Main above







// "use client";
// import { Button } from '@/components/ui/button';
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
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const [userAnswer, setUserAnswer] = useState('');
//   const [typedAnswer, setTypedAnswer] = useState('');
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [recordingStarted, setRecordingStarted] = useState(false);
//   const isSpeaking = useRef(false);
//   const mountRef = useRef(null); // Ref for Three.js canvas
//   const avatarRef = useRef(null); // Ref for the avatar
//   const faceMeshRef = useRef(null); // Ref for the face mesh

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

//   // Initialize Three.js scene
//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 600 / 300, 0.1, 1000); // Aspect ratio based on div size
//     const renderer = new THREE.WebGLRenderer({ antialias: true });

//     // Set renderer size to match the div dimensions
//     renderer.setSize(600, 300); // Width: 600px, Height: 300px
//     mountRef.current.appendChild(renderer.domElement);

//     // Add Lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//     directionalLight.position.set(5, 10, 7.5).normalize();
//     scene.add(directionalLight);

//     // Load 3D GLB Model
//     const loader = new GLTFLoader();
//     loader.load(
//       "/adcetbefore2.glb",
//       (gltf) => {
//         const avatar = gltf.scene;

//         // Move avatar further down
//         avatar.position.set(0, -4.5, 0); // Shift avatar down
//         avatar.scale.set(4, 4, 4); // Adjust scale
//         scene.add(avatar);
//         avatarRef.current = avatar;

//         // Adjust Camera Position to be even closer to the avatar
//         camera.position.set(0, 2, 1.8); // Moved camera even closer by reducing the Z value further
//         camera.lookAt(0, 2, 0); // Keep camera focused on avatar's upper body

//         avatar.traverse((child) => {
//           if (child.isMesh && child.morphTargetDictionary) {
//             if (child.name.includes("Head")) {
//               faceMeshRef.current = child;
//             }
//           }
//         });
//       },
//       undefined,
//       (error) => console.error("❌ Error loading GLB file:", error)
//     );



//     // Animation Loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle Window Resize
//     const handleResize = () => {
//       const width = mountRef.current.clientWidth;
//       const height = mountRef.current.clientHeight;
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };
//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   // Speak the current question using the avatar's speech synthesis
//   useEffect(() => {
//     if (mockInterviewQuestion && mockInterviewQuestion.length > 0) {
//       const currentQuestion = mockInterviewQuestion[activeQuestionIndex]?.question;
//       if (currentQuestion) {
//         generateAndPlayAudio(currentQuestion);
//       }
//     }
//   }, [activeQuestionIndex, mockInterviewQuestion]);

//   // Generate and play audio for the avatar
//   const generateAndPlayAudio = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     const voices = speechSynthesis.getVoices();
//     utterance.voice = voices.find((voice) => voice.name === "Alex") || voices[0];
//     utterance.rate = 1.0;

//     // Reset lip movement
//     if (faceMeshRef.current) faceMeshRef.current.morphTargetInfluences.fill(0);

//     // Capture word timings
//     utterance.onboundary = (event) => {
//       if (event.name === "word") {
//         const word = text.substring(event.charIndex, event.charIndex + event.charLength);
//         syncLipMovement(word);
//       }
//     };

//     // Reset lips after speech ends
//     utterance.onend = () => {
//       if (faceMeshRef.current) faceMeshRef.current.morphTargetInfluences.fill(0);
//       console.log("✅ Speech Ended, Resetting Lip Sync");
//     };

//     speechSynthesis.speak(utterance);
//   };

//   // Sync lip movement with speech
//   const syncLipMovement = (word) => {
//     if (!faceMeshRef.current || !faceMeshRef.current.morphTargetDictionary) return;

//     const phonemeToViseme = {
//       "h": "viseme_sil", "l": "viseme_U", "e": "viseme_E", "o": "viseme_O",
//       "t": "viseme_TH", "s": "viseme_SS", "a": "viseme_aa", "m": "viseme_nn",
//       "p": "viseme_PP", "c": "viseme_CH", "n": "viseme_nn", "v": "viseme_FF",
//       "r": "viseme_RR", "d": "viseme_DD", "i": "viseme_I", "u": "viseme_U"
//     };

//     const phonemes = word.toLowerCase().split("");
//     let index = 0;

//     const animatePhonemes = () => {
//       if (index >= phonemes.length) {
//         faceMeshRef.current.morphTargetInfluences.fill(0);
//         return;
//       }

//       const phoneme = phonemes[index];
//       const viseme = phonemeToViseme[phoneme] || "viseme_sil";
//       const morphIndex = faceMeshRef.current.morphTargetDictionary[viseme];

//       if (morphIndex !== undefined) {
//         faceMeshRef.current.morphTargetInfluences.fill(0);
//         faceMeshRef.current.morphTargetInfluences[morphIndex] = 1;
//       }

//       index++;
//       setTimeout(animatePhonemes, 50); // Adjust timing dynamically
//     };

//     animatePhonemes();
//   };

//   const StartStopRecording = () => {
//     if (isRecording || recordingStarted) {
//       setLoading(true);
//       stopSpeechToText();
//       setRecordingStarted(false);
//       UpdateUserAnswer();
//     } else {
//       setUserAnswer('');
//       startSpeechToText();
//       setRecordingStarted(true);
//     }
//   };

//   const UpdateUserAnswer = async () => {
//     setLoading(true);
//     const fullAnswer = `${userAnswer} ${typedAnswer}`.trim();

//     const feedbackPrompt = `
//       Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
//       User Answer: ${fullAnswer}, 
//       Please give a rating (out of 10) and feedback in JSON format with fields 'rating' and 'feedback'.
//     `;

//     try {
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       const mockJsonResp = result.response.text().replace('```json', '').replace('```', '');
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
//       setUserAnswer('');
//       setTypedAnswer('');
//       setResults([]);
//     } catch (error) {
//       console.error("Error saving answer:", error);
//       toast.error("Failed to save the answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: '100%',
//             zIndex: 10,
//             opacity: 0,
//             position: 'absolute',
//           }}
//         />
//         <div
//           ref={mountRef}
//           style={{
//             width: '600px',
//             height: '300px',
//             borderRadius: '10px',
//             overflow: 'hidden',
//           }}
//         />
//       </div>
//       <Button onClick={StartStopRecording} variant="outline" className="mt-10">
//         {isRecording ? (
//           <h2 className="text-red-600 flex gap-2">
//             <Mic /> Stop Recording
//           </h2>
//         ) : (
//           'Start Recording'
//         )}
//       </Button>
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
//         <Button onClick={UpdateUserAnswer} variant="outline" className="mt-2" disabled={loading || typedAnswer.trim() === ''}>
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default RecordAnswerSection;













// Main with GLB version above ^^





"use client";
import { Button } from '@/components/ui/button';
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
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [transcribedText, setTranscribedText] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [recordingStarted, setRecordingStarted] = useState(false);
  const isSpeaking = useRef(false);
  const mountRef = useRef(null);
  const avatarRef = useRef(null);
  const faceMeshRef = useRef(null);

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

  // Process speech-to-text results
  useEffect(() => {
    if (results.length > 0) {
      const newText = results.map(result => result.transcript).join(' ');
      setTranscribedText(prev => prev ? `${prev} ${newText}` : newText);
    }
  }, [results]);

  // Initialize Three.js scene
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 600 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(600, 300);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7.5).normalize();
    scene.add(directionalLight);

    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load(
      "/adcetbefore2.glb",
      (gltf) => {
        const avatar = gltf.scene;
        avatar.position.set(0, -4.5, 0);
        avatar.scale.set(4, 4, 4);
        scene.add(avatar);
        avatarRef.current = avatar;

        camera.position.set(0, 2, 1.8);
        camera.lookAt(0, 2, 0);

        avatar.traverse((child) => {
          if (child.isMesh && child.morphTargetDictionary) {
            if (child.name.includes("Head")) {
              faceMeshRef.current = child;
            }
          }
        });
      },
      undefined,
      (error) => console.error("Error loading GLB file:", error)
    );

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Speak question when it changes
  useEffect(() => {
    if (mockInterviewQuestion?.length > 0) {
      const currentQuestion = mockInterviewQuestion[activeQuestionIndex]?.question;
      if (currentQuestion) {
        generateAndPlayAudio(currentQuestion);
      }
    }
  }, [activeQuestionIndex, mockInterviewQuestion]);

  const generateAndPlayAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.name === "Alex") || voices[0];
    utterance.rate = 1.0;

    if (faceMeshRef.current) faceMeshRef.current.morphTargetInfluences.fill(0);

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const word = text.substring(event.charIndex, event.charIndex + event.charLength);
        syncLipMovement(word);
      }
    };

    utterance.onend = () => {
      if (faceMeshRef.current) faceMeshRef.current.morphTargetInfluences.fill(0);
    };

    speechSynthesis.speak(utterance);
  };

  const syncLipMovement = (word) => {
    if (!faceMeshRef.current?.morphTargetDictionary) return;

    const phonemeToViseme = {
      "h": "viseme_sil", "l": "viseme_U", "e": "viseme_E", "o": "viseme_O",
      "t": "viseme_TH", "s": "viseme_SS", "a": "viseme_aa", "m": "viseme_nn",
      "p": "viseme_PP", "c": "viseme_CH", "n": "viseme_nn", "v": "viseme_FF",
      "r": "viseme_RR", "d": "viseme_DD", "i": "viseme_I", "u": "viseme_U"
    };

    const phonemes = word.toLowerCase().split("");
    let index = 0;

    const animatePhonemes = () => {
      if (index >= phonemes.length) {
        faceMeshRef.current.morphTargetInfluences.fill(0);
        return;
      }

      const phoneme = phonemes[index];
      const viseme = phonemeToViseme[phoneme] || "viseme_sil";
      const morphIndex = faceMeshRef.current.morphTargetDictionary[viseme];

      if (morphIndex !== undefined) {
        faceMeshRef.current.morphTargetInfluences.fill(0);
        faceMeshRef.current.morphTargetInfluences[morphIndex] = 1;
      }

      index++;
      setTimeout(animatePhonemes, 50);
    };

    animatePhonemes();
  };

  const handleStartStopRecording = async () => {
    if (isRecording) {
      // Stop recording first
      stopSpeechToText();
      setRecordingStarted(false);

      // Wait a brief moment for any final speech processing
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get the current answer (including any interim results)
      const currentAnswer = `${transcribedText}${interimResult ? ' ' + interimResult : ''} ${typedAnswer}`.trim();

      if (currentAnswer) {
        await handleSubmitAnswer(currentAnswer);
      } else {
        toast.warning("No answer was recorded");
      }
    } else {
      // Start new recording
      setTranscribedText('');
      setResults([]);
      startSpeechToText();
      setRecordingStarted(true);
      toast.info("Recording started. Speak your answer.");
    }
  };

  const handleSubmitAnswer = async (answerToSubmit = null) => {
    const fullAnswer = answerToSubmit || `${transcribedText} ${typedAnswer}`.trim();

    if (!fullAnswer) {
      toast.error("Please provide an answer before submitting");
      return;
    }

    setLoading(true);

    try {
      const feedbackPrompt = `
        Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
        User Answer: ${fullAnswer}, 
        Please give a rating (out of 10) and feedback in JSON format with fields 'rating' and 'feedback'.
      `;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = result.response.text();
      const jsonResponse = responseText.replace(/```json|```/g, '');
      const JsonFeedbackResp = JSON.parse(jsonResponse);

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: fullAnswer,
        feedback: JsonFeedbackResp?.feedback || "No feedback available",
        rating: JsonFeedbackResp?.rating || 0,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY'),
      });

      toast.success("Answer saved successfully!");
      setTranscribedText('');
      setTypedAnswer('');
      setResults([]);
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
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
        <div
          ref={mountRef}
          style={{
            width: '600px',
            height: '300px',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        />
      </div>

      <Button
        onClick={handleStartStopRecording}
        variant={isRecording ? "destructive" : "outline"}
        className="mt-10"
        disabled={loading}
      >
        {isRecording ? (
          <span className="flex items-center gap-2">
            <Mic /> Stop Recording
          </span>
        ) : (
          'Start Recording'
        )}
      </Button>

      <div className="mt-6 w-full max-w-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Type Your Answer Here (For MCQ or Coding Questions):
        </label>
        <textarea
          className="w-full border rounded-md p-2 text-gray-700"
          rows="4"
          placeholder="Add or edit your spoken answer here..."
          value={typedAnswer}
          onChange={(e) => setTypedAnswer(e.target.value)}
        />
        <Button
          onClick={() => handleSubmitAnswer()}
          className="mt-2 h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={loading || (!transcribedText.trim() && !typedAnswer.trim())}
        >
          {loading ? 'Processing...' : 'Submit Answer'}
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;













// "use client";
// import { Button } from '@/components/ui/button';
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
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const [userAnswer, setUserAnswer] = useState('');
//   const [typedAnswer, setTypedAnswer] = useState('');
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [recordingStarted, setRecordingStarted] = useState(false);
//   const isSpeaking = useRef(false);
//   const mountRef = useRef(null); // Ref for Three.js canvas
//   const avatarRef = useRef(null); // Ref for the avatar
//   const faceMeshRef = useRef(null); // Ref for the face mesh

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

//   // Initialize Three.js scene
//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 600 / 300, 0.1, 1000); // Aspect ratio based on div size
//     const renderer = new THREE.WebGLRenderer({ antialias: true });

//     // Set renderer size to match the div dimensions
//     renderer.setSize(600, 300); // Width: 600px, Height: 300px
//     mountRef.current.appendChild(renderer.domElement);

//     // Add Lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//     directionalLight.position.set(5, 10, 7.5).normalize();
//     scene.add(directionalLight);

//     // Load 3D GLB Model
//     const loader = new GLTFLoader();
//     loader.load(
//       "/adcetbefore2.glb",
//       (gltf) => {
//         const avatar = gltf.scene;

//         // Move avatar further down
//         avatar.position.set(0, -4.5, 0); // Shift avatar down
//         avatar.scale.set(4, 4, 4); // Adjust scale
//         scene.add(avatar);
//         avatarRef.current = avatar;

//         // Adjust Camera Position to be even closer to the avatar
//         camera.position.set(0, 2, 1.8); // Moved camera even closer by reducing the Z value further
//         camera.lookAt(0, 2, 0); // Keep camera focused on avatar's upper body

//         avatar.traverse((child) => {
//           if (child.isMesh && child.morphTargetDictionary) {
//             if (child.name.includes("Head")) {
//               faceMeshRef.current = child;
//             }
//           }
//         });
//       },
//       undefined,
//       (error) => console.error("❌ Error loading GLB file:", error)
//     );

//     // Animation Loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle Window Resize
//     const handleResize = () => {
//       const width = mountRef.current.clientWidth;
//       const height = mountRef.current.clientHeight;
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };
//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   // Speak the current question using the avatar's speech synthesis
//   useEffect(() => {
//     if (mockInterviewQuestion && mockInterviewQuestion.length > 0) {
//       const currentQuestion = mockInterviewQuestion[activeQuestionIndex]?.question;
//       if (currentQuestion) {
//         generateAndPlayAudio(currentQuestion);
//       }
//     }
//   }, [activeQuestionIndex, mockInterviewQuestion]);

//   // Generate and play audio for the avatar
//   const generateAndPlayAudio = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     const voices = speechSynthesis.getVoices();
//     utterance.voice = voices.find((voice) => voice.name === "Alex") || voices[0];
//     utterance.rate = 1.0;

//     // Reset lip movement
//     if (faceMeshRef.current) faceMeshRef.current.morphTargetInfluences.fill(0);

//     // Capture word timings
//     utterance.onboundary = (event) => {
//       if (event.name === "word") {
//         const word = text.substring(event.charIndex, event.charIndex + event.charLength);
//         syncLipMovement(word);
//       }
//     };

//     // Reset lips after speech ends
//     utterance.onend = () => {
//       if (faceMeshRef.current) faceMeshRef.current.morphTargetInfluences.fill(0);
//       console.log("✅ Speech Ended, Resetting Lip Sync");
//     };

//     speechSynthesis.speak(utterance);
//   };

//   // Sync lip movement with speech
//   const syncLipMovement = (word) => {
//     if (!faceMeshRef.current || !faceMeshRef.current.morphTargetDictionary) return;

//     const phonemeToViseme = {
//       "h": "viseme_sil", "l": "viseme_U", "e": "viseme_E", "o": "viseme_O",
//       "t": "viseme_TH", "s": "viseme_SS", "a": "viseme_aa", "m": "viseme_nn",
//       "p": "viseme_PP", "c": "viseme_CH", "n": "viseme_nn", "v": "viseme_FF",
//       "r": "viseme_RR", "d": "viseme_DD", "i": "viseme_I", "u": "viseme_U"
//     };

//     const phonemes = word.toLowerCase().split("");
//     let index = 0;

//     const animatePhonemes = () => {
//       if (index >= phonemes.length) {
//         faceMeshRef.current.morphTargetInfluences.fill(0);
//         return;
//       }

//       const phoneme = phonemes[index];
//       const viseme = phonemeToViseme[phoneme] || "viseme_sil";
//       const morphIndex = faceMeshRef.current.morphTargetDictionary[viseme];

//       if (morphIndex !== undefined) {
//         faceMeshRef.current.morphTargetInfluences.fill(0);
//         faceMeshRef.current.morphTargetInfluences[morphIndex] = 1;
//       }

//       index++;
//       setTimeout(animatePhonemes, 50); // Adjust timing dynamically
//     };

//     animatePhonemes();
//   };

//   const StartStopRecording = () => {
//     if (isRecording || recordingStarted) {
//       setLoading(true);
//       stopSpeechToText();
//       setRecordingStarted(false);
//       UpdateUserAnswer();
//     } else {
//       setUserAnswer('');
//       startSpeechToText();
//       setRecordingStarted(true);
//     }
//   };

//   const UpdateUserAnswer = async () => {
//     setLoading(true);
//     const fullAnswer = `${userAnswer} ${typedAnswer}`.trim();

//     const feedbackPrompt = `
//        Question: ${mockInterviewQuestion[activeQuestionIndex]?.question},
//        User Answer: ${fullAnswer},
//        Please give a rating (out of 10) and feedback in JSON format with fields 'rating' and 'feedback'.`;

//     try {
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       const mockJsonResp = result.response.text().replace('json', '').replace('', '');
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
//       setUserAnswer('');
//       setTypedAnswer('');
//       setResults([]);
//     } catch (error) {
//       console.error("Error saving answer:", error);
//       toast.error("Failed to save the answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: '100%',
//             zIndex: 10,
//             opacity: 0,
//             position: 'absolute',
//           }}
//         />
//         <div
//           ref={mountRef}
//           style={{
//             width: '600px',
//             height: '300px',
//             borderRadius: '10px',
//             overflow: 'hidden',
//           }}
//         />
//       </div>
//       <Button onClick={StartStopRecording} variant="outline" className="mt-10">
//         {isRecording ? (
//           <h2 className="text-red-600 flex gap-2">
//             <Mic /> Stop Recording
//           </h2>
//         ) : (
//           'Start Recording'
//         )}
//       </Button>
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
//         <Button onClick={UpdateUserAnswer} variant="outline" className="mt-2" disabled={loading || typedAnswer.trim() === ''}>
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default RecordAnswerSection;














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
