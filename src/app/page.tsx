'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import hospitalImage from '../assets/hospital-image.png'
import MainViewPatient from './patient/page';
import MainViewDoctor from './doctor/page';


export default function MainView() {
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F4FDF6]">
      <header className="flex items-center justify-between px-4 py-3">
      </header>

      <MainViewPatient />
      {/* <MainViewDoctor /> */}

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-sm text-gray-500">
      </footer>
    </div>
  );
}

