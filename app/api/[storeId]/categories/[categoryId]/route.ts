import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params: { categoryId } }: { params: { categoryId: string } }
) {
  try {

    if (!categoryId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET] : ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { storeId, categoryId },
  }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Billboard label is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID URL is required", {
        status: 400,
      });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    const storeById = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeById) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH] : ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  {
    params: { storeId, categoryId },
  }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }
    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const storeById = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeById) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE] : ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
