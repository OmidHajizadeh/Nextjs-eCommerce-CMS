import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@/lib/Material/ClientWrapper";

type DialogContainerProps = {
  children: React.ReactNode;
  open: boolean;
  title: string;
  description: string;
  visibilityHandler?: () => void;
};

const DialogContainer = ({
  children,
  open,
  title,
  description,
  visibilityHandler,
}: DialogContainerProps) => {
  return (
    <Dialog open={open} onClose={visibilityHandler}>
      <DialogTitle className="!font-semi-bold">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogContainer;
