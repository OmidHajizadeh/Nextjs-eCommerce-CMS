import prismadb from "@/lib/prismadb";

type DashboardPageProps = {
  params: {
    storeId: string;
  };
};

const DashboardPage = async ({ params: { storeId } }: DashboardPageProps) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId
    }
  })
  return <div>Active Store: { store?.name }</div>;
};

export default DashboardPage;
