import { z } from "zod";
import Loader from "@/components/loader";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import { TransactionForm } from "./transaction-form";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useOpenTransaction } from "../hooks/use-open-transaction";

const formSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  
  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account. This action cannot be undone.",
  )

  const isLoading = transactionQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  const defaultValues = transactionQuery.data ? {
    amount: transactionQuery.data.amount,
    date: transactionQuery.data.date,
    categoryId: transactionQuery.data.categoryId,
    accountId: transactionQuery.data.accountId,
    note: transactionQuery.data.note,
    payee: transactionQuery.data.payee,
  } : {
    amount: 0,
    date: new Date(),
    categoryId: "",
    accountId: "",
    note: "",
    payee: "",
  }

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  }
  
  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit account</SheetTitle>
            <SheetDescription>
              Edit a account.
            </SheetDescription>
          </SheetHeader>

          {
            isLoading ? 
              (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <TransactionForm
                  id={id}
                  onSubmit={onSubmit} 
                  disabled={isPending}
                  defaultValues={defaultValues}
                  onDelete={onDelete}
                />
              )
          }
        </SheetContent>
      </Sheet>
    </>
  );
};