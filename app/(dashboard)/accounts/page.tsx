"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { Loader2, Plus } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDelete } from '@/features/accounts/api/use-bulk-delete';

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDelete();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if (accountsQuery.isLoading) {
    return (
      <div className='max-w-screen-2xl mx-auto w-full -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader >
            <Skeleton className='w-48 h-8' />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex justify-center items-center">
              <Loader2 className='size-6 text-slate-300 animate-spin' />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
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
            disable={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccounts.mutate({ ids });
            }}
            filterKey='name'
            columns={columns} 
            data={accounts} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
