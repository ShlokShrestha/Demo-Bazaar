import { Product } from "@/types/type";
import Image from "next/image";

const ProductCard = async ({ page }: { page: number }) => {
  const limit = 12;
  const skip = (page - 1) * limit;
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return (
    <div className="p-4">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {data.products.map((item: Product) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-200"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 flex flex-col justify-between h-48">
              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold text-lg">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-yellow-500">
                    {"★".repeat(Math.round(item.rating)) +
                      "☆".repeat(5 - Math.round(item.rating))}
                  </span>
                </div>
                {item.discountPercentage > 0 && (
                  <span className="text-red-500 text-sm">
                    {item.discountPercentage.toFixed(2)}% off
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
