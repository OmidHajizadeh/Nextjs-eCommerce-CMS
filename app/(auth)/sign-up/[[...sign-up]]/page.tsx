import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "ثبت نام",
  description: "Sign up",
};

export default function Page() {
  return <SignUp />;
}
