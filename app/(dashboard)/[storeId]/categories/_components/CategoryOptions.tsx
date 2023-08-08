import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import {
  ContentCopyIcon,
  DeleteIcon,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MoreHorizIcon,
  UpdateIcon,
} from "@/lib/Material/ClientWrapper";
import RemoveBillboardModal from "./RemoveCategoryModal";

type CategoryOptionsProps = {
  categoryId: string;
};

export default function CategoryOptions({
  categoryId,
}: CategoryOptionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();
  const { storeId } = useParams();

  const [isConfimOpen, setIsConfimOpen] = useState(false);
  function onToggleModalHandler() {
    setIsConfimOpen((prev) => !prev);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(categoryId);
    toast.success("آی دی دسته بندی کپی شد");
    handleClose();
  };

  const updateHandler = () => {
    router.push(`/${storeId}/categories/${categoryId}`);
    handleClose();
  };

  return (
    <>
      <RemoveBillboardModal
        categoryId={categoryId as string}
        storeId={storeId as string}
        visibilityHandler={onToggleModalHandler}
        open={isConfimOpen}
      />

      <IconButton
        aria-label="more"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="!text-sm" onClick={copyHandler}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          کپی آی دی
        </MenuItem>
        <MenuItem className="!text-sm" onClick={updateHandler}>
          <ListItemIcon>
            <UpdateIcon fontSize="small" />
          </ListItemIcon>
          ویرایش
        </MenuItem>
        <MenuItem className="!text-sm" onClick={onToggleModalHandler}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          حذف دسته
        </MenuItem>
      </Menu>
    </>
  );
}
