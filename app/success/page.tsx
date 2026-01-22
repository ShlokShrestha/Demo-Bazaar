import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Payment Successful
        </h1>
        <p className="mt-3 text-gray-600">
          Your payment was processed successfully. You can now continue using
          the service.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="w-full inline-flex justify-center items-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition"
          >
            Go Home
          </Link>
          <Link
            href="/orders"
            className="w-full inline-flex justify-center items-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            View Orders
          </Link>
        </div>
        <p className="mt-6 text-xs text-gray-400">Thank you for choosing us</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
