"use client";

import { useForm } from "react-hook-form";

import ModalContainer from "@/components/modals/DialogContainer";
import {
  Button,
  DialogActions,
} from "@/lib/Material/ClientWrapper";

type ConfirmModalProps = {
  title: string;
  description: string;
  open: boolean;
  children: () => void;
  visibilityHandler: () => void;
};

const ConfirmModal = ({
  open,
  visibilityHandler,
  title,
  description,
  children,
}: ConfirmModalProps) => {
  const { handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  return (
    <ModalContainer
      title={title}
      description={description}
      open={open}
      visibilityHandler={visibilityHandler}
    >
      <form
        noValidate
        onSubmit={handleSubmit(children)}
        className="mt-4 w-full"
      >
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            type="submit"
            disabled={isSubmitting}
          >
            حذف
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={visibilityHandler}
          >
            کنسل
          </Button>
        </DialogActions>
      </form>
    </ModalContainer>
  );
};

export default ConfirmModal;
