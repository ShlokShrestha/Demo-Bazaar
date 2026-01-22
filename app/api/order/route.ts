import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const user = await currentUser();
  try {
    const where: any = { userId: user?.id };
    if (search) {
      where.description = { contains: search, mode: "insensitive" };
    }
    const total = await prisma.purchasedItem.count({ where });
    const purchasedItems = await prisma.purchasedItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const hasNextPage = page * pageSize < total;
    const hasPrevPage = page > 1;
    return NextResponse.json({
      success: true,
      results: purchasedItems,
      pageInfo: {
        total,
        page,
        hasPrevPage,
        hasNextPage,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
