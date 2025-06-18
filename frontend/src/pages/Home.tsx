import { zodResolver } from "@hookform/resolvers/zod";
import clx from "classnames";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useRoutes } from "@/hooks/use-api";
import { useAuthStore } from "@/store/use-auth";
import { formatDate } from "@/utils/time";

const nowSchema = z.object({
  title: z.string().min(2, {
    message: "Title least 2 characters.",
  }),
  desc: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

const NowItem = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clx(
        "glass flex flex-col gap-5 rounded-3xl border border-slate-950/5 px-5 py-3 dark:border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
};

export function EditDialog(item: { title: string; desc: string; id: number }) {
  const { api } = useRoutes();
  return (
    <Dialog>
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
        <DialogClose asChild>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              api.now.delete.mutate(item.id);
            }}
          >
            Delete
          </Button>
        </DialogClose>
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
                      <Input placeholder="description..." {...field} />
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

export const Home = () => {
  const { api } = useRoutes();
  const nowData = api.now.get.data || [];
  const isLoading = api.now.get.isLoading;
  const { isAuth } = useAuthStore();
  return (
    <div className="mx-auto block h-screen max-w-screen-lg items-center justify-between gap-5 overflow-y-scroll pt-16 md:flex md:overflow-hidden">
      <div className="mb-8 h-fit w-full md:mb-10 md:w-1/3">
        <h1 className="mb-4">Welcome to my site</h1>
        <span className="text-2xl">I'm glad you found it</span>
      </div>
      <div className="h-screen md:w-2/3 md:overflow-hidden md:overflow-y-scroll md:pt-10 lg:w-7/12">
        <h2 className="mb-8 text-2xl md:mb-0">What I've been up to:</h2>
        {isAuth && <AddOrUpdateItem>Add Item</AddOrUpdateItem>}
        {isLoading ? (
          <span>LOADING...</span>
        ) : (
          <ul className="flex flex-col gap-5 pb-8 md:pt-8 md:pb-16">
            {nowData.map((item) => (
              // Need to add something for when there are no items loaded
              <li key={item.id}>
                <NowItem>
                  <h3 className="text-3xl font-semibold text-pink-500 dark:text-pink-400">
                    {item.title}
                  </h3>
                  <div>
                    <p>{item.desc}</p>
                    <span className="text-xs">
                      {formatDate(item.created_at)}
                    </span>
                  </div>
                  {isAuth && (
                    <div className="flex gap-2">
                      <AddOrUpdateItem
                        id={item.id}
                        title={item.title}
                        desc={item.desc}
                      >
                        Edit
                      </AddOrUpdateItem>

                      <EditDialog {...item} />
                    </div>
                  )}
                </NowItem>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
