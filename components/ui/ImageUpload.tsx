"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AddPhotoAlternateIcon, DeleteIcon, Button, IconButton } from "@/lib/Material/ClientWrapper";
import { CldUploadWidget } from "next-cloudinary";

type ImageUploadProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
};

function ImageUpload({ disabled, onChange, onRemove, value }: ImageUploadProps) {
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);
  if (!isMounted) null;

  return (
    <>
      <div className="mb-4 flex items-center flex-wrap gap-4">
        {value && (
            <figure className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
              <IconButton className="z-10 absolute top-2 start-2" type="button" disabled={disabled} onClick={() => onRemove(value)} color="error" size="small">
                <DeleteIcon />
              </IconButton>
              <Image src={value} alt="image" fill className="object-cover border rounded-md" />
            </figure>
          )
        }
      </div>
      <CldUploadWidget onUpload={((result:any) => onChange(result.info.secure_url))} uploadPreset="ikiur3jk">
        {({open, isLoading}) => {
          const onClick = () =>{
            open()
          }
          return (
          <Button variant="outlined" startIcon={<AddPhotoAlternateIcon />} type="button" disabled={isLoading || disabled} onClick={onClick} color="warning" size="small">
            تصویر پس زمینه
          </Button>
        )}}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
