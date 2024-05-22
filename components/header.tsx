"use client";
import * as React from 'react';
import HeaderLogo from './header-logo';
import Navigation from './navigation';
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const {isLoaded, user} = useUser();
  return (
    <header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36'>
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton
              afterSignOutUrl="/"
            />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" size="32" color='#FFF' />
          </ClerkLoading>
        </div>
        <div className="space-y-2 mb-4">
          <h2 className='text-2xl lg:text-4xl text-white font-medium'>Welcome back{ isLoaded ? ", " : " " }{ user?.firstName + " 👋"}</h2>
          <p className='text-sm lg:text-base text-[#89b6fd]'>This is your Financal Overview report</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
