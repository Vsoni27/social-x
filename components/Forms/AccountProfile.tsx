"use client";

import { userSchema } from "@/lib/validationSchema";
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
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { createUpdateUser} from "@/lib/actions/user.action";
import mongoose from "mongoose";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  data: {
    id: string;
    objectId: typeof mongoose.Schema.ObjectId;
    username: string;
    name: string;
    image: string;
    bio: string;
  };
  btntype: string;
}

export default function AccountProfile({ data, btntype }: Props) {
  const [files, setfiles] = useState<string>(data?.image);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: data?.username || "",
      name: data?.name || "",
      profile_photo: data?.image || "",
      bio: data?.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    values.profile_photo = files;
    try {
      await createUpdateUser({
        id: data.id,
        name: values.name,
        username: values.username,
        image: values.profile_photo,
        bio: values.bio,
        onboarded: true,
      });
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <ToastContainer />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-y-4 gap-x-10 items-center justify-between p-2">
          <div className="flex items-center gap-x-2 lg:gap-x-4">
            <div
              className="rounded-full overflow-hidden border-2 border-white"
              style={{ width: "85px", height: "85px" }}
            >
              <Image
                src={files}
                alt="User Image"
                height={85}
                width={85}
                priority={true}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <UploadButton
            className="font-semibold"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              setfiles(res[0].url);
              toast.success("Image Uploaded");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(`Something went wrong!`);
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="bg-[#050506] border-0 font-semibold"
                  placeholder="Enter name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="bg-[#050506] border-0 font-semibold"
                  placeholder="Enter username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-[#050506] border-0 font-semibold"
                  placeholder="Enter your bio.."
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
