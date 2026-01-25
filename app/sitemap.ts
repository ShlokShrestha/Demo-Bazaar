import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch("https://dummyjson.com/products?limit=100", {
    cache: "no-store",
  });
  const data = await res.json();

  const productEntries: MetadataRoute.Sitemap = data.products.map(
    ({ id }: { id: number }) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/productdetail/${id}`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "weekly",
    }),
  );
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: "yearly",
    },
    ...productEntries,
  ];
}
