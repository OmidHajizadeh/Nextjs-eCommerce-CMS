"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type RemoveCategoryModalProps = {
  open: boolean;
  visibilityHandler: () => void;
  categoryId: string;
  storeId: string;
};

const RemoveCategoryModal = ({
  open,
  visibilityHandler,
  categoryId,
  storeId,
}: RemoveCategoryModalProps) => {
  const router = useRouter();

  return (
    <ConfirmModal
      title="حذف دسته"
      description="آیا مطمئنید میخواهید این دسته را حذف کنید؟"
      open={open}
      visibilityHandler={visibilityHandler}
    >
      {async () => {
        try {
          const response = await fetch(
            `/api/${storeId}/categories/${categoryId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) throw new Error();
          visibilityHandler();
          router.refresh();
          toast.success("دسته با موفقیت حذف شد.");
          router.replace(`/${storeId}/categories/`);
        } catch (error) {
          toast.error(
            "خطایی رخ داد. لطفا اول تمام محصولاتی که از این دسته استفاده میکنند را حذف کنید و مجدداً امتحان کنید."
          );
        }
      }}
    </ConfirmModal>
  );
};

export default RemoveCategoryModal;
