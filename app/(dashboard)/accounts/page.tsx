"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { Plus } from 'lucide-react';
import * as React from 'react';
import { DataTable } from '@/components/data-table';
import { Payment, columns } from './columns';

interface IAccountsPageProps {
}

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "a@example.com",
  },
]

const AccountsPage = () => {
  const newAccount = useNewAccount();
  
  return (
    <div className='max-w-screen-2xl mx-auto w-full -mt-24'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
            Accounts
          </CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className='mr-2' size={16} />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey='email'
            columns={columns} 
            data={data} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
