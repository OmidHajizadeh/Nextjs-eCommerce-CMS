import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function withAuth<T>(WrappedComponent: React.FC<T>) {
  function WithAuth(props: T) {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    return <WrappedComponent userId={userId} {...props} />;
  }

  return WithAuth;
}
