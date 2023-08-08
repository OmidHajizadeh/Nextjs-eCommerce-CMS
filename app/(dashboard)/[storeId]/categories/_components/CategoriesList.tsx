"use client";

import { Billboard, Category } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@/lib/Material/ClientWrapper";
import { useEffect, useState } from "react";
import CategoryOptions from "./CategoryOptions";

type BillboardsListProps = {
  categories: ({
    billboard: Billboard
  } & Category)[];
};

type TableData = {
  name: string;
  date: Date;
  categoryId: string;
  billboardName: string
};

function createData(name: string, billboardName: string, date: Date, categoryId: string): TableData {
  return { name, date, categoryId, billboardName };
}

export default function CategoriesList({ categories }: BillboardsListProps) {
  const rows: TableData[] = [];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  for (const category of categories) {
    rows.push(createData(category.name, category.billboard.label , category.createdAt, category.id));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="جدول دسته بندی ها">
        <TableHead>
          <TableRow>
            <TableCell component='th' className="!font-semi-bold">اسم دسته بندی</TableCell>
            <TableCell component='th' className="!font-semi-bold">بیلبورد</TableCell>
            <TableCell component='th' className="!font-semi-bold">تاریخ ساخت</TableCell>
            <TableCell component='th' className="!font-semi-bold"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.billboardName}</TableCell>
              <TableCell>{row.date.toLocaleDateString("fa-IR", {dateStyle: "long"})}</TableCell>
              <TableCell>
                <CategoryOptions categoryId={row.categoryId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
