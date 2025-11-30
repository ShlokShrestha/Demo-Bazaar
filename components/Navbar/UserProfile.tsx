import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const UserProfile = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn ? (
        <div className="flex gap-2">
          <p>Hello, {user.firstName}</p>
          <UserButton />
        </div>
      ) : (
        <Link href="/sign-in">Login</Link>
      )}
    </div>
  );
};

export default UserProfile;
