import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertTransactionSchema } from "@/db/schema";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string().nonempty(),
  categoryId: z.string().nullable().optional(),
  amount: z.string(),
  peyee: z.string(),
  note: z.string().nullable().optional()
});

const apiSchema = insertTransactionSchema.omit({ id: true }); 

type FromValues = z.input<typeof formSchema>;
type ApiFormValues = z.output<typeof apiSchema>;

type props = {
  id?: string;
  defaultValues?: FromValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
}

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory 
}: props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const handleSubmit = (values: FromValues) => {
    onSubmit(values);
  }
  const handleDelete = () => {
    onDelete?.();
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      > 
        <FormField 
          name="amount"
          control={form.control}
          render={(({field}) => (
            <FormItem>
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
                <Input 
                  disabled={disabled}
                  placeholder="e.g. cash banck credti card"
                  {...field}
                />
              </FormControl>
            </FormItem>
          ))}
        />
        <div className=" space-y-2">
          <Button
            type="submit"
            className="w-full" 
            disabled={disabled}>
            {id ? "Save changes" : "Create account"}
          </Button>

          {!!id && (<Button 
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            size="icon"
            variant="danger"
          >
            <Trash className="size-4 mr-2" />
            Delete account
          </Button>)}
        </div>
      </form>
    </Form>
  );
}