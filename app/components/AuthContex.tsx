"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

//create contex
export const AuthStateContext = createContext(null);

export default function AuthStateProvider({
  children,
}: {
  children: React.ReactNode
}) {
  
  const initialState = {
      loading: true,    
      authStatus: 'guest',
      data: null
  };

  const [authState, setAuthState] = useState(initialState);

  /*
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await api.get('/web/profile'); 
        
        const userData = response.data;
        setAuthState({ 
            loading: false, 
            authStatus: "user", // Server yang memberi tahu role-nya userData.role
            data: userData 
        });

      } catch (error) {
        // Jika 401 atau error lain -> Guest
        setAuthState({ loading: false, authStatus: 'guest', data: null });
      }
    };

    checkUserSession();
  }, []);*/


  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const results = await Promise.allSettled([
          api.get('/web/ownerprofile'),
          api.get('/web/adminprofile'),
          api.get('/web/profile'),
        ]);

        const ownerResult = results[0];
        const adminResult = results[1];
        const userResult = results[2];

        if (ownerResult.status === 'fulfilled') {
          setAuthState({ loading: false, authStatus: 'owner', data: ownerResult.value.data });
        } else if (adminResult.status === 'fulfilled') {
          setAuthState({ loading: false, authStatus: 'admin', data: adminResult.value.data });
        } else if (userResult.status === 'fulfilled') {
          setAuthState({ loading: false, authStatus: 'user', data: userResult.value.data }); 
        } else {
          setAuthState({ loading: false, authStatus: 'guest', data: null });
        }

      } catch (error) {
        console.error("Fatal error checking sessions:", error);
        setAuthState({ loading: false, authStatus: 'guest', data: null });
      }
    };

    checkUserSession();
  }, []);

  const nilai = { authState, setAuthState };

  //teruskan state ke Contex Provider
  return <AuthStateContext value={nilai} >{children}</AuthStateContext>
}