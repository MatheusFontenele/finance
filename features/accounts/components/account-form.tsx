import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FromValues = z.input<typeof formSchema>;

type props = {
  id?: string;
  defaultValues?: FromValues;
  onSubmit: (values: FromValues) => void;
  onDeleted?: () => void;
  disabled?: boolean;
}

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDeleted,
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
    onDeleted?.();
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField 
          name="name"
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
        <Button
          type="submit"
          className="w-full" 
          disabled={disabled}>
          {id ? "Save changes" : "Create account"}
        </Button>

        {!!id && <Button 
          type="button"
          disabled={disabled}
          onClick={handleDelete}
          className="w-full"
          size="icon"
          variant="outline"
        >
          <Trash className="size-4 mr-2" />
          Delete account
        </Button>}
      </form>
    </Form>
  );
}