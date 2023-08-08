import { auth } from "@clerk/nextjs";

import Heading from "@/components/ui/Heading";
import prismadb from "@/lib/prismadb";
import BillboardForm from "./_components/BillboardForm";

type BillboardPageProps = {
  params: {
    billboardId: string;
    storeId: string;
  };
};

const BillboardPage = async ({
  params: { billboardId, storeId },
}: BillboardPageProps) => {

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return (
    <>
      <Heading
        title={billboard ? "ویرایش بیلبورد" : "ساخت بیلبورد جدید"}
        description={`مدیریت بیلبورد فروشگاه`}
      />

      <hr className="my-4" />

      <BillboardForm billboard={billboard} />
    </>
  );
};

export default BillboardPage;
