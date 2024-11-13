"use client";

import { threadSchema } from "@/lib/validationSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.action";

export default function PostThread({ authorId }: { authorId: string }) {
  const router = useRouter();
  const pathName = usePathname();

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof threadSchema>) {
    console.log("PostThread values: ", values);
    try {
      await createThread({
        text: values.description,
        authorId: authorId,
        path: pathName,
      });
      toast.success("Thread posted successfully");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <ToastContainer />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-2/3 h-2/3"
      >
        <p className="font-semibold text-lg">Create Thread</p>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="bg-[#101013] font-semibold"
                  placeholder="Let your thoughts come through.."
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-violet-900 w-full font-semibold text-md"
          type="submit"
        >
          Post
        </Button>
      </form>
    </Form>
  );
}
