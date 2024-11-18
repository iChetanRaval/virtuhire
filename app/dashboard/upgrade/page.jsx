// // import { Box, Button, Divider, Flex, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core'
// // import { useState } from 'react'
// // import Switch from "react-switch"


// // export const upgrade = () => {
// //   const theme = useMantineTheme()
// //   const [monthly, setMonthly] = useState(false)

// //   const handleChange = () => {
// //     setMonthly(!monthly)
// //   }

// //   return (
// //     <>
// //       <Group
// //         sx={{ zIndex: 50 }}
// //       >
// //         <Stack spacing={40} >
// //           {/** header section */}
// //           <Flex
// //             direction='column'
// //             gap={10}
// //             align='center'
// //             justify='start'
// //           >
// //             <Title
// //               order={2}
// //               color={theme.colorScheme === 'dark' ? 'white' : 'hsl(233, 13%, 49%)'}
// //             >Our Pricing</Title>
// //             <Box
// //               sx={{
// //                 fontWeight: 700,
// //                 color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : 'hsl(234, 14%, 74%)',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 gap: 19
// //               }}
// //             >
// //               <Text fz={'sm'}>Annually</Text>
// //               <Switch
// //                 checked={monthly}
// //                 onChange={handleChange}
// //                 checkedIcon={null}
// //                 uncheckedIcon={null}
// //                 boxShadow=''
// //                 activeBoxShadow=''
// //                 width={45}
// //                 height={25}
// //                 onColor={'#7F85E4'}
// //                 offColor={'#7F85E4'}
// //                 handleDiameter={18}
// //               />
// //               <Text fz={'sm'}>Monthly</Text>
// //             </Box>
// //           </Flex>
// //           {/** cards section */}
// //           <Group>
// //             <Flex
// //               align={'center'}
// //               direction={{ base: 'column', sm: 'row' }}
// //               color={'hsl(232, 13%, 33%)'}
// //               gap={{ base: '1.5rem', sm: 0 }}
// //             >
// //               <Box
// //                 sx={{
// //                   boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
// //                   height: '22rem',
// //                   width: '17rem',
// //                   paddingInline: '1.5rem',
// //                   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'white',
// //                   borderRadius: '0.7rem 0 0 0.7rem',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',

// //                   '@media (max-width: 755px)': {
// //                     width: '19rem',
// //                     borderRadius: '0.7rem',
// //                   },
// //                   '@media (min-width: 756px) and (max-width: 820px)': {
// //                     width: '15rem',
// //                     borderRadius: '0.7rem 0 0 0.7rem',
// //                   },
// //                 }}
// //               >
// //                 <Stack w={'100%'} align={'center'} spacing={20}>
// //                   <Text sx={{
// //                     fontWeight: 700,
// //                     color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : 'hsl(233, 13%, 49%)',
// //                   }} fz={'md'}>Basic</Text>
// //                   <Title
// //                     order={2}
// //                     sx={{
// //                       color: theme.colorScheme === 'dark' ? 'white' : 'hsl(232, 13%, 33%)',
// //                       fontSize: 50,
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       gap: 5
// //                     }}
// //                   >
// //                     <Text fz={'2rem'}>$</Text>
// //                     {monthly ? '19.99' : '199.99'}
// //                   </Title>
// //                   <Stack w={'100%'} align='center' spacing={10} sx={{ color: theme.colorScheme === 'light' && 'hsl(233, 13%, 49%)' }}>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
// //                     <Text fz={'sm'} fw={600} >500 GB Storage</Text>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
// //                     <Text fz={'sm'} fw={600} >2 Users Allowed</Text>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
// //                     <Text fz={'sm'} fw={600} >Send up to 3 GB</Text>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
// //                   </Stack>
// //                   <Button
// //                     variant='gradient'
// //                     gradient={{ from: 'hsl(236, 72%, 79%)', to: 'hsl(237, 63%, 64%)' }}
// //                     w='100%'
// //                   >
// //                     LEARN MORE
// //                   </Button>
// //                 </Stack>
// //               </Box>
// //               <Box
// //                 sx={{
// //                   boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
// //                   height: '25rem',
// //                   width: '19rem',
// //                   paddingInline: '1.5rem',
// //                   background: 'linear-gradient(to bottom right, hsl(236, 72%, 79%), hsl(237, 63%, 64%))',
// //                   color: 'white',
// //                   borderRadius: '0.7rem',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',

// //                   '@media (min-width: 756px) and (max-width: 820px)': {
// //                     width: '15rem',
// //                     borderRadius: '0.7rem',
// //                   },
// //                 }}
// //               >
// //                 <Stack w={'100%'} align={'center'} spacing={20}>
// //                   <Text sx={{
// //                     fontWeight: 700,
// //                   }} fz={'md'}>Professional</Text>
// //                   <Title
// //                     order={2}
// //                     sx={{
// //                       fontSize: 50,
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       gap: 5
// //                     }}
// //                   >
// //                     <Text fz={'2rem'}>$</Text>
// //                     {monthly ? '24.99' : '249.99'}
// //                   </Title>
// //                   <Stack w={'100%'} align='center' spacing={10}>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'white', opacity: theme.colorScheme === 'dark' && 0.6 }} />
// //                     <Text fz={'sm'} fw={600}>1 TB Storage</Text>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'white', opacity: theme.colorScheme === 'dark' && 0.6 }} />
// //                     <Text fz={'sm'} fw={600}>5 Users Allowed</Text>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'white', opacity: theme.colorScheme === 'dark' && 0.6 }} />
// //                     <Text fz={'sm'} fw={600}>Send up to 10 GB</Text>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'white', opacity: theme.colorScheme === 'dark' && 0.6 }} />
// //                   </Stack>
// //                   <Button
// //                     sx={{
// //                       backgroundColor: 'white',
// //                       color: 'hsl(237, 63%, 64%)',

// //                       '&:hover': {
// //                         backgroundColor: 'white',
// //                         opacity: 0.95
// //                       }
// //                     }}
// //                     w='100%'
// //                   >
// //                     LEARN MORE
// //                   </Button>
// //                 </Stack>
// //               </Box><Box
// //                 sx={{
// //                   boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
// //                   height: '22rem',
// //                   width: '18rem',
// //                   paddingInline: '1.5rem',
// //                   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'white',
// //                   borderRadius: '0 0.7rem 0.7rem 0',
// //                   display: 'flex',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',

// //                   '@media (max-width: 755px)': {
// //                     width: '19rem',
// //                     borderRadius: '0.7rem',
// //                   },
// //                   '@media (min-width: 756px) and (max-width: 820px)': {
// //                     width: '15rem',
// //                     borderRadius: '0 0.7rem 0.7rem 0',
// //                   },
// //                 }}
// //               >
// //                 <Stack w={'100%'} align={'center'} spacing={20}>
// //                   <Text sx={{
// //                     fontWeight: 700,
// //                     color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : 'hsl(233, 13%, 49%)',
// //                   }} fz={'md'}>Master</Text>
// //                   <Title
// //                     order={2}
// //                     sx={{
// //                       color: theme.colorScheme === 'dark' ? 'white' : 'hsl(232, 13%, 33%)',
// //                       fontSize: 50,
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       gap: 5
// //                     }}
// //                   >
// //                     <Text fz={'2rem'}>$</Text>
// //                     {monthly ? '39.99' : '399.99'}
// //                   </Title>
// //                   <Stack w={'100%'} align='center' spacing={10} sx={{ color: theme.colorScheme === 'light' && 'hsl(233, 13%, 49%)' }}>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
// //                     <Text fz={'sm'} fw={600} >2 TB Storage</Text>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
// //                     <Text fz={'sm'} fw={600} >10 Users Allowed</Text>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
// //                     <Text fz={'sm'} fw={600} >Send up to 20 GB</Text>
// //                     <Divider sx={{ width: '100%', borderColor: theme.colorScheme === 'dark' && 'gray', opacity: theme.colorScheme === 'dark' && 0.7 }} />
// //                   </Stack>
// //                   <Button
// //                     variant='gradient'
// //                     gradient={{ from: 'hsl(236, 72%, 79%)', to: 'hsl(237, 63%, 64%)' }}
// //                     w='100%'
// //                   >
// //                     LEARN MORE
// //                   </Button>
// //                 </Stack>

// //               </Box>
// //             </Flex>
// //           </Group>
// //         </Stack>
// //       </Group>
// //     </>
// //   )
// // }

// import React from "react";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import { motion } from "framer-motion";

// function upgrade() {
//   const plans = [
//     {
//       name: "Free",
//       price: "$0",
//       features: {
//         websites: 1,
//         storage: "500 MB",
//         database: "Limited",
//         bandwidth: "Unmetered",
//         ssd: "100 MB",
//         vcpus: 1,
//         wordpress: false,
//         speed: "Standard"
//       }
//     },
//     {
//       name: "Team",
//       price: "$29",
//       features: {
//         websites: 5,
//         storage: "10 GB",
//         database: "Unlimited",
//         bandwidth: "Unmetered",
//         ssd: "5 GB",
//         vcpus: 2,
//         wordpress: true,
//         speed: "Fast"
//       }
//     },
//     {
//       name: "Popular",
//       price: "$59",
//       features: {
//         websites: 10,
//         storage: "50 GB",
//         database: "Unlimited",
//         bandwidth: "Unmetered",
//         ssd: "20 GB",
//         vcpus: 4,
//         wordpress: true,
//         speed: "Very Fast"
//       }
//     },
//     {
//       name: "Enterprise",
//       price: "$99",
//       features: {
//         websites: "Unlimited",
//         storage: "100 GB",
//         database: "Unlimited",
//         bandwidth: "Unmetered",
//         ssd: "50 GB",
//         vcpus: 8,
//         wordpress: true,
//         speed: "Ultra Fast"
//       }
//     }
//   ];

//   return (
//     <section className="bg-gradient-to-b from-gray-100 to-white py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
//             Pricing & Plans
//           </h2>
//           <p className="mt-4 text-xl text-gray-600">
//             Compare our plans to find what suits you best
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
//           {plans.map((plan, index) => (
//             <motion.div
//               key={plan.name}
//               className={`rounded-lg shadow-lg overflow-hidden ${plan.name === "Popular" ? "ring-4 ring-indigo-500" : ""}`}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <div className={`px-6 py-8 ${plan.name === "Popular" ? "bg-indigo-500" : "bg-white"}`}>
//                 <h3 className={`text-2xl font-semibold ${plan.name === "Popular" ? "text-white" : "text-gray-900"}`}>
//                   {plan.name}
//                 </h3>
//                 <p className={`mt-4 text-4xl font-extrabold ${plan.name === "Popular" ? "text-white" : "text-gray-900"}`}>
//                   {plan.price}
//                   <span className={`text-base font-medium ${plan.name === "Popular" ? "text-indigo-100" : "text-gray-500"}`}>/month</span>
//                 </p>
//                 <button
//                   className={`mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium ${plan.name === "Popular" ? "text-indigo-600 bg-white hover:bg-gray-50" : "text-white bg-indigo-600 hover:bg-indigo-700"}`}
//                 >
//                   Get Started
//                 </button>
//               </div>
//               <div className="px-6 pt-6 pb-8 bg-white">
//                 <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What's included</h4>
//                 <ul className="mt-6 space-y-4">
//                   {Object.entries(plan.features).map(([feature, value]) => (
//                     <li key={feature} className="flex space-x-3">
//                       {value ? (
//                         <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500" />
//                       ) : (
//                         <FaTimes className="flex-shrink-0 h-5 w-5 text-red-500" />
//                       )}
//                       <span className="text-sm text-gray-700">
//                         {feature.charAt(0).toUpperCase() + feature.slice(1)}: {value === true ? "Yes" : value}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default upgrade


// ............2...............
"use client";
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

function Upgrade() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: {
        interviewsAllowed: "3 mock interview per month",
        feedback: "Basic automated feedback",
        expertInteraction: "❌No expert interaction",
        improvementSessions: "Self-guided tips",
        resumeParsing: "Limited skills parsing",
        questionGeneration: "General questions based on common roles",
      },
    },
    {
      name: "Team",
      price: "99/-Rs",
      features: {
        interviewsAllowed: "7 mock interviews per month",
        feedback: "Automated and expert suggestions",
        expertInteraction: "2 session per month with an expert",
        improvementSessions: "Group sessions once a month",
        resumeParsing: "Advanced skills and project parsing",
        questionGeneration: "Role-specific questions",
      },
    },
    {
      name: "Popular",
      price: "149/-Rs",
      features: {
        interviewsAllowed: "10 mock interviews per month",
        feedback: "Detailed expert-led feedback",
        expertInteraction: "4 one-to-one expert sessions per month",
        improvementSessions: "Weekly improvement sessions",
        resumeParsing: "In-depth parsing including certifications",
        questionGeneration: "Tailored questions for specialized roles",
      },
    },
    {
      name: "Enterprise",
      price: "200/-Rs",
      features: {
        interviewsAllowed: "Unlimited mock interviews",
        feedback: "Expert-driven personalized feedback",
        expertInteraction: "Unlimited expert interaction",
        improvementSessions: "Daily personalized sessions",
        resumeParsing: "Comprehensive parsing with job matching",
        questionGeneration: "Fully customizable questions",
      },
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Pricing & Plans</h2>
          <p className="mt-4 text-xl text-gray-600">Compare our plans to find what suits you best</p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`rounded-lg shadow-lg overflow-hidden ${plan.name === "Popular" ? "ring-4 ring-indigo-500" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`px-6 py-8 ${plan.name === "Popular" ? "bg-indigo-500" : "bg-white"}`}>
                <h3 className={`text-2xl font-semibold ${plan.name === "Popular" ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-4 text-4xl font-extrabold ${plan.name === "Popular" ? "text-white" : "text-gray-900"}`}>
                  {plan.price}
                  <span className={`text-base font-medium ${plan.name === "Popular" ? "text-indigo-100" : "text-gray-500"}`}>/month</span>
                </p>
                <button
                  className={`mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium ${plan.name === "Popular" ? "text-indigo-600 bg-white hover:bg-gray-50" : "text-white bg-indigo-600 hover:bg-indigo-700"}`}
                >
                  Get Started
                </button>
              </div>
              <div className="px-6 pt-6 pb-8 bg-white">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What's included</h4>
                <ul className="mt-6 space-y-4">
                  {Object.entries(plan.features).map(([feature, value]) => (
                    <li key={feature} className="flex space-x-3">
                      {value ? (
                        <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500" />
                      ) : (
                        <FaTimes className="flex-shrink-0 h-5 w-5 text-red-500" />
                      )}
                      <span className="text-sm text-gray-700">
                        {feature.charAt(0).toUpperCase() + feature.slice(1)}: {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Upgrade;
