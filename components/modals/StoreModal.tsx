"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button, DialogActions, TextField } from "@/lib/Material/ClientWrapper";

import DialogContainer from "@/components/modals/DialogContainer";
import { useRouter } from "next/navigation";

export type StoreModalProps = {
  open: boolean;
  visibilityHandler?: () => void;
};

type FormValues = {
  name: string;
};

const StoreModal = ({ open, visibilityHandler }: StoreModalProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
    mode: "onTouched",
  });
  const { replace, refresh } = useRouter()

  const { errors, isSubmitting } = formState;

  async function onSubmitHandler(values: FormValues) {
    try {
      const response = await fetch("/api/stores", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error();

      const storeData = await response.json();
      replace(`/${storeData.id}`);
      refresh();
      if(visibilityHandler) visibilityHandler();
    } catch (error) {
      toast.error("خطایی پیش اومد. یه کم دیگه دوباره امتحان کن...");
    }
  }

  return (
    <DialogContainer
      title="ثبت فروشگاه جدید"
      description="لطفا یک نام برای فروشگاه خود انتخاب کنید."
      open={open}
      visibilityHandler={visibilityHandler}
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
        className="mt-4 w-full"
      >
        <TextField
          label="نام فروشگاه"
          variant="standard"
          disabled={isSubmitting}
          className="w-full"
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
        <DialogActions>
          <Button disabled={isSubmitting} type="submit">ثبت فروشگاه</Button>
          <Button disabled={isSubmitting} type="button" onClick={visibilityHandler}>
            کنسل
          </Button>
        </DialogActions>
      </form>
    </DialogContainer>
  );
};

export default StoreModal;
