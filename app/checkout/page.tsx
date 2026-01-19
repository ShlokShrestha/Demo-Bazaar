"use client";
import Checkout from "@/components/CheckOut/CheckOut";
import { useUser } from "@clerk/nextjs";

const CheckOutPage = () => {
  const { user } = useUser();
  return (
    <>
      <Checkout userId={user?.id} />
    </>
  );
};

export default CheckOutPage;
