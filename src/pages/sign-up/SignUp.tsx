import { ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { useSignUpMutation } from '@/services/api/mutations/useSignUpMutation';
import { useNavigate } from 'react-router-dom';

const signUpSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstname: z.string(),
});

export default function Page(): ReactElement {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      firstname: '',
      password: '',
    },
  });

  const { mutate } = useSignUpMutation();

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);

    mutate(values, {
      onSuccess: (data) => {
        console.log('User registered successfully:', data);
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
          <CardTitle>Welcome to Dojo</CardTitle>
          <CardDescription>Please, create an account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="or fullname" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <CardFooter className="flex-col space-y-2">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <span className="text-gray-400">--- or ---</span>
              <Button
                onClick={() => navigate('/sign-in')}
                type="button"
                variant="outline"
                className="w-full"
              >
                Sign in
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
