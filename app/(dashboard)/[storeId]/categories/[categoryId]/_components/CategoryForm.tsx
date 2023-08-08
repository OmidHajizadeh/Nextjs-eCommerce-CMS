"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Billboard, Category } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import {
  Button,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@/lib/Material/ClientWrapper";
import RemoveCategoryModal from "../../_components/RemoveCategoryModal";
import { SelectChangeEvent } from "@mui/material";

type CategoryFormProps = {
  category: Category | null;
  billboards: Billboard[] | null;
};

type FormValues = {
  name: string;
  billboardId: string;
};

const BillboardForm = ({ category, billboards }: CategoryFormProps) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: category || {
      name: "",
      billboardId: "",
    },
    mode: "onTouched",
  });

  const { errors, isValid, isSubmitting } = formState;

  const { storeId, categoryId } = useParams();
  const [isConfimOpen, setIsConfimOpen] = useState(false);
  const [billboardValue, setBillboardValue] = useState(category?.billboardId || '');
  const router = useRouter();

  function onToggleModalHandler() {
    setIsConfimOpen((prev) => !prev);
  }
  function billboardChangeHandler(event: SelectChangeEvent) {
    setBillboardValue(event.target.value as string);
  }

  async function submitHandler(formData: FormValues) {
    try {
      let response;
      if (category) {
        response = await fetch(`/api/${storeId}/categories/${categoryId}`, {
          method: "PATCH",
          body: JSON.stringify({
            ...formData,
            billboardId: billboardValue
          }),
        });
      } else {
        response = await fetch(`/api/${storeId}/categories`, {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            billboardId: billboardValue
          }),
        });
      }
      if (!response.ok) throw new Error();
      router.refresh();
      router.replace(`/${storeId}/categories/`);
      toast.success(`دسته ${category ? "ویرایش" : "ساخته"} شد`);
    } catch (error) {
      toast.error("مشکلی رخ داد. دوباره امتحان کنید");
    }
  }

  return (
    <>
      <RemoveCategoryModal
        categoryId={categoryId as string}
        storeId={storeId as string}
        visibilityHandler={onToggleModalHandler}
        open={isConfimOpen}
      />

      <form onSubmit={handleSubmit(submitHandler)}>
        <section className="flex flex-col gap-4">
          <div>
            <TextField
              variant="outlined"
              label="اسم دسته بندی"
              className="!font-main text-gray-900"
              {...register("name", {
                required: {
                  value: true,
                  message: "اسم دسته نمیتواند خالی باشد",
                },
                validate: {
                  tooShort: (fieldValue) => {
                    return (
                      fieldValue.trim().length >= 3 ||
                      "اسم دسته باید حداقل 3 حرف باشد"
                    );
                  },
                },
              })}
              helperText={errors.name ? errors.name.message : null}
            />
          </div>
          <div className="w-[248px]">
            <FormControl fullWidth>
              <InputLabel id="billboard-select">بیلبورد</InputLabel>
              <Select
                labelId="billboard-select"
                id="demo-simple-select"
                value={billboardValue}
                label="بیلبورد"
                onChange={billboardChangeHandler}
              >
                {billboards?.map((billboard) => {
                  return (
                    <MenuItem value={billboard.id} key={billboard.id}>
                      {billboard.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className="flex mt-4">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              {...register("billboardId")}
              disabled={!isValid || isSubmitting || billboardValue === ""}
              className="font-regular !me-3"
            >
              {category ? "ویرایش" : "ساخت"}
            </Button>
            {category && (
              <Button
                type="button"
                color="error"
                variant="contained"
                disabled={isSubmitting}
                className="font-regular"
                onClick={onToggleModalHandler}
              >
                حذف دسته
              </Button>
            )}
          </div>
        </section>
      </form>
    </>
  );
};

export default BillboardForm;
