import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "ورود",
  description: "Sing in",
};

export default function Page() {
  return <SignIn />;
}