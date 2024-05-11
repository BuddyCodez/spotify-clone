"use client";
interface UserProviderProps {
    children: React.ReactNode;
}
import { UserContextProvider } from '@/hooks/useUser';
import React from 'react'

const UserProvider:React.FC<UserProviderProps> = ({children}) => {
  return (
   <UserContextProvider>
    {children}
   </UserContextProvider>
  )
}

export default UserProvider;