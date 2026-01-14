import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, productName, transactionId, method } = await req.json();
    if (!amount || !productName || !transactionId || !method) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const khaltiConfig = {
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      website_url: process.env.NEXT_PUBLIC_BASE_URL!,
      amount: Math.round(parseFloat(amount) * 100),
      purchase_order_id: transactionId,
      purchase_order_name: productName,
      customer_info: {
        name: "Test User",
        email: "test@test.com",
        phone: "9800000000",
      },
    };

    const response = await fetch(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(khaltiConfig),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Khalti initiation failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log(data);
    return NextResponse.json({ khaltiPaymentUrl: data.payment_url });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
