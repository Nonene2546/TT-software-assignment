"use client"
import { useState, useEffect } from "react";
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"

import { redirect, useParams } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  hn: z.string().optional(),
  fname: z.string(),
  lname: z.string(),
  phone: z.string(),
  email: z.string()
});


export default function MyForm() {
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState<z.infer<typeof formSchema> | null>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hn: '',
      fname: '',
      lname: '',
      phone: '',
      email: ''
    }
  });

  useEffect(() => {
    async function fetchUser() {
      const userData = await fetch(`/api/user/${params.id}`).then((res) => res.json());
      Object.keys(userData).forEach((key) => {
        form.setValue(key as keyof z.infer<typeof formSchema>, userData[key]);
      });
      setUser(userData);
    }
    fetchUser();
  }, []);

  const add = async (values: z.infer<typeof formSchema>) => {
    const res = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    if (res.ok) {
      alert('User created');
      redirect('/');
    }
    else {
      alert('User creation failed');
    }
  };

  const save = async (values: z.infer<typeof formSchema>) => {
    const res = await fetch(`/api/user/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    if (res.ok) {
      alert('User updated');
    }
    else {
      alert('User update failed');
    }
    redirect('/');
  };

  const del = async (values: z.infer<typeof formSchema>) => {
    const res = await fetch(`/api/user/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    if (res.ok) {
      alert('User deleted');
      redirect('/');
    }
    else {
      alert('User delete failed');
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8 max-w-3xl mx-auto py-10">

        <FormField
          control={form.control}
          name="hn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HN</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="text"
                  disabled
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อ</FormLabel>
              <FormControl>
                <Input
                  placeholder="สมชาย"
                  type="text"
                  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>นามสกุล</FormLabel>
              <FormControl>
                <Input
                  placeholder="จดปลายเท้า"

                  type="text"
                  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เบอร์ติดต่อ</FormLabel>
              <FormControl>
                <Input
                  placeholder="0123456789"

                  type="text"
                  {...field} />
              </FormControl>

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
                <Input
                  placeholder="example@gmail.com"

                  type="email"
                  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full gap-4 flex">
          <Button type="button">
            <Link href='/'>Cancel</Link>
          </Button>
          <Button type="button" onClick={form.handleSubmit(add)}>Add</Button>
          <Button type="button" onClick={form.handleSubmit(save)}>Save</Button>
          <Button type="button" onClick={form.handleSubmit(del)}>Delete</Button>
        </div>
      </form>
    </Form>
  )
}
