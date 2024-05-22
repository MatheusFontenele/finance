import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

interface IHeaderLogoProps {
}

const HeaderLogo: React.FunctionComponent<IHeaderLogoProps> = (props) => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={48}
          height={48}
        />
        <p className='font-semibold text-white text-2xl ml-2.5'>Finance</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
