import TestDetails from "@/components/testDetails";

async function getTestDetails(uuid) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/tests/${uuid}`,
      {
        cache: "force-cache",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return null
  }
}

export default async function Page({ params }) {
  const data = await getTestDetails(params?.uuid);
  if(!data?.data){
    return <div>Test Not Found</div>
  }
  const testDetails = data?.data || {};

  return <TestDetails testDetails={testDetails} uuid={params.uuid} />;
}
