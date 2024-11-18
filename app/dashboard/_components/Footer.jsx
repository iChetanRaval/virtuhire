"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-start mb-4 md:mb-0">
            <Image src="/logo.png" width={100} height={50} alt="logo" />
            <p className="mt-2 text-gray-600">
              Your go-to platform for mock interviews and career growth.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-4">
            <div>
              <h3 className="font-semibold text-lg">Quick Links</h3>
              <ul className="mt-2 text-gray-600">
                <li>
                  <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary">FAQ</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Follow Us</h3>
              <div className="flex gap-4 mt-2">
                <Link href="https://www.facebook.com" target="_blank">
                  <FaFacebook className="h-6 w-6 text-gray-600 hover:text-primary" />
                </Link>
                <Link href="https://www.twitter.com" target="_blank">
                  <FaTwitter className="h-6 w-6 text-gray-600 hover:text-primary" />
                </Link>
                <Link href="https://www.instagram.com" target="_blank">
                  <FaInstagram className="h-6 w-6 text-gray-600 hover:text-primary" />
                </Link>
                <Link href="https://www.linkedin.com" target="_blank">
                  <FaLinkedinIn className="h-6 w-6 text-gray-600 hover:text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-6 pt-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} VirtuHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
