'use client';

import Door from './components/door';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ToastHandler } from './components/toastHandler';

export default function Home() {

  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setIsOpened(true);
    setTimeout(() => {
      router.push('/guest/home');
    });
  };
  
  return (
    <>
      <ToastHandler />
      <AnimatePresence>
        {!isOpened ? ( <Door key="pembuka" onOpen={handleOpen}/>) : (
          <></>
        )}
      </AnimatePresence>
    </>
  );
}
