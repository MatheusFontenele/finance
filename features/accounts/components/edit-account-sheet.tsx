
import { z } from "zod";
import Loader from "@/components/loader";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import { AccountForm } from "./account-form";
import { useDeleteAccount } from "../api/use-delete-account";
import { useEditAccount } from "../api/use-edit-account";
import { useGetAccount } from "../api/use-get-account";
import { useOpenAccount } from "../hooks/use-open-account";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();  
  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account. This action cannot be undone.",
  )

  const isLoading = accountQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name, 
  } : {
    name: '',
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
                <AccountForm
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