import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Heading from "@/components/ui/Heading";
import prismadb from "@/lib/prismadb";
import StoreForm from "./_components/StoreForm";
import URLBox from "@/components/ui/URLBox";

type StoreSettingsProps = {
  params: {
    storeId: string;
  };
};

const StoreSettingsPage = async ({
  params: { storeId },
}: StoreSettingsProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <>
      <Heading title="تنظیمات" description={`مدیریت فرشگاه ${store.name}`} />

      <hr className="my-4" />
      
      <StoreForm store={store} />
      
      <hr className="my-4" />
      
      <div className="space-y-3">
        <URLBox title="NEXT_PUBLIC_API_URL" segments={['api', 'stores', storeId]} />
      </div>
      
    </>
  );
};

export default StoreSettingsPage;
