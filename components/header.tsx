"use client";

import { ClerkLoaded, ClerkLoading, UserButton, useUser } from '@clerk/nextjs';
import { Bell, Loader2, Search, Wallet } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import HeaderLogo from './header-logo';
import Navigation from './navigation';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const {isLoaded, user} = useUser();

  return (
    <header className='bg-[#212226] px-4 py-8 lg:px-14 rounded-b-lg'>
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <div className="flex gap-x-6 justify-center items-center">
            <div className="">
              <Search className="text-muted-foreground" size="24" color='#FFF' />
            </div>
            <div className="">
              <Bell className="text-muted-foreground" size="24" color='#FFF' />
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
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="pb-6 flex flex-col justify-between">
            <div className="">
              <h2 className='text-2xl lg:text-4xl text-white font-medium'>Welcome back{ isLoaded ? ", " : " " }{ user?.firstName + " 👋"}</h2>
              <p className='text-sm lg:text-base text-[#7B7C80]'>There Is No Sore It Will Not Heal, No Analytics It Will Not Subdue.</p>
            </div>

            <div className="flex flex-col mt-4 lg:mt-0">
              <span className='font-semibold text-base text-[#4373C7]'>Total salary</span>
              <div className="flex items-center gap-x-2">
                <span className='text-2xl lg:text-2xl text-white font-semibold'>$5,000</span>
                <div className="flex justify-center items-center gap-x-1">
                  <Image
                    src="/arrow-up.svg"
                    alt="arraw up green"
                    width={8}
                    height={8}
                  />
                  <span className='text-green-500 text-xs'>2.5%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 flex flex-col justify-between">
            <p className='text-[#7E7F82] lg:self-end'>data</p>
            <div className="flex flex-col md:flex-row gap-y-2 gap-x-4">
              <div className="bg-white/10 rounded-md p-4 h-36 w-full lg:max-w-36 flex flex-col justify-between">
                <div className="flex items-center gap-x-2">
                  <Wallet className="text-[#7E7F82]" size="12" color='#FFF' />
                  <span className='text-[#7E7F82] text-xs line-clamp-2'>Total employees</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className='text-xl text-white font-semibold'>500</span>
                  <div className="flex justify-center items-center gap-x-1">
                    <Image
                      src="/arrow-up.svg"
                      alt="arraw up green"
                      width={8}
                      height={8}
                    />
                    <span className='text-green-500 text-xs'>2.5%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-md p-4 h-36 w-full lg:max-w-36 flex flex-col justify-between">
                <div className="flex items-center gap-x-2">
                  <Wallet className="text-[#7E7F82]" size="12" color='#FFF' />
                  <span className='text-[#7E7F82] text-xs line-clamp-2'>Gross salary</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className='text-xl text-white font-semibold'>500</span>
                  <div className="flex justify-center items-center gap-x-1">
                    <Image
                      src="/arrow-up.svg"
                      alt="arraw up green"
                      width={8}
                      height={8}
                    />
                    <span className='text-green-500  text-xs'>2.5%</span>
                  </div>
                </div>
              </div>
    
              <div className="bg-white/10 rounded-md p-4 h-36 w-full lg:max-w-36 flex flex-col justify-between">
                <div className="flex items-center gap-x-2">
                  <Wallet className="text-[#7E7F82]" size="12" color='#FFF' />
                  <span className='text-[#7E7F82] text-xs line-clamp-2'>Deduction amount</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className='text-xl text-white font-semibold'>500</span>
                  <div className="flex justify-center items-center gap-x-1">
                    <Image
                      src="/arrow-up.svg"
                      alt="arraw up green"
                      width={8}
                      height={8}
                    />
                    <span className='text-green-500 text-xs'>2.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 

export default Header;
