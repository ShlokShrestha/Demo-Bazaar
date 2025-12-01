import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center mt-4">
      <SignUp
        signInUrl={`/sign-in`}
        forceRedirectUrl={"/"}
        fallbackRedirectUrl={"/"}
      />
    </div>
  );
}
