"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/inKpwC8vBHy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cookie } from "@/api/cookies";
import login from "@/api/user/login";

export default function LoginDetails() {
  const router = useRouter();
  const [uuid, setUuid] = useState("");

  // Only access localStorage in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUuid = localStorage.getItem("uniqueUUID");
      setUuid(storedUuid);
    }
  }, []);
  const [details, setDetails] = useState({});
  const handleChange = ({ key, value }) => {
    setDetails({
      ...details,
      [key]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, secret } = details || {};
      const data = await login({ email, secret });
      if (data?.data?.accessToken) {
        cookie.accessToken = data?.data?.accessToken;
        router.push(`/tests/${uuid}`);
      }
    } catch (error) {
      alert(error?.data?.message);
      return;
    }
  };
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-8 border border-gray-300">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary/80 text-blue-500 underline"
              prefetch={false}
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              onChange={(e) =>
                handleChange({ key: "email", value: e.target.value })
              }
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              onChange={(e) =>
                handleChange({ key: "secret", value: e.target.value })
              }
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <Button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
