import { auth } from "@clerk/nextjs";

import Heading from "@/components/ui/Heading";
import prismadb from "@/lib/prismadb";
import CategoryForm from "./_components/CategoryForm";

type BillboardPageProps = {
  params: {
    categoryId: string;
    storeId: string;
  };
};

const CategoryPage = async ({
  params: { categoryId, storeId },
}: BillboardPageProps) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
  });

  return (
    <>
      <Heading
        title={category ? "ویرایش دسته" : "ساخت دسته جدید"}
        description={`مدیریت دسته بندی`}
      />

      <hr className="my-4" />

      <CategoryForm category={category} billboards={billboards} />
    </>
  );
};

export default CategoryPage;
