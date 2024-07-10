import { z } from "zod";
import Loader from "@/components/loader";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { TransactionForm } from "./transaction-form";

const formSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const mutation = useCreateTransaction();

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();

  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
  const categoryOptions = (categoryQuery.data ?? []).map(category => ({ label: category.name, value: category.id }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (accountQuery.data ?? []).map(account => ({ label: account.name, value: account.id }));

  const isPending = mutation.isPending || categoryMutation.isPending || accountMutation.isPending;
  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  }
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New transaction</SheetTitle>
          <SheetDescription>
            Add a new transaction
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <Loader />
        ) : (
          <TransactionForm 
            onSubmit={onSubmit}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            onCreateAccount={onCreateAccount}
            accountOptions={accountOptions}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};