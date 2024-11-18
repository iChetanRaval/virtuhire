// app/admin/layout.jsx
"use client"
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <aside className="w-64 bg-white p-6 shadow-lg relative">
        <h2 className="text-2xl font-extrabold text-blue-600 mb-8 text-center border-b pb-4">
          Admin Panel
        </h2>
        <nav className="space-y-6">
          <NavLink href="/admin/dashboard" label="Dashboard" icon="🏠" />
          <NavLink href="/admin/user-answers" label="Users" icon="👥" />
          <NavLink href="/admin/mock-interviews" label="Interviews" icon="📄" />
          <NavLink href="/admin/resume-scores" label="Resume Scores" icon="📊" />
          <NavLink href="/admin/contact-us" label="Contact Messages" icon="📬" />
        </nav>
        <div className="absolute bottom-4 w-full text-center text-gray-400 text-sm">
          &copy; 2024 VirtuHire
        </div>
      </aside>
      <main className="flex-1 p-8 bg-white shadow-inner rounded-tl-lg">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label, icon }) {
  return (
    <Link href={href} passHref>
      <div className="flex items-center space-x-4 p-3 hover:bg-blue-100 rounded-lg transition cursor-pointer">
        <span className="text-2xl">{icon}</span>
        <span className="text-lg font-medium text-gray-700 hover:text-blue-600">
          {label}
        </span>
      </div>
    </Link>
  );
}



