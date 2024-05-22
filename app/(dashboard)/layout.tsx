import Header from '@/components/header';
import * as React from 'react';

interface IDashboardComponentProps {
  children?: React.ReactNode;
}

const DashboardComponent: React.FunctionComponent<IDashboardComponentProps> = ({children}) => {
  return (
    <>
      <Header />
      <main className='px-3 lg:px-14'>
        {children}
      </main>
    </>
  );
};

export default DashboardComponent;
