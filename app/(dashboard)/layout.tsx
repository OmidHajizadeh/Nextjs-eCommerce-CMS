import { getStores } from "@/lib/StoreActions";
import MainDrawer from "@/components/dashboard-drawer/MainDrawer";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const stores = await getStores(userId);

  return (
    <MainDrawer stores={stores}>
      <section className="p-4">{children}</section>
    </MainDrawer>
  );
};

export default DashboardLayout;
