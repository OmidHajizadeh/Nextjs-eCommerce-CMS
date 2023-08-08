"use client";

import { useForm } from "react-hook-form";

import { Button, TextField } from "@/lib/Material/ClientWrapper";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Store } from "@prisma/client";
import { useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";

type StoreFormProps = {
  store: Store;
};

type FormValues = {
  name: string;
};

const StoreForm = ({ store }: StoreFormProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      name: store.name,
    },
    mode: "onTouched",
  });

  const router = useRouter();

  const { errors, isValid, isSubmitting } = formState;

  const [isConfimOpen, setIsConfimOpen] = useState(false);

  function onToggleModalHandler() {
    setIsConfimOpen((prev) => !prev);
  }

  async function submitHandler(formData: FormValues) {
    try {
      const response = await fetch("/api/stores/" + store.id, {
        method: "PATCH",
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error();
      router.refresh();
      toast.success("تغییرات ذخیره شد.");
    } catch (error) {
      toast.error("مشکلی پیش اومد. دوباره امتحان کن");
    }
  }

  return (
    <>

      <ConfirmModal
        title={`حذف فروشگاه ${store.name}`}
        description="اطلاعات این فروشگاه قابل بازگشت نخواهد بود. آیا مطمئن هستید میخواهید آن را حذف کنید ؟"
        open={isConfimOpen}
        visibilityHandler={onToggleModalHandler}
      >
        {async () => {
           try {
            const response = await fetch("/api/stores/" + store.id, {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
              },
            });
      
            if (!response.ok) throw new Error();
      
            onToggleModalHandler();
            toast.success("فروشگاه با موفقیت حذف شد.");
            router.refresh();
            router.replace("/");
          } catch (error) {
            toast.error("خطایی رخ داد. لطفا مجدداً امتحان کنید.");
          }
        }}
      </ConfirmModal>

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-4">
          <div>
            <TextField
              variant="standard"
              label="اسم فروشگاه"
              className="!font-main text-gray-900"
              {...register("name", {
                required: {
                  value: true,
                  message: "نام فروشگاه نمیتواند خالی باشد",
                },
                validate: {
                  tooShort: (fieldValue) => {
                    return (
                      fieldValue.trim().length >= 3 ||
                      "نام فروشگاه باید حداقل 3 حرف باشد"
                    );
                  },
                },
              })}
              helperText={errors.name ? errors.name.message : null}
            />
          </div>
        </div>
        <div className="flex mt-4">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!isValid || isSubmitting}
            className="font-regular !me-3"
          >
            ثبت تغییرات
          </Button>
          <Button
            type="button"
            color="error"
            variant="contained"
            className="font-main font-regular"
            onClick={onToggleModalHandler}
          >
            حذف فروشگاه
          </Button>
        </div>
      </form>
      
    </>
  );
};

export default StoreForm;
