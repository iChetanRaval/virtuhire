// import { UserButton } from '@clerk/nextjs'
// import React from 'react'
// import AddNewInterview from './_components/AddNewInterview'
// import InterviewList from './_components/InterviewList'

// function Dashboard() {
//   return (
//     <div className='p-10'>

//       <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
//       <h2 className='text-gray-500'>Create and Start your Interview</h2>

//       <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
//         <AddNewInterview />
//       </div>

//       {/* // Previous Interview List */}
//       <InterviewList></InterviewList>

//     </div>

//   )
// }

// export default Dashboard



// import { UserButton } from '@clerk/nextjs';
// import React from 'react';
// import AddNewInterview from './_components/AddNewInterview';
// import InterviewList from './_components/InterviewList';

// function Dashboard({ searchTerm = '' }) { // Default value for searchTerm
//   return (
//     <div className='p-10'>
//       <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
//       <h2 className='text-gray-500'>Create and Start your Interview</h2>

//       <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
//         <AddNewInterview />
//       </div>

//       {/* Pass searchTerm to InterviewList */}
//       <InterviewList searchTerm={searchTerm} />
//     </div>
//   );
// }

// export default Dashboard;



import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';

function Dashboard({ searchTerm }) {  // Accept searchTerm as a prop
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start your Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
      </div>

      {/* Pass searchTerm to InterviewList */}
      <InterviewList searchTerm={searchTerm} />
    </div>
  );
}

export default Dashboard;
