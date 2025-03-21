

// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminSignIn() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     if (email === 'chetanraval703@gmail.com' && password === 'Chetan@123') {
//       // Set authentication flag in localStorage
//       localStorage.setItem("isAdminAuthenticated", "true");
//       router.push('/admin/dashboard');
//     } else {
//       alert('Invalid credentials!');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-center mb-6">Admin Sign In</h2>
//         <form onSubmit={handleSignIn} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg"
//             required
//           />
//           <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg">
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// app/admin/page.jsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email === 'chetanraval703@gmail.com' && password === 'Chetan@123') {
      // Set authentication flag in localStorage
      localStorage.setItem('isAdminAuthenticated', 'true');
      router.push('/admin/dashboard'); // Redirect to dashboard after sign-in
    } else {
      setError('Invalid credentials!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Admin Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}