"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { AccordionProps } from "@mui/material/Accordion";
import { styled } from "@mui/material";
import Link from "next/link";

import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Button,
  StoreMallDirectoryIcon,
  ExpandMore,
  MenuIcon,
  Toolbar,
  Typography,
  ChevronLeftIcon,
  AddIcon,
  SettingsIcon,
  DynamicFeedIcon,
  CategoryIcon,
} from "@/lib/Material/ClientWrapper";
import {
  AccordionDetails,
  AccordionSummary,
  Divider,
  MuiAccordion,
} from "@/lib/Material/ClientWrapper";
import StoreModal from "@/components/modals/StoreModal";
import DrawerLink from "./DrawerLink";
import { Store } from "@prisma/client";

const drawerWidth = 300;

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:before": {
    display: "none",
  },
}));

type MainDrawerProps = {
  window?: () => Window;
  children: React.ReactNode;
  stores: Store[];
};

export default function MainDrawer({
  window,
  children,
  stores,
}: MainDrawerProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [storeModalOpen, setStoreModalOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const newStoreModalVisibilityHandler = () => {
    setStoreModalOpen(!storeModalOpen);
  };

  const drawer = (
    <Accordion className="!shadow-none">
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className=""
      >
        <StoreMallDirectoryIcon />
        <Typography className="!ms-3">فروشگاه ها</Typography>
      </AccordionSummary>
      <AccordionDetails className="!p-0">
        <List className="!p-0">
          {stores.map((store) => {
            return (
              <ListItem className="!p-0" key={store.id}>
                <Link href={`/${store.id}`} className="w-full">
                  <ListItemButton className="flex">
                    <ChevronLeftIcon fontSize="small" />
                    <Typography className="!font-light !text-sm">
                      {store.name}
                    </Typography>
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
          <ListItem className="!p-0">
            <Button
              onClick={newStoreModalVisibilityHandler}
              color="success"
              className="w-full !rounded-none !p-0"
            >
              <ListItemButton className="flex">
                <AddIcon fontSize="small" />
                <Typography className="!font-light !text-sm">
                  افزودن فروشگاه جدید
                </Typography>
              </ListItemButton>
            </Button>
          </ListItem>
          <StoreModal
            open={storeModalOpen}
            visibilityHandler={newStoreModalVisibilityHandler}
          />
        </List>
      </AccordionDetails>
    </Accordion>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="باز کردن منو"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <div className="flex w-full justify-between">
            <Typography variant="h6" noWrap component="div">
              داشبورد
            </Typography>
            <UserButton afterSignOutUrl="/" />
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
          <Divider />
          <List>
            <DrawerLink icon={<SettingsIcon  fontSize="small" />} route="settings" title="تنظیمات" />
            <DrawerLink icon={<DynamicFeedIcon  fontSize="small" />} route="billboards" title="بیلبورد ها" />
            <DrawerLink icon={<CategoryIcon  fontSize="small" />} route="categories" title="دسته بندی ها" />
          </List>
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
          <Divider />
          <List>
            <DrawerLink icon={<SettingsIcon  fontSize="small" />} route="settings" title="تنظیمات" />
            <DrawerLink icon={<DynamicFeedIcon  fontSize="small" />} route="billboards" title="بیلبورد ها" />
            <DrawerLink icon={<CategoryIcon  fontSize="small" />} route="categories" title="دسته بندی ها" />
          </List>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
