import { redirect } from "next/navigation";
import React from "react";
import prismadb from "@/lib/prismadb";
import withAuth from "@/lib/withAuth";
import { auth } from "@clerk/nextjs";

type SetupLayoutProps = {
  children: React.ReactNode;
};

const SetupLayout: React.FC<SetupLayoutProps> = async ({ children }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
};

export default SetupLayout;
