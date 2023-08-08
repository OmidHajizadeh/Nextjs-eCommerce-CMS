"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type RemoveBillboardModalProps = {
  open: boolean;
  visibilityHandler: () => void;
  billboardId: string;
  storeId: string;
};

const RemoveBillboardModal = ({
  open,
  visibilityHandler,
  billboardId,
  storeId,
}: RemoveBillboardModalProps) => {
  const router = useRouter();

  return (
    <ConfirmModal
      title="حذف بیلبورد"
      description="آیا مطمئنید میخواهید این بیلبورد را حذف کنید؟"
      open={open}
      visibilityHandler={visibilityHandler}
    >
      {async () => {
        try {
          const response = await fetch(
            `/api/${storeId}/billboards/${billboardId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) throw new Error();
          visibilityHandler();
          router.refresh();
          toast.success("بیلبورد با موفقیت حذف شد.");
          router.replace(`/${storeId}/billboards/`);
        } catch (error) {
          toast.error(
            "خطایی رخ داد. لطفا اول تمام دسته هایی که از این بیلبورد استفاده میکنند را حذف کنید و مجدداً امتحان کنید."
          );
        }
      }}
    </ConfirmModal>
  );
};

export default RemoveBillboardModal;
