import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const formSchema = insertTransactionSchema.omit({ id: true });

type FromValues = z.input<typeof formSchema>;

type props = {
  id?: string;
  defaultValues?: FromValues;
  onSubmit: (values: FromValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
}

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
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