import ProductDetail from "@/components/ProductDetail/ProductDetail";

type params = Promise<{ id: string }>;

const page = async ({ params }: { params: params }) => {
  const { id } = await params;
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });
  const product = await res.json();
  return (
    <>
      <ProductDetail product={product} />
    </>
  );
};

export default page;
