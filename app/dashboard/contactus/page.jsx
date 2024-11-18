// // ContactUs.jsx
// "use client"
// import { Button } from '@/components/ui/button';
// import { Check, CheckCheckIcon, CheckIcon, Mail } from 'lucide-react';
// import React, { useState } from 'react';

// function ContactUs() {

//   const [checked, setCheck] = useState(false);
//   return (
//     <div style={styles.container} className='border shadow-sm rounded-lg p-3 mt-5'>
//       {/* <h2>Contact Us</h2>
//       <p>If you have any questions, feel free to reach out!</p> */}
//       <div className="text-center mb-16">
//         <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Contact Us</h2>
//         <p className="mt-4 text-xl text-gray-600">If you have any question, feel free to reach out!</p>
//       </div>
//       <form style={styles.form}>
//         <input type="text" placeholder="Your Name" required style={styles.input} />
//         <input type="email" placeholder="Your Email" required style={styles.input} />
//         <textarea placeholder="Your Message" required style={styles.textarea}></textarea>
//         {/* <Check onClick={setCheck}></Check> */}
//         <CheckIcon className='flex inline-block'></CheckIcon>
//         <h5 className='text-sm text-gray-600'>By Submitting this form, I acknoleging the Notice of Privacy & policy of AI-VirtuHire</h5>
//         <Button type="submit" style={styles.button} >Send Message</Button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     maxWidth: '400px',
//     margin: '0 auto',
//     marginTop: '20px',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginTop: '2px',
//   },
//   input: {
//     margin: '5px 0',
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   },
//   textarea: {
//     margin: '5px 0',
//     padding: '10px',
//     fontSize: '16px',
//     resize: 'none',
//     height: '100px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   },
//   button: {
//     padding: '10px',
//     fontSize: '16px',
//     cursor: 'pointer',
//   },

// };

// export default ContactUs;

// "use client";
// import { Button } from '@/components/ui/button';
// import { CheckIcon, Mail } from 'lucide-react';
// import React, { useState } from 'react';

// function ContactUs() {
//   const [checked, setChecked] = useState(false);

//   return (
//     <div className="container mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg max-w-6xl">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Left side: Email information */}
//         <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
//           <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Contact Us Via Email</h2>
//           <p className="text-gray-700 mb-6">You can also reach out to us directly via email at:</p>
//           <div className="flex items-center space-x-2">
//             <Mail className="w-6 h-6 text-blue-600" />
//             <a href="mailto:info@virtuHire.com" className="text-blue-600 text-lg font-semibold">info@virtuHire.com</a>
//           </div>
//         </div>

//         {/* Right side: Contact form */}
//         <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Send Us a Message</h2>
//           </div>

//           <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <textarea
//               placeholder="Your Message"
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
//             ></textarea>

//             {/* Privacy Consent */}
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="privacyConsent"
//                 checked={checked}
//                 onChange={() => setChecked(!checked)}
//                 className="h-4 w-4 text-blue-600"
//               />
//               <label htmlFor="privacyConsent" className="text-gray-700 text-sm">
//                 By submitting this form, I acknowledge the Notice of Privacy & Policy of AI-VirtuHire.
//               </label>
//             </div>

//             {/* Submit Button */}
//             <Button type="submit" disabled={!checked} className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200">
//               Send Message
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContactUs;


"use client";
import { useState } from 'react';
import { db } from '@/utils/db'; // Ensure this path is correct for your db import
import { contactUs } from '@/utils/schema'; // Import the contactUs schema
import { Button } from '@/components/ui/button';
import { CheckIcon, Mail } from 'lucide-react';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false); // Loading indicator
  const [success, setSuccess] = useState(null); // For feedback message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checked) {
      alert("Please accept the privacy policy to proceed.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Insert the data into the contactUs table
      await db.insert(contactUs).values({
        name,
        userEmail,
        userMessage,
      });

      // Reset form fields and show success message
      setName('');
      setUserEmail('');
      setUserMessage('');
      setChecked(false);
      setSuccess("Thank you! Your message has been sent.");

    } catch (error) {
      console.error("Error saving data:", error);
      alert("There was an error submitting your message. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="container mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side: Email information */}
        <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Contact Us Via Email</h2>
          <p className="text-gray-700 mb-6">You can also reach out to us directly via email at:</p>
          <div className="flex items-center space-x-2">
            <Mail className="w-6 h-6 text-blue-600" />
            <a href="mailto:virtuhireai@gmail.com" className="text-blue-600 text-lg font-semibold">virtuhireai@gmail.com</a>
          </div>
        </div>

        {/* Right side: Contact form */}
        <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Send Us a Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
            ></textarea>

            {/* Privacy Consent */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="privacyConsent"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="privacyConsent" className="text-gray-700 text-sm">
                By submitting this form, I acknowledge the Notice of Privacy & Policy of AI-VirtuHire.
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={!checked || loading} className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Success Message */}
          {success && (
            <p className="mt-4 text-center text-green-600">{success}</p>
          )}
        </div>
      </div>
    </div>
  );
}
