import Table from "@/components/Table";
import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
type OrderPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const OrderPage = async ({ searchParams }: OrderPageProps) => {
  const params = await searchParams;
  const search = params?.search || "";
  const page = params?.page || "";
  const pageSize = params?.pageSize || "";
  const user = await currentUser();
  const response = await fetch(
    `${process.env.BASE_URL}/api/order?search=${search}&page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        cookie: `userId=${user?.id}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status}`);
  }
  const orderData = await response.json();
  console.log(orderData);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table />
    </div>
  );
};

export default OrderPage;
