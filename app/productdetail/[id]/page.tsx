import ProductDetail from "@/components/ProductDetail/ProductDetail";

type params = Promise<{ id: string }>;
export async function generateMetadata({ params }: { params: params }) {
  const { id } = await params;
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });
  const product = await res.json();
  if (!product) return;
  return {
    title: `${product.title}`,
    description: `${product.title} by ${product.brand} – ${product.description} Available for just $${product.price} with ${product.discountPercentage}% off. Perfect for ${product.category} lovers looking for quality and convenience. Shop now!`,
    keywords: [
      product.title,
      product.brand,
      product.category,
      ...product.tags,
    ].join(", "),
    openGraph: {
      title: `${product.title}`,
      description: `${product.title} by ${product.brand} – ${product.description} Available for just $${product.price} with ${product.discountPercentage}% off. Perfect for ${product.category} lovers looking for quality and convenience. Shop now!`,
      images: product.images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title}`,
      images: product.images,
      description: `${product.title} by ${product.brand} – ${product.description} Available for just $${product.price} with ${product.discountPercentage}% off. Perfect for ${product.category} lovers looking for quality and convenience. Shop now!`,
    },
  };
}
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
