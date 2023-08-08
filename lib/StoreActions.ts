import prismadb from "@/lib/prismadb";

export async function getStores(userId: string) {
  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });
  return stores;
}

export async function getStore(userId: string) {
  const store = await prismadb.store.findFirst({
    where: {
      userId: userId,
    },
  });
  return store;
}
