"use client"

import { useState, useEffect } from 'react';
import { csrfHandshake } from '@/lib/api';

export default function AppInitializer() {
  
  useEffect(() => {
	// Lakukan jabat tangan CSRF saat aplikasi dimuat
	csrfHandshake();
  }, []); // [] berarti hanya berjalan sekali

  return null; // Komponen ini tidak perlu me-render apa pun
}
