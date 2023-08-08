"use client";

import useOrigin from "@/hooks/useOrigin";
import {
  Chip,
  ContentCopyIcon,
  DnsIcon,
  IconButton,
} from "@/lib/Material/ClientWrapper";
import { toast } from "react-hot-toast";

type TextBoxProps = {
  title: string;
  segments: string[];
  accesibility?: "public" | "private";
};

const TextBox = ({
  title,
  segments,
  accesibility = "public",
}: TextBoxProps) => {
  const origin = useOrigin();
  let fullLink = `${origin}/`;

  for (let segment of segments) {
    fullLink += `${segment}/`;
  }
  const link = fullLink.substring(0, fullLink.length - 1);

  function copyHandler() {
    navigator.clipboard.writeText(link);
    toast.success("لینک کپی شد");
  }

  return (
    <div
      dir="ltr"
      className={`flex rounded-md p-3 ${
        accesibility === "public" ? "bg-blue-100" : "bg-orange-100"
      }`}
    >
      <div className="">
        <DnsIcon className="!me-3" />
      </div>
      <div className="flex-grow">
        <div className="!font-mono flex-grow mb-3">
          {title} <Chip className={`!ms-2 ${accesibility === 'private'? '!text-white !bg-red-700': ''}`} label={accesibility} />
        </div>
        <div className="flex rounded-md px-3 items-center justify-between bg-slate-100">
          <code className="!font-mono break-words">{link}</code>
          <IconButton aria-label="copy" onClick={copyHandler}>
            <ContentCopyIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TextBox;
