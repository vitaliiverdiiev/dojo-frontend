import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OrDecorator } from "@/components/ui/or.decorator";
import { useAuth } from "@/hooks/useAuth";
import { RoutesEnum } from "@/models/enums/RoutesEnum";
import { UnknowType } from "@/models/types/UnknownType";
import { useSignInMutation } from "@/services/api/mutations/useSignInMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function Page(): ReactElement {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useSignInMutation();

  function onSubmit(values: z.infer<typeof signInSchema>) {
    mutate(values, {
      onSuccess: (data: { user: UnknowType; accessToken: string }) => {
        login(data.user, data.token.accessToken);
      },
      onError: (error) => {
        console.error("Error registering user:", error);
      },
    });
  }

  return (
    <div className="flex h-full items-center justify-center bg-[#5B96A9]">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle>Welcome back to Dojo</CardTitle>
          <CardDescription>Please, sign in with your account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-y-2">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <OrDecorator />
              <Button asChild variant="link">
                <Link to={RoutesEnum.SIGNUP}>Sign up</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
