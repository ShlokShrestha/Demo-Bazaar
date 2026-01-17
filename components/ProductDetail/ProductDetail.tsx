import { Product } from "@/types/type";
import Image from "next/image";
import AddToCart from "./AddToCart";

type Props = {
  product: Product;
};

const ProductDetail = async (props: Props) => {
  const { product } = props;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 grid grid-cols-1 gap-4">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>

            <div className="flex items-center mt-4 gap-4">
              <span className="text-2xl font-bold text-blue-600">
                Rs{product.price.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-red-500 font-semibold">
                  {product.discountPercentage.toFixed(2)}% OFF
                </span>
              )}
            </div>

            <div className="flex items-center mt-2 gap-2">
              <span className="text-yellow-500">
                {"★".repeat(Math.round(product.rating)) +
                  "☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span className="text-gray-500">
                ({product.reviews.length} reviews)
              </span>
            </div>

            <div className="mt-4 space-y-1 text-gray-700">
              <p>
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p>
                <span className="font-semibold">SKU:</span> {product.sku}
              </p>
              <p>
                <span className="font-semibold">Availability:</span>{" "}
                {product.availabilityStatus}
              </p>
              <p>
                <span className="font-semibold">Weight:</span> {product.weight}{" "}
                g
              </p>
              <p>
                <span className="font-semibold">Dimensions:</span> W:{" "}
                {product.dimensions.width} H: {product.dimensions.height} D:{" "}
                {product.dimensions.depth} mm
              </p>
              <p>
                <span className="font-semibold">Warranty:</span>{" "}
                {product.warrantyInformation}
              </p>
              <p>
                <span className="font-semibold">Shipping:</span>{" "}
                {product.shippingInformation}
              </p>
              <p>
                <span className="font-semibold">Return Policy:</span>{" "}
                {product.returnPolicy}
              </p>
            </div>
          </div>

          {/* Purchase Actions */}
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
