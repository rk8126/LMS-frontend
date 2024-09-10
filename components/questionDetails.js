"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import startTest from "@/api/test/start";
import submitTestQuestion from "@/api/question/submit";
import getNextQuestion from "@/api/question/fetch";
import { cookie } from "@/api/cookies";
import { useRouter } from "next/navigation";

export default function QuestionDetails({ testId }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentSubmittedId, setCurrentSubmittedId] = useState("");
  const [isMounted, setIsMounted] = useState(false); // To track mount status
  const hasStartedTest = useRef(false); // To track if the test has started

  // Ensure the component is mounted before executing client-side code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect to login if no access token is available
  useEffect(() => {
    if (isMounted && !cookie.accessToken) {
      router.push("/login");
    }
  }, [isMounted, cookie.accessToken, router]);

  async function startTestByTestId() {
    try {
      const questionDetails = await startTest(testId);
      setCurrentQuestion(questionDetails?.data);
    } catch (error) {
      if(error?.data?.message == "Unauthorized"){
        router.push("/login");
        return null;
      }
      if(error?.data?.message == "Test has been completed"){
        router.push("/message");
        return null;
      }
      alert(error?.data?.message);
    }
  }

  async function submitQuestion({ questionId, answer }) {
    try {
      const details = await submitTestQuestion({ testId, questionId, answer });
      if (details?.endTest) {
        router.push("/message");
        return;
      }
      setCurrentSubmittedId(questionId);
    } catch (error) {
      if(error?.data?.message == "Unauthorized"){
        router.push("/login");
        return null;
      }
      if(error?.data?.message == "Test has been completed"){
        router.push("/message");
        return null;
      }
      alert(error?.data?.message);
    }
  }

  async function fetchNextQuestion() {
    try {
      setSelectedAnswer("");
      const questionDetails = await getNextQuestion({ testId });
      setCurrentQuestion(questionDetails?.data);
    } catch (error) {
      if(error?.data?.message == "Unauthorized"){
        router.push("/login");
        return null;
      }
      if(error?.data?.message == "Test has been completed"){
        router.push("/message");
        return null;
      }
      alert(error?.data?.message);
    }
  }

  // Start the test only once when the component mounts
  useEffect(() => {
    if (!hasStartedTest.current) {
      startTestByTestId();
      hasStartedTest.current = true; // Set the flag to prevent future calls
    }
  }, [testId]);

  useEffect(() => {
    if (!currentSubmittedId) {
      return;
    }
    fetchNextQuestion();
  }, [currentSubmittedId]);

  const handleAnswerSelect = (label) => {
    setSelectedAnswer(label);
  };

  if (!isMounted) {
    // Avoid rendering anything until the component is mounted
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full space-y-8 border border-gray-300">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-card-foreground">
            {currentQuestion?.text}
          </h1>
          <div className="grid gap-4">
            {Object.entries(currentQuestion?.options || {})?.map(
              ([label, option]) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${
                    selectedAnswer === label
                      ? "bg-gray-300 text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleAnswerSelect(label)}
                >
                  <div className="font-medium text-card-foreground">
                    {label}. {option}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Button
              className="flex w-1/2 justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              onClick={() =>
                submitQuestion({
                  questionId: currentQuestion?._id,
                  answer: selectedAnswer,
                })
              }
            >
              Submit Answer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
