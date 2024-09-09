"use client";

import { cookie } from "@/api/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TestDetails({ testDetails, uuid }) {
  const [link, setLink] = useState("");
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    // Set the UUID in localStorage only on the client side
    localStorage.setItem("uniqueUUID", uuid);

    // Determine link and button text based on the accessToken
    if (cookie.accessToken) {
      setLink(`/question?testId=${testDetails._id}`);
      setButtonText("Attempt Test");
    } else {
      setLink(`/signup?uuid=${uuid}`);
      setButtonText("Register");
    }
  }, [testDetails._id, uuid]);

  return (
    <main className="w-full bg-background">
      <section className="container flex flex-col items-center justify-center gap-8 px-4 py-12 md:py-24 lg:py-32">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            {testDetails.title}
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            Deadline: {new Date(testDetails.deadline).toDateString()}
          </p>
        </div>
        <div>
          <Link
            href={link}
            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
            prefetch={false}
          >
            {buttonText}
          </Link>
        </div>
      </section>
    </main>
  );
}
