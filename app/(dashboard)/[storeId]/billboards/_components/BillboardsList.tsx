"use client";

import { Billboard } from "@prisma/client";

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
import BillboardOptions from "./BillboardOptions";

type BillboardsListProps = {
  billboards: Billboard[];
};

type TableData = {
  label: string;
  date: Date;
  billboardId: string;
};

function createData(label: string, date: Date, billboardId: string): TableData {
  return { label, date, billboardId };
}

export default function BillboardsList({ billboards }: BillboardsListProps) {
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

  for (const billboard of billboards) {
    rows.push(createData(billboard.label, billboard.createdAt, billboard.id));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="billboards table">
        <TableHead>
          <TableRow>
            <TableCell component='th' className="!font-semi-bold">اسم بیلبورد</TableCell>
            <TableCell component='th' className="!font-semi-bold">تاریخ ساخت</TableCell>
            <TableCell component='th' className="!font-semi-bold"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.label}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.label}</TableCell>
              <TableCell>{row.date.toLocaleDateString("fa-IR", {dateStyle: "long"})}</TableCell>
              <TableCell>
                <BillboardOptions billboardId={row.billboardId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
