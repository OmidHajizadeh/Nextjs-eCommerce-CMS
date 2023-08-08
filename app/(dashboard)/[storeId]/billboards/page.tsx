import Link from "next/link";

import Heading from "@/components/ui/Heading";
import { AddIcon, Button } from "@/lib/Material/ClientWrapper";
import prismadb from "@/lib/prismadb";
import BillboardsList from "./_components/BillboardsList";
import URLBox from "@/components/ui/URLBox";

type BillboardsPageProps = {
  params: {
    storeId: string;
  };
};

const BillboardsPage = async ({ params: { storeId } }: BillboardsPageProps) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <>
      <Heading
        description="بیلبورد های فروشگاه را از اینحا آپدیت کنید"
        title={`بیلبورد ها (${billboards.length})`}
      />

      <hr className="my-3" />

      <Button variant="contained" color="success" startIcon={<AddIcon />}>
        <Link href={`/${storeId}/billboards/new`}>افزودن بیلبورد جدید</Link>
      </Button>

      <hr className="my-3" />

      <BillboardsList billboards={billboards} />

      <hr className="my-3" /> 

      <Heading
        description="از طریق لینک های زیر برای ویرایش بیلبورد ها اقدام کنید"
        title={'API های مربوطه'}
      />

      <div className="space-y-3">
        <URLBox title="GET" segments={['api', storeId, 'billboards']} />
        <URLBox title="POST" accesibility="private" segments={['api', storeId, 'billboards']} />
        <URLBox title="GET" segments={['api', storeId, 'billboards', '{billboardId}']} />
        <URLBox title="PATCH" accesibility="private" segments={['api', storeId, 'billboards', '{billboardId}']} />
        <URLBox title="DELETE" accesibility="private" segments={['api', storeId, 'billboards', '{billboardId}']} />
      </div>

    </>
  );
};

export default BillboardsPage;
