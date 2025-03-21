// import React from 'react'
// import Dashboard from './page'
// import Header from './_components/Header'
// import Footer from './_components/Footer'

// function DashboardLayout({ children }) {
//   return (

//     <div>
//       <Header />
//       <div className='mx-5 md:mx-20 lg:mx-36'>
//         {children}
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default DashboardLayout


"use client";
import React, { useState } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';

function DashboardLayout({ children }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className='mx-5 md:mx-20 lg:mx-36'>
        {React.cloneElement(children, { searchTerm })}
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;