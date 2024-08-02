import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/main";
import { useCreateTodoMutation } from "@/services/api/mutations/useCreateTodoMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  content: z.string(),
});

export const TodoCreateForm = (): ReactElement => {
  const { mutate: postTodo } = useCreateTodoMutation();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    postTodo(values, {
      onSuccess: (data) => {
        console.log("POSTED!", { data });
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        form.reset();
      },
      onError: (error) => {
        console.error("Error registering user:", error);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="">
          Add todo
        </Button>
      </form>
    </Form>
  );
};
