import Link from "next/link";

import Heading from "@/components/ui/Heading";
import { AddIcon, Button } from "@/lib/Material/ClientWrapper";
import prismadb from "@/lib/prismadb";
import CategoriesList from "./_components/CategoriesList";
import URLBox from "@/components/ui/URLBox";

type CategoriesPageProps = {
  params: {
    storeId: string;
  };
};

const CategoriesPage = async ({ params: { storeId } }: CategoriesPageProps) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <>
      <Heading
        description="دسته بندی های فروشگاه را از اینحا آپدیت کنید"
        title={`دسته بندی ها (${categories.length})`}
      />

      <hr className="my-3" />

      <Button variant="contained" color="success" startIcon={<AddIcon />}>
        <Link href={`/${storeId}/categories/new`}>افزودن دسته جدید</Link>
      </Button>

      <hr className="my-3" />

      <CategoriesList categories={categories} />

      <hr className="my-3" /> 

      <Heading
        description="از طریق لینک های زیر برای ویرایش دسته ها اقدام کنید"
        title={'API های مربوطه'}
      />

      <div className="space-y-3">
        <URLBox title="GET" segments={['api', storeId, 'categories']} />
        <URLBox title="POST" accesibility="private" segments={['api', storeId, 'categories']} />
        <URLBox title="GET" segments={['api', storeId, 'categories', '{categoryId}']} />
        <URLBox title="PATCH" accesibility="private" segments={['api', storeId, 'categories', '{categoryId}']} />
        <URLBox title="DELETE" accesibility="private" segments={['api', storeId, 'categories', '{categoryId}']} />
      </div>

    </>
  );
};

export default CategoriesPage;
