// app/admin/components/ContactUsTable.jsx
// 'use client';
// import { useState, useEffect } from 'react';
// import { db } from '@/utils/db';
// import { contactUs } from '@/utils/schema';

// export default function ContactMessages() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch messages when the component mounts
//   useEffect(() => {
//     async function fetchMessages() {
//       try {
//         const fetchedMessages = await db.select().from(contactUs);
//         setMessages(fetchedMessages); // Update the state with messages
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       } finally {
//         setLoading(false); // Stop loading when done
//       }
//     }
//     fetchMessages();
//   }, []);

//   return (
//     <div className="container mx-auto p-8">
//       <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

//       {/* Loading state */}
//       {loading && <div>Loading...</div>}

//       {/* Display messages or a fallback message */}
//       {!loading && messages && messages.length === 0 && (
//         <div>No messages available</div>
//       )}

//       {/* Table with messages */}
//       {!loading && messages && messages.length > 0 && (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr>
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Message</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {messages.map((message) => (
//               <tr key={message.id} className="hover:bg-blue-100 transition duration-200">
//                 <td className="border p-4">{message.id}</td>
//                 <td className="border p-4">{message.name}</td>
//                 <td className="border p-4">{message.userEmail}</td>
//                 <td className="border p-4">{message.userMessage}</td>
//                 <td className="border p-4">
//                   <button
//                     className="bg-blue-500 text-white p-2 rounded"
//                     onClick={() => {
//                       window.location.href = `mailto:${message.userEmail}?subject=Reply to your message&body=Hi ${message.name},\n\nThank you for reaching out. Here is our response:`;
//                     }}
//                   >
//                     Reply
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import { db } from '@/utils/db';
import { contactUs } from '@/utils/schema';

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailBody, setEmailBody] = useState('');  // To track email body content
  const [selectedMessage, setSelectedMessage] = useState(null);  // To track the selected message for replying

  // Fetch messages when the component mounts
  useEffect(() => {
    async function fetchMessages() {
      try {
        const fetchedMessages = await db.select().from(contactUs);
        setMessages(fetchedMessages); // Update the state with messages
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false); // Stop loading when done
      }
    }
    fetchMessages();
  }, []);

  // Handle message selection and set the default body for the email reply
  const handleReplyClick = (message) => {
    setSelectedMessage(message);  // Set selected message to track which one we are replying to
    const bodyText = `Hi ${message.name},\n\nThank you for reaching out. Here is our response:\n\n`;  // Default reply message
    setEmailBody(bodyText);  // Pre-populate the email body
  };

  // Handle sending the email
  const handleSendEmail = () => {
    if (selectedMessage) {
      const subject = 'Reply to your message';
      const body = encodeURIComponent(emailBody);  // URL encode the body text
      window.location.href = `mailto:${selectedMessage.userEmail}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

      {/* Loading state */}
      {loading && <div>Loading...</div>}

      {/* Display messages or a fallback message */}
      {!loading && messages && messages.length === 0 && (
        <div>No messages available</div>
      )}

      {/* Table with messages */}
      {!loading && messages && messages.length > 0 && (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {messages.map((message) => (
              <tr key={message.id} className="hover:bg-blue-100 transition duration-200">
                <td className="border p-4">{message.id}</td>
                <td className="border p-4">{message.name}</td>
                <td className="border p-4">{message.userEmail}</td>
                <td className="border p-4">{message.userMessage}</td>
                <td className="border p-4">
                  <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => handleReplyClick(message)}
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Email body section (appears when a message is selected for reply) */}
      {selectedMessage && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Reply to: {selectedMessage.name}</h3>
          <textarea
            className="w-full h-40 p-4 border rounded-md"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}  // Update email body as the user types
          />
          <div className="mt-4">
            <button
              className="bg-green-500 text-white p-2 rounded"
              onClick={handleSendEmail}  // Send email when clicked
            >
              Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




// // app/admin/components/ContactMessagesClient.jsx
// "use client"; // Ensures this is a client-side component

// import { useState } from 'react';

// export default function ContactMessagesClient({ messages }) {
//   const [to, setTo] = useState('');
//   const [message, setMessage] = useState('');

//   const handleReply = (email) => {
//     setTo(email); // Autofill the "To" field with the clicked email
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Replying to: ${to} with message: ${message}`);
//     // Here you would implement the logic to send the email.
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Contact Messages</h2>
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <table className="w-full border-collapse table-auto">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="border p-4 text-left">ID</th>
//               <th className="border p-4 text-left">Name</th>
//               <th className="border p-4 text-left">Email</th>
//               <th className="border p-4 text-left">Message</th>
//               <th className="border p-4 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {messages && messages.length > 0 ? (
//               messages.map((message) => (
//                 <tr key={message.id} className="hover:bg-blue-100 transition duration-200">
//                   <td className="border p-4">{message.id}</td>
//                   <td className="border p-4">{message.name}</td>
//                   <td className="border p-4">{message.userEmail}</td>
//                   <td className="border p-4 max-w-xs overflow-hidden">{message.userMessage}</td>
//                   <td className="border p-4">
//                     <button
//                       onClick={() => handleReply(message.userEmail)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
//                     >
//                       Reply
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="border p-4 text-center text-gray-500">No messages available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Reply Section */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4">Reply to Message</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-600 font-medium mb-2" htmlFor="email">
//               To:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="Recipient's email"
//               value={to}
//               onChange={(e) => setTo(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 font-medium mb-2" htmlFor="message">
//               Message:
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               rows="5"
//               placeholder="Write your reply here..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
//           >
//             Send Reply
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
