import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "@/components/date-picker";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { insertTransactionSchema } from "@/db/schema";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string().nonempty(),
  categoryId: z.string().nullable().optional(),
  amount: z.number(),
  payee: z.string(),
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
          name="date"
          control={form.control}
          render={(({field}) => (
            <FormItem>
              <FormControl>
                <DatePicker 
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          ))}
        />
        <FormField 
          name="accountId"
          control={form.control}
          render={(({field}) => (
            <FormItem>
              <FormLabel>
                Account
              </FormLabel>
              <FormControl>
                <Select 
                  placeholder="Select an account"
                  options={accountOptions}
                  value={field.value}
                  onChange={field.onChange}
                  onCreate={onCreateAccount}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          ))}
        />

        <FormField 
          name="categoryId"
          control={form.control}
          render={(({field}) => (
            <FormItem>
              <FormLabel>
                Category
              </FormLabel>
              <FormControl>
                <Select 
                  placeholder="Select an category"
                  options={categoryOptions}
                  value={field.value}
                  onChange={field.onChange}
                  onCreate={onCreateCategory}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          ))}
        />

        <FormField 
          name="payee"
          control={form.control}
          render={(({field}) => (
            <FormItem>
              <FormLabel>
                Payee
              </FormLabel>
              <FormControl>
                <Input 
                  disabled={disabled}
                  placeholder="Add a payee"
                  {...field }
                />
              </FormControl>
            </FormItem>
          ))}
        />

        <FormField 
          name="note"
          control={form.control}
          render={(({field}) => (
            <FormItem>
              <FormLabel>
                Notes
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field }
                  value={field.value ?? "" }
                  disabled={disabled}
                  placeholder="Optional notes"
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