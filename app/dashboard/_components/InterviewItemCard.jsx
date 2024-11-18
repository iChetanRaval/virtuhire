// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// function InterviewItemCard({ interview }) {

//   const router = useRouter();

//   const onStart = () => {

//     router.push('/dashboard/interview/' + interview?.mockId)

//   }

//   const onFeedbackPress = () => {
//     router.push('/dashboard/interview/' + interview?.mockId + '/feedback')
//   }

//   return (
//     <div className='border shadow-sm rounded-lg p-3'>
//       <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
//       <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
//       <h2 className='text-xs text-gray-400'>Created At:{interview.createdAt}</h2>
//       <div className='flex justify-between mt-2 gap-5'>
//         <Button size="sm" variant="outline" className="w-full"
//           onClick={onFeedbackPress}
//         >Feedback</Button>
//         <Button size="sm" className="w-full"
//           onClick={onStart}
//         >Start</Button>

//       </div>

//     </div>
//   )
// }

// export default InterviewItemCard

// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// function InterviewItemCard({ interview }) {
//   const router = useRouter();

//   const onStart = () => {
//     router.push('/dashboard/interview/' + interview?.mockId);
//   };

//   const onFeedbackPress = () => {
//     router.push('/dashboard/interview/' + interview?.mockId + '/feedback');
//   };

//   return (
//     <div className="relative overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 p-5">
//       {/* Decorative elements */}
//       <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-white to-white opacity-50 z-0 pointer-events-none"></div>

//       <div className="relative z-10">
//         <h2 className="font-bold text-xl text-indigo-600">{interview?.jobPosition}</h2>
//         <p className="text-sm text-gray-700 mt-2">{interview?.jobExperience} Years of Experience</p>
//         <p className="text-xs text-gray-500 mt-1">Created At: {new Date(interview?.createdAt).toLocaleDateString()}</p>

//         <div className="flex justify-between mt-4 gap-4">
//           {/* Feedback Button */}
//           <Button
//             size="sm"
//             variant="outline"
//             className="w-full border-indigo-500 text-indigo-500 hover:bg-indigo-50 hover:border-indigo-600"
//             onClick={onFeedbackPress}
//           >
//             Feedback
//           </Button>

//           {/* Start Button */}
//           <Button
//             size="sm"
//             className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
//             onClick={onStart}
//           >
//             Start
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InterviewItemCard;


import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';  // For notification
import { db } from '@/utils/db'; // Assuming db handles deletions

function InterviewItemCard({ interview, onDelete }) {
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push('/dashboard/interview/' + interview?.mockId + '/feedback');
  };

  const onDeletePress = async () => {
    try {
      // Delete from database
      await db.delete().from('MockInterview').where('mockId', interview?.mockId);

      // Notify user and call onDelete to refresh or update state
      toast.success('Interview deleted successfully');
      if (onDelete) onDelete(interview?.mockId);
    } catch (error) {
      console.error('Error deleting interview:', error);
      toast.error('Failed to delete interview');
    }
  };

  return (
    <div className="relative overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 p-5">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-white to-white opacity-50 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="font-bold text-xl text-indigo-600">{interview?.jobPosition}</h2>
        <p className="text-sm text-gray-700 mt-2">{interview?.jobExperience} Years of Experience</p>
        {/* <p className="text-xs text-gray-500 mt-1">Created At: {new Date(interview?.createdAt).toLocaleDateString()}</p> */}
        <p className="text-xs text-gray-500 mt-1">Created At: {interview?.createdAt}</p>

        <div className="flex justify-between mt-4 gap-4">
          {/* Feedback Button */}
          <Button
            size="sm"
            variant="outline"
            className="w-full border-indigo-500 text-indigo-500 hover:bg-indigo-50 hover:border-indigo-600"
            onClick={onFeedbackPress}
          >
            Feedback
          </Button>

          {/* Start Button */}
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
            onClick={onStart}
          >
            Start
          </Button>

          {/* Delete Button */}
          <Button
            size="sm"
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600"
            onClick={onDeletePress}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewItemCard;
