"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import Link from "next/link";
import useStore from "@/store/userStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const SignInComponent = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = useStore();
  const router = useRouter();

  async function onSubmit(values) {
    const resp = await fetch("https://event-management-platform-backend-moar.onrender.com/api/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await resp.json();
    setUser(data.id, data.token, data.name);
    router.push("/");
  }

  return (
    <div className="p-6 border rounded-2xl">
      <h1 className="font-medium mb-5 text-center">Sign In</h1>
      <Form {...form} className="">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" {...field} />
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
                  <Input
                    placeholder="Enter Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm">
            Need Account?{" "}
            <Link
              href="/user/sign-up"
              className="text-gray-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
export default SignInComponent;
