// app/question/page.js

import QuestionDetails from "@/components/questionDetails";

export default function Page({ searchParams }) {
  const testId = searchParams.testId
  return <QuestionDetails testId={testId} />;
}
