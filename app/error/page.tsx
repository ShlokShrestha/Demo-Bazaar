import Link from "next/link";

const PaymentErrorPage = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center bg-gray-50 ">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">Payment Failed</h1>
        <p className="mt-3 text-gray-600">
          Something went wrong while processing your payment. Please try again
          or use a different payment method.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="w-full inline-flex justify-center items-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Go Home
          </Link>
        </div>
        <p className="mt-6 text-xs text-gray-400">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

export default PaymentErrorPage;
