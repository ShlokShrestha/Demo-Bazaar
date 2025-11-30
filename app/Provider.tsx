import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default Provider;
