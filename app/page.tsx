import ProductCard from "@/components/HomePage/ProductCard";
import Link from "next/link";
import { Suspense } from "react";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <h1 className="text-center font-bold text-lg md:text-4xl underline mb-6">
        List of All Products
      </h1>

      <Suspense fallback={<>loading..</>}>
        <ProductCard page={page} />
      </Suspense>

      <div className="flex justify-center mt-10">
        <Link
          href={`/?page=${page - 1}`}
          className="border-2 bg-black px-4 py-2 text-white rounded"
        >
          Previous
        </Link>
        <span className="px-4 py-2 border-2">{page}</span>
        <Link
          href={`/?page=${page + 1}`}
          className="border-2 bg-black px-6 py-2 text-white rounded"
        >
          Next
        </Link>
      </div>
    </main>
  );
}
