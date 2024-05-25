import { Sheet, SheetContent, SheetDescription, SheetHeader } from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader title="New Account">
          <SheetDescription>
            Create a new account to start tracking your finances.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};