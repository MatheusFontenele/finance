"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDelete } from '@/features/categories/api/use-bulk-delete';
import { useNewCategory } from '@/features/categories/hooks/use-new-category';
import { useGetCategories } from '@/features/categories/api/use-get-categories';

const CategoriesPage = () => {
  const newCategory = useNewCategory();
  const deleteCategories = useBulkDelete();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;
  console.log(newCategory.isOpen);
  

  if (categoriesQuery.isLoading) {
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
            Categories
          </CardTitle>
          <Button size="sm" onClick={newCategory.onOpen}>
            <Plus className='mr-2' size={16} />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            disable={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories.mutate({ ids });
            }}
            filterKey='name'
            columns={columns} 
            data={categories} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
