// "use client"
// import React, { useState } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Label } from "@/components/ui/label"
// import { chatSession } from '@/utils/GeminiAiModel'
// import { LoaderCircle } from 'lucide-react'
// import { MockInterview } from '@/utils/schema'
// import { v4 as uuidv4 } from 'uuid'
// import { useUser } from '@clerk/nextjs'
// import moment from 'moment/moment'
// import { db } from '@/utils/db'
// import { useRouter } from 'next/navigation'

// function AddNewInterview() {
//   const [openDailog, setOpenDialog] = useState(false)
//   const [jobPosition, setJobPosition] = useState();
//   const [jobDesc, setJobDesc] = useState();
//   const [jobExperience, setjobExperience] = useState();
//   const [jobResume, setjobResume] = useState();
//   const [loading, setLoading] = useState(false);
//   const [jsonResponse, setJsonResponse] = useState([]);
//   const { user } = useUser();
//   const router = useRouter();
//   const onSubmit = async (e) => {
//     setLoading(true)
//     e.preventDefault();
//     console.log(jobPosition, jobDesc, jobExperience, jobResume);

//     const InputPrompt = "Job position:" + jobPosition + ", Job Description:" + jobDesc + ", Years of Experience: " + jobExperience + ",Depends on job position, Job Description, Years of Experience" + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " interview question along with Answers in JSON format. Give us question and answer as field on JSON. Dont give any extra information or explaination"

//     // const InputPrompt = "Job position:" + jobPosition + ", Job Description:" + jobDesc + ", Years of Experience: " + jobExperience + ",Depends on job position, Job Description, Years of Experience" + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " interview question along with Answers in JSON format nd Please ensure to give atleast 3 MCQ questions along with options & if coding related field is there then atleast 2 question on output based code question with options. Give us question and answer as field on JSON. Dont give any extra information or explaination"
//     a

//     const result = await chatSession.sendMessage(InputPrompt);
//     console.log(result);
//     const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
//     // const MockJsonResp = (result.response.text()).replace(/```json/g, '').replace(/```/g, '')
//     //   .trim();
//     console.log(JSON.parse(MockJsonResp));
//     // console.log(result.response.text());

//     setJsonResponse(MockJsonResp);

//     if (MockJsonResp) {

//       const resp = await db.insert(MockInterview).values({
//         mockId: uuidv4(),
//         jsonMockResp: MockJsonResp,
//         jobPosition: jobPosition,
//         jobDesc: jobDesc,
//         jobExperience: jobExperience,
//         jobResume: jobResume,
//         createdBy: user?.primaryEmailAddress?.emailAddress,
//         createdAt: moment().format('DD-MM-YYYY'),
//       }).returning({ mockId: MockInterview.mockId })
//       console.log("Inserted Id:", resp);
//       if (resp) {
//         setOpenDialog(false);
//         router.push('/dashboard/interview/' + resp[0]?.mockId)
//       }
//     }
//     else {
//       console.log("ERROR");
//     }
//     setLoading(false);
//   }
//   return (
//     <div>
//       <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
//         <h2 className='text-lg text-center'>+ Add New</h2>
//       </div>
//       <Dialog open={openDailog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className='text-2xl'>Tell to VirtuHire more about your job Interviwing</DialogTitle>
//             <DialogDescription>
//               <form onSubmit={onSubmit}>
//                 <div>
//                   <h2>Add Details about your job role/position, Job Description, years of Experience and Resume</h2>
//                   <div className='mt-7 my-3'>
//                     <label>Job Role/Job Position</label>
//                     <Input placeholder="Ex. Full Stack Developer" required onChange={(event) => setJobPosition(event.target.value)} />
//                   </div>
//                   <div className='mt-7 my-3'>
//                     <label>Job Description/ Tech Stack (In Short)</label>
//                     <Textarea placeholder="Ex. React, Next Js, Angular Js, Java Full Stack etc." required onChange={(event) => setJobDesc(event.target.value)} />
//                   </div>
//                   <div className='mt-7 my-3'>
//                     <label>Years of Experience</label>
//                     <Input placeholder="2" type="number" max="100" required onChange={(event) => setjobExperience(event.target.value)} />
//                   </div>
//                   <div className="mt-7 my-3">
//                     <Label htmlFor="picture">Upload Your Resume</Label>
//                     <Input id="picture" type="file" onChange={(event) => setjobResume(event.target.value)} />
//                   </div>
//                 </div>
//                 <div className='flex gap-5 justify-end'>
//                   <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
//                   <Button type="submit" disabled={loading}>
//                     {loading ?
//                       <>
//                         <LoaderCircle className='animate-spin' />'Generating From AI-VirtuHire'</>
//                       : 'Start Interview'}
//                   </Button>
//                 </div>
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//     </div>
//   )
// }

// export default AddNewInterview



"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";
import { chatSession } from '@/utils/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [jobResume, setJobResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}.Depends on job position, Job Description, Years of Experience Please generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT},interview question with 1 aptitude related and 1 coding related question with 4 options in Same line without any extra line space along with Answers in JSON format.Give us question and answer as field on JSON. Dont give any extra information or explaination.Generate in this format eg.: [  {    "question": "Explain the difference between a list and a tuple in Python.  ***<Options> a)  b)  c)  d) *** (This options is only for Aptitude and output based question)",    "answer": "Lists are mutable, meaning they can be modified after creation. Tuples are immutable, meaning they cannot be changed after creation."  }]`;


    const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}.Depends on job position, Job Description, Years of Experience Please generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT},interview question with 2 aptitude related and 1 coding related question with 4 options(only for output based question) in Same line without any extra line space along with Answers in JSON format.Give us question and answer as field on JSON. Dont give any extra information or explaination.Generate in this format eg.: [  {    "question": "Explain the difference between a list and a tuple in Python.",  "answer": "Lists are mutable, meaning they can be modified after creation. Tuples are immutable, meaning they cannot be changed after creation."  }] and for aptitude,coding and coding output based question(coding question is only for developer related field/job and for other field/job generate logical based question) is in this format: [{"question": "You have 100 coins laying flat on a table, each with a head side and a tail side. 10 of them are heads up. You can't see or feel the coins, but you can flip them over one at a time. How many flips do you need to guarantee that all coins are heads up?","options": ["10", "50", "90", "100"],"answer": "90"}] (this is sample question generate different question in this format)`;

    const result = await chatSession.sendMessage(InputPrompt);
    console.log(result);
    const MockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '');

    if (MockJsonResp) {
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition,
        jobDesc,
        jobExperience,
        jobResume,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY'),
      }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + resp[0]?.mockId);
      }
    } else {
      console.log("Error occurred while generating interview.");
    }
    setLoading(false);
  };

  // >>Demo Start
  const handleDivClick = () => {
    router.push('/dashboard/resume'); // Adjust this path to match your ATS page's route
  };

  // >>Demo End

  return (
    <div>
      {/* Add New Button */}
      {/* <div
        className="p-10 border rounded-lg bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center font-semibold">Start New Interview by One Click</h2>
        <p className="mt-2 text-center text-sm">Create questions based on job roles, experience, and more!</p>
      </div>

      <div
        className="p-10 border rounded-lg bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center font-semibold">Start New Interview by One Click</h2>
        <p className="mt-2 text-center text-sm">Create questions based on job roles, experience, and more!</p>
      </div> */}

      {/* ///Demo Start */}
      <div className="flex gap-4">
        <div
          className="flex-1 min-w-[350px] p-10 border rounded-lg bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
          onClick={() => setOpenDialog(true)} // Assuming this opens a dialog
        >
          <h2 className="text-lg text-center font-semibold">Start New Interview by One Click</h2>
          <p className="mt-2 text-center text-sm">Create questions based on job roles, experience, and more!</p>
        </div>

        <div
          className="flex-1 min-w-[350px] p-10 border rounded-lg bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 text-white hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg ml-20"
          onClick={handleDivClick} // Navigate to the ATS page on click
        >
          <h2 className="text-lg text-center font-semibold">Check Your ATS Resume Score</h2>
          <p className="mt-2 text-center text-sm">Generate resume Matching percentage instantly!</p>
        </div>
      </div>

      {/* ///Demo End */}


      {/* Dialog for Form */}
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-700">Tell VirtuHire about your Job Interviewing</DialogTitle>
            <DialogDescription className="mt-3 text-gray-500">
              <form onSubmit={onSubmit}>
                {/* Job Role Input */}
                <div className="mb-6">
                  <Label className="block text-sm font-medium text-gray-700">Job Role/Position</Label>
                  <Input
                    placeholder="e.g., Full Stack Developer"
                    required
                    className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    onChange={(event) => setJobPosition(event.target.value)}
                  />
                </div>

                {/* Job Description Input */}
                <div className="mb-6">
                  <Label className="block text-sm font-medium text-gray-700">Job Description/Tech Stack</Label>
                  <Textarea
                    placeholder="e.g., React, Next.js, Angular, etc."
                    required
                    className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    onChange={(event) => setJobDesc(event.target.value)}
                  />
                </div>

                {/* Years of Experience Input */}
                <div className="mb-6">
                  <Label className="block text-sm font-medium text-gray-700">Years of Experience</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 2"
                    required
                    className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    onChange={(event) => setJobExperience(event.target.value)}
                  />
                </div>

                {/* Resume Upload Input */}
                <div className="mb-6">
                  <Label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700">
                    Upload Your Resume
                  </Label>
                  <Input
                    type="file"
                    id="resume-upload"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
                    onChange={(event) => setJobResume(event.target.value)}
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)} className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <LoaderCircle className="animate-spin mr-2" />
                        Generating Interview...
                      </span>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;




