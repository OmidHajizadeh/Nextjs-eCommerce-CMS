"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Billboard } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button, TextField } from "@/lib/Material/ClientWrapper";
import ImageUpload from "@/components/ui/ImageUpload";
import RemoveBillboardModal from "../../_components/RemoveBillboardModal";

type BillboardFormProps = {
  billboard: Billboard | null;
};

type FormValues = {
  label: string;
  imageUrl: string;
};

const BillboardForm = ({ billboard }: BillboardFormProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: billboard || {
      label: "",
      imageUrl: "",
    },
    mode: "onTouched",
  });

  const { errors, isValid, isSubmitting } = formState;

  const [imageUrl, setImageUrl] = useState(billboard?.imageUrl || "");
  const { storeId, billboardId } = useParams();
  const [isConfimOpen, setIsConfimOpen] = useState(false);
  const router = useRouter();

  function onImageUpload(url: string) {
    setImageUrl(url);
  }

  function removeImageHandler() {
    setImageUrl("");
  }

  function onToggleModalHandler() {
    setIsConfimOpen((prev) => !prev);
  }

  async function submitHandler(formData: FormValues) {
    try {
      let response;
      if (billboard) {
        response = await fetch(`/api/${storeId}/billboards/${billboardId}`, {
          method: "PATCH",
          body: JSON.stringify({
            ...formData,
            imageUrl,
          }),
        });
      } else {
        response = await fetch(`/api/${storeId}/billboards`, {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            imageUrl,
          }),
        });
      }
      if (!response.ok) throw new Error();
      router.refresh();
      router.replace(`/${storeId}/billboards/`);
      toast.success(`بیلبورد ${billboard ? "ویرایش" : "ساخته"} شد`);
    } catch (error) {
      toast.error("مشکلی رخ داد. دوباره امتحان کنید");
    }
  }

  return (
    <>
      <RemoveBillboardModal
        billboardId={billboardId as string}
        storeId={storeId as string}
        visibilityHandler={onToggleModalHandler}
        open={isConfimOpen}
      />

      <form onSubmit={handleSubmit(submitHandler)}>
        <section className="flex flex-col">
          <div>
            <TextField
              variant="outlined"
              label="اسم بیلیور"
              className="!font-main text-gray-900"
              {...register("label", {
                required: {
                  value: true,
                  message: "اسم بیلبورد نمیتواند خالی باشد",
                },
                validate: {
                  tooShort: (fieldValue) => {
                    return (
                      fieldValue.trim().length >= 3 ||
                      "اسم بیلبورد باید حداقل 3 حرف باشد"
                    );
                  },
                },
              })}
              helperText={errors.label ? errors.label.message : null}
            />
          </div>
          <div className="mt-4">
            <ImageUpload
              onChange={(url) => {
                onImageUpload(url);
              }}
              onRemove={() => {
                removeImageHandler();
              }}
              disabled={isSubmitting}
              value={imageUrl}
            />
          </div>
          <div className="flex mt-4">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              {...register("imageUrl")}
              disabled={!isValid || isSubmitting || imageUrl === ""}
              className="font-regular !me-3"
            >
              {billboard ? "ویرایش" : "ساخت"}
            </Button>
            {billboard && (
              <Button
                type="button"
                color="error"
                variant="contained"
                disabled={isSubmitting}
                className="font-regular"
                onClick={onToggleModalHandler}
              >
                حذف بیلبورد
              </Button>
            )}
          </div>
        </section>
      </form>
    </>
  );
};

export default BillboardForm;
