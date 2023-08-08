import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="grid place-items-center h-screen">
      {children}
    </main>
  );
};

export default AuthLayout;
