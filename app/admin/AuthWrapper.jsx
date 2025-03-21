// app/admin/AuthWrapper.jsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from './layout';

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAdminAuthenticated) {
      router.push('/admin'); // Redirect to sign-in page if not authenticated
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Stop loading after authentication check
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Render the layout and children if authenticated
  if (isAuthenticated) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  // Return null if not authenticated (redirect will happen)
  return null;
}