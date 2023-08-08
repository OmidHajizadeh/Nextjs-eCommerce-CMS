"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { ListItem, ListItemButton, Typography } from "@/lib/Material/ClientWrapper";

type DashboardLinkProps = {
  icon: React.ReactNode;
  title: string;
  route: string
};

const DrawerLink = ({ title, icon, route }: DashboardLinkProps) => {
  const currentPath = usePathname();
  // console.log(currentPath);
  
  const storePath = currentPath.split("/")[1];
  const routePath = currentPath.split("/")[2];

  return (
    <ListItem className="!p-0">
      <Link href={`/${storePath}/${route}`} className="flex w-full items-center">
        <ListItemButton className="flex">
          {icon}
          <Typography className={`font-main font-light text-sm !ms-3 ${routePath === route ? 'text-blue-700': ''}`}>
            {title}
          </Typography>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default DrawerLink;
