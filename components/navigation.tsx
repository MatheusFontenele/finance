'use client';
import {useState} from 'react';
import NavButton from './nav-button';
import { useMedia } from 'react-use';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';

const routes = [
  {
    label: 'Overview',
    href: '/',
  },
  {
    label: 'Transactions',
    href: '/transactions',
  },
  {
    label: 'Accounts',
    href: '/accounts',
  },
  {
    label: 'Categories',
    href: '/categories',
  },
  {
    label: 'Settings',
    href: '/settings',
  },
];

interface INavigationProps {
}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  const  [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();

  const router = useRouter();
  const isMobile = useMedia('(max-width: 1024px)', false);

  const onClick = (href:string) => {
    router.push(href);
    setIsOpened(false);
  }

  if(isMobile) {
    return <Sheet open={isOpened} onOpenChange={setIsOpened}>
      <SheetTrigger className="flex flex-col gap-y-2">
        <Button
          variant="outline"
          size="sm"
          className='font-normal bg-white/10 hover:bg-white/20 text-white hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition'
        >
          <MenuIcon className='size-4' />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className='px-2'>
        <div className="">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={48}
            height={48}
          />
        </div>
        <nav className='flex flex-col gap-y-2 pt-6'>
          {routes.map((route) => (
            <Button
              key={route.href}
              size="sm"
              variant={route.href === pathname ? 'secondary' : 'ghost'}
              onClick={() => onClick(route.href)}
              className='w-full justify-start'
            >
              {route.label}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  }

  return (
    <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={route.href === pathname}
        />
      ))}
    </div>
  );
};

export default Navigation;
