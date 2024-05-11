"use client"
import { Database } from "@/types_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React, { useState } from 'react'

interface SupabaseProviderProps {
    children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({children}) => {
    const [supbaseClient] = useState(() => createClientComponentClient<Database>( 
       {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY
       }
    ));
  return (
  <SessionContextProvider supabaseClient={supbaseClient}>
    {children}
  </SessionContextProvider>
  )
}

export default SupabaseProvider