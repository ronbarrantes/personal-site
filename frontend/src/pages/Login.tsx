import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

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
import { MAIN_THEME } from "@/lib/brutalist-theme";
import { loginApi } from "@/hooks/use-api";
import { useAuthStore } from "@/store/use-auth";
import { tryCatch } from "@/utils/try-catch";

const l = MAIN_THEME.light;
const d = MAIN_THEME.dark;

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function LoginForm() {
  const { setIsAuth } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await tryCatch(
      loginApi.login({
        username: values.username,
        password: values.password,
      })
    );

    if (error) {
      console.error(error);
      toast.error(`There was a problem: ${error}`);
      form.reset();
      return;
    }

    console.log("success");

    console.info("data", data.data);
    setIsAuth(true);
    form.reset();
    navigate("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`${l.textAccent} ${d.textAccent}`}>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="user..."
                  className={`border bg-transparent ${l.borderMuted} ${d.borderMuted} ${l.textAccent} ${d.textAccent} placeholder:opacity-50`}
                  {...field}
                />
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
              <FormLabel className={`${l.textAccent} ${d.textAccent}`}>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="pass..."
                  className={`border bg-transparent ${l.borderMuted} ${d.borderMuted} ${l.textAccent} ${d.textAccent} placeholder:opacity-50`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`border ${l.linkMain} ${d.linkMain} bg-transparent hover:bg-white/5`}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

const LogOutButton = () => {
  const { setIsAuth } = useAuthStore();

  return (
    <Button
      className={`border ${l.linkMain} ${d.linkMain} bg-transparent hover:bg-white/5`}
      onClick={async () => {
        const { data, error } = await tryCatch(loginApi.logout());
        if (error) {
          console.error(error);
          toast.error(`There was a problem: ${error}`);
          return;
        }

        setIsAuth(false);
        console.info(data.data);
      }}
    >
      Logout
    </Button>
  );
};

export const Login = () => {
  const { isAuth } = useAuthStore();

  return (
    <div className="flex flex-col gap-8">
      <div className={`rounded border-2 p-6 ${l.borderMuted} ${d.borderMuted} sm:max-w-md`}>
        <h2 className={`mb-6 text-xl font-semibold ${l.textAccent} ${d.textAccent}`}>
          {isAuth ? "You are logged in" : "Log in"}
        </h2>
        {isAuth ? <LogOutButton /> : <LoginForm />}
      </div>
      <NavLink
        to="/"
        className={`w-fit border px-4 py-2 text-sm font-medium transition ${l.linkOther} ${d.linkOther}`}
      >
        Back to home
      </NavLink>
    </div>
  );
};
