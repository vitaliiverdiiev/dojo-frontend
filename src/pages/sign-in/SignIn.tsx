import { ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSignInMutation } from '@/services/api/mutations/useSignInMutation';
import { useAuth } from '@/hooks/useAuth';
import { UnknowType } from '@/models/types/UnknownType';

const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function Page(): ReactElement {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate } = useSignInMutation();

  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);

    mutate(values, {
      onSuccess: (data: { user: UnknowType; accessToken: string }) => {
        login(data.user, data.token.accessToken);
      },
      onError: (error) => {
        console.error('Error registering user:', error);
      },
    });
  }

  return (
    <div className="h-full flex items-center justify-center bg-[#5B96A9]">
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
            <CardFooter>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
