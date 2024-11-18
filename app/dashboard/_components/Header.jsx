// "use client"
// import { UserButton } from '@clerk/nextjs';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useEffect } from 'react';


// function Header() {

//   const path = usePathname();
//   useEffect(() => {
//     console.log(path);
//   }, [])

//   return (
//     <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
//       <Image src={'/logo.svg'} width={160} height={100} alt='logo'></Image>
//       <ul className='hidden md:flex gap-6'>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
//         {/* <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li> */}
//         {/* <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>
//           <Link href="/upgrade">Upgrade</Link>
//         </li> */}
//         <Link href="/dashboard/upgrade" className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/upgrade' && 'text-primary font-bold'}`}>
//           Upgrade
//         </Link>

//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-primary font-bold'}`}>How it Works?</li>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/about' && 'text-primary font-bold'}`}>About the VirtuHire</li>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/vid' && 'text-primary font-bold'}`}>Contact Us</li>
//       </ul>
//       <UserButton></UserButton>
//     </div>
//   )
// }

// export default Header

//Main

// "use client";
// import { UserButton } from '@clerk/nextjs';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// function Header() {
//   const path = usePathname();
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     console.log(path);
//   }, [path]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Handle search logic here, e.g., redirect to a search results page
//     console.log("Search term:", searchTerm);
//   };

//   return (
//     <div className='flex p-4 items-center justify-between bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 shadow-md'>
//       <Image src={'/logo.png'} width={110} height={8} alt='logo' />
//       <form onSubmit={handleSearch} className="flex flex-1 mx-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//         <button type="submit" className="ml-2 p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all">
//           Search
//         </button>
//       </form>
//       <ul className='hidden md:flex gap-6'>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
//           <Link href="/dashboard">Dashboard</Link>
//         </li>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-primary font-bold'}`}>
//           <Link href="/dashboard/question">Questions</Link>
//         </li>

//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>
//           <Link href="/dashboard/upgrade">Upgrade</Link>
//         </li>

//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}>
//           <Link href="/dashboard/working">How it Works?</Link>
//         </li>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/about' && 'text-primary font-bold'}`}>
//           <Link href="/dashboard/about">About the VirtuHire</Link>
//         </li>
//         <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/contactus' && 'text-primary font-bold'}`}>
//           <Link href="/dashboard/contactus">Contact Us</Link>
//         </li>
//       </ul>
//       <UserButton />
//     </div>
//   );
// }

// export default Header;


"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Header() {
  const path = usePathname();
  const [showPracticeDropdown, setShowPracticeDropdown] = useState(false);
  const [showCodingDropdown, setShowCodingDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log(path);
  }, [path]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search term:', searchTerm);
  };

  return (
    <div className='flex p-4 items-center justify-between bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 shadow-md'>
      <Image src={'/logo.png'} width={110} height={8} alt='logo' />

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center w-1/3">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="submit"
          className="px-4 py-2 ml-2 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-all"
        >
          Search
        </Button>
      </form>

      <ul className='hidden md:flex gap-6 relative'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        {/* <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/question' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/question">Questions</Link>
        </li> */}

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/upgrade">Upgrade</Link>
        </li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/working' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/working">How it Works?</Link>
        </li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/about' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/about">About VirtuHire</Link>
        </li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/contactus' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/contactus">Contact Us</Link>
        </li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/resume' && 'text-primary font-bold'}`}>
          <Link href="/dashboard/resume">Check Your Resume</Link>
        </li>

        {/* Practice Dropdown */}
        <li
          className="relative"
          onMouseEnter={() => setShowPracticeDropdown(true)}
          onMouseLeave={() => setShowPracticeDropdown(false)}
        >
          <span className={`hover:text-primary hover:font-bold cursor-pointer`}>
            Practice
          </span>
          {showPracticeDropdown && (
            <ul className="absolute left-0 bg-white shadow-lg rounded-md mt-2 z-10">
              <li className="hover:bg-gray-100">
                <Link href="/dashboard/aptitude" className="block px-4 py-2">Aptitude</Link>
              </li>
              <li
                className="hover:bg-gray-100 relative"
                onMouseEnter={() => setShowCodingDropdown(true)}
                onMouseLeave={() => setShowCodingDropdown(false)}
              >
                <span className="block px-4 py-2 cursor-pointer">Coding</span>
                {showCodingDropdown && (
                  <ul className="absolute left-full top-0 bg-white shadow-lg rounded-md mt-2 z-10">
                    <li className="hover:bg-gray-100">
                      <Link href="/practice/coding/dsa" className="block px-4 py-2">DSA</Link>
                    </li>
                    <li className="hover:bg-gray-100">
                      <Link href="/practice/coding/web-development" className="block px-4 py-2">Web Development</Link>
                    </li>
                    <li className="hover:bg-gray-100">
                      <Link href="/practice/coding/android-development" className="block px-4 py-2">Android Development</Link>
                    </li>
                    <li className="hover:bg-gray-100">
                      <Link href="/practice/coding/software-development" className="block px-4 py-2">Software Development</Link>
                    </li>
                    <li className="hover:bg-gray-100">
                      <Link href="/practice/coding/networking" className="block px-4 py-2">Networking</Link>
                    </li>
                    <li className="hover:bg-gray-100">
                      <Link href="/practice/coding/cloud-engineer" className="block px-4 py-2">Cloud Engineer</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="hover:bg-gray-100">
                <Link href="/dashboard/logical-reasoning" className="block px-4 py-2">Logical Reasoning</Link>
              </li>
              <li className="hover:bg-gray-100">
                <Link href="/dashboard/interview-preparation" className="block px-4 py-2">Interview Preparation Communication</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;





// "use client";
// import { UserButton } from '@clerk/nextjs';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { FiMenu, FiX } from 'react-icons/fi'; // Icons for mobile menu

// function Header() {
//   const path = usePathname();
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     console.log(path);
//   }, [path]);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className='flex items-center justify-between p-4 bg-secondary shadow-sm relative'>
//       {/* Logo */}
//       <Image src={'/logo.png'} width={110} height={8} alt='logo' />

//       {/* Desktop Navigation */}
//       <nav className='hidden md:flex gap-6'>
//         <ul className='flex gap-6'>
//           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
//             <Link href="/dashboard">Dashboard</Link>
//           </li>
//           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-primary font-bold'}`}>
//             <Link href="/dashboard/question">Questions</Link>
//           </li>
//           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>
//             <Link href="/dashboard/upgrade">Upgrade</Link>
//           </li>
//           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}>
//             <Link href="/dashboard/working">How it Works?</Link>
//           </li>
//           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/about' && 'text-primary font-bold'}`}>
//             <Link href="/dashboard/about">About VirtuHire</Link>
//           </li>
//           <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/contactus' && 'text-primary font-bold'}`}>
//             <Link href="/dashboard/contactus">Contact Us</Link>
//           </li>
//         </ul>
//       </nav>

//       {/* User Button */}
//       <div className="flex items-center gap-4">
//         <UserButton />
//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden block text-2xl"
//           onClick={toggleMobileMenu}
//         >
//           {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <nav className='absolute top-16 right-0 bg-secondary p-6 rounded-lg shadow-lg z-50 md:hidden'>
//           <ul className='flex flex-col gap-4'>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>
//               <Link href="/dashboard" onClick={toggleMobileMenu}>Dashboard</Link>
//             </li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-primary font-bold'}`}>
//               <Link href="/dashboard/question" onClick={toggleMobileMenu}>Questions</Link>
//             </li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>
//               <Link href="/dashboard/upgrade" onClick={toggleMobileMenu}>Upgrade</Link>
//             </li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}>
//               <Link href="/dashboard/working" onClick={toggleMobileMenu}>How it Works?</Link>
//             </li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/about' && 'text-primary font-bold'}`}>
//               <Link href="/dashboard/about" onClick={toggleMobileMenu}>About VirtuHire</Link>
//             </li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/contactus' && 'text-primary font-bold'}`}>
//               <Link href="/dashboard/contactus" onClick={toggleMobileMenu}>Contact Us</Link>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// }

// export default Header;
