'use client';

import { useState } from 'react';

export default function RoomsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
	<>
		{children}
	</>
  );
}
