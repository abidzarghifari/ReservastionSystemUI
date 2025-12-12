import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import type { AxiosError } from 'axios';
import api from './api';

// Asumsi: Nama cookie sesi Anda adalah 'sessionToken'
const SESSION_COOKIE_NAME = 'laravel-session'; 

export async function authGuest() {
  const cookieStore = cookies();
  
  // 1. Ambil HANYA cookie sesi yang dibutuhkan
  const sessionCookie = (await cookieStore).get(SESSION_COOKIE_NAME);
  
  // Jika cookie sesi tidak ditemukan, langsung redirect tanpa memanggil API
  if (!sessionCookie) {
    redirect('/auth/guest/login');
  }

  // Buat header dengan hanya menyertakan cookie sesi yang relevan
  const headersConfig = {
    // Format standar: Cookie: name=value
    Cookie: `${SESSION_COOKIE_NAME}=${sessionCookie.value}`,
  };

  try {
    const response = await api.get('web/profile', {
        headers: headersConfig,
    });
    
    // Jika berhasil (kode 200 OK), kembalikan data profil
    return response.data;

  } catch (error: unknown) { // Menggunakan 'unknown' untuk catch yang lebih aman di TypeScript
    const axiosError = error as AxiosError;
    
    // 2. Penanganan Error Spesifik:
    // Cek apakah error berasal dari respons HTTP (bukan error jaringan lain)
    if (axiosError.response) {
      const status = axiosError.response.status;
      
      // Jika respons adalah 401 (Unauthorized) atau 403 (Forbidden), 
      // yang mengindikasikan sesi tidak valid atau izin ditolak.
      if (status === 401 || status === 403) {
        // Redirect ke halaman login
        redirect('/auth/guest/login');
      }
    }
    
    // Untuk error lain (misalnya 500 Server Error atau error jaringan), 
    // kita biarkan error dilemparkan agar dapat ditangkap oleh error boundary 
    // atau handler lain di level yang lebih tinggi.
    throw error;
  }
}