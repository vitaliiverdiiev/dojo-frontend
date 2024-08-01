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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OrDecorator } from "@/components/ui/or.decorator";
import { useSignUpMutation } from "@/services/api/mutations/useSignUpMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstname: z.string(),
});

export default function Page(): ReactElement {
  const [isRegistred, setRegistred] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      firstname: "",
      password: "",
    },
  });

  const { mutate } = useSignUpMutation();

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    mutate(values, {
      onSuccess: (data) => {
        setRegistred(true);
        console.log("User registered successfully:", data);
      },
      onError: (error) => {
        console.error("Error registering user:", error);
      },
    });
  }

  useEffect(() => {
    if (isRegistred) {
      const timer = setTimeout(() => {
        navigate("/blog-posts"); // Redirect to new page
      }, 3000); // 3 seconds delay

      // Clean up the timeout if the component unmounts or if state changes again
      return () => clearTimeout(timer);
    }
  }, [isRegistred]);

  return (
    <div className="flex h-full items-center justify-center bg-[#5B96A9]">
      {!isRegistred && (
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
                <OrDecorator />
                <Button
                  onClick={() => navigate("/sign-in")}
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
      )}
      {isRegistred && (
        <div className="h-full">
          <span>
            Thank you for signing up!{" "}
            <span>You will be redirected shortly..</span>
          </span>
        </div>
      )}
    </div>
  );
}
