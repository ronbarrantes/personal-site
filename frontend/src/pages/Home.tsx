import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MainContent } from "@/components/MainContent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useRoutes } from "@/hooks/use-api";
import { tryCatch } from "@/utils/try-catch";

const nowSchema = z.object({
  title: z.string().min(2, {
    message: "Title least 2 characters.",
  }),
  desc: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export function EditDialog(item: { title: string; desc: string; id: number }) {
  const { api } = useRoutes();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will delet the Now Item with
            title of:
          </DialogDescription>
          <DialogDescription className="font-semibold">
            {item.title}
          </DialogDescription>
        </DialogHeader>
        <Button
          type="button"
          variant="destructive"
          onClick={async () => {
            const { error } = await tryCatch(
              api.now.delete.mutateAsync(item.id)
            );

            if (error) {
              setIsOpen(true);
              return;
            }
            setIsOpen(false);
          }}
        >
          Delete
        </Button>
        <DialogClose asChild>
          <Button type="button">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export function AddOrUpdateItem({
  title,
  desc,
  id,
  children,
}: {
  title?: string;
  desc?: string;
  id?: number;
  children: React.ReactNode;
}) {
  const { api } = useRoutes();
  const form = useForm<z.infer<typeof nowSchema>>({
    resolver: zodResolver(nowSchema),
    defaultValues: {
      title: title ?? "",
      desc: desc ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof nowSchema>) {
    const body = {
      title: values.title,
      desc: values.desc,
    };

    if (id) await api.now.put.mutateAsync({ id, body });
    else await api.now.post.mutateAsync({ body });

    form.reset();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{children}</Button>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col space-y-8"
          >
            {id ? (
              <SheetHeader>
                <SheetTitle>Update the now item</SheetTitle>
                <SheetDescription>What is your update:</SheetDescription>
              </SheetHeader>
            ) : (
              <SheetHeader>
                <SheetTitle>Add a now item</SheetTitle>
                <SheetDescription>
                  What am you up to right now:
                </SheetDescription>
              </SheetHeader>
            )}
            <div className="flex flex-1 auto-rows-min flex-col gap-6 px-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export const Home = () => <MainContent />;
