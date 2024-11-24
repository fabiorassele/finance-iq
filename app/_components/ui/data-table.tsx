"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import React from "react";
import { Input } from "./input";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";

interface DataTableProps<
  TData extends {
    name: string;
    category: string;
    paymentMethod: string;
    amount: number;
    date: Date;
  },
  TValue,
> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<
  TData extends {
    name: string;
    category: string;
    paymentMethod: string;
    amount: number;
    date: Date;
  },
  TValue,
>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState(""); // Novo estado para filtro global

  // Filtro global expandido para pesquisar em vários campos
  const globalFilterFn = (
    row: {
      original: {
        name: string;
        category: string;
        paymentMethod: string;
        amount: number;
        date: Date;
      };
    },
    columnId: string,
    filterValue: string,
  ) => {
    const transaction = row.original;

    // Traduza os valores relevantes
    const translatedCategory =
      TRANSACTION_CATEGORY_LABELS[
        transaction.category as keyof typeof TRANSACTION_CATEGORY_LABELS
      ] ?? "";

    const translatedPaymentMethod =
      TRANSACTION_PAYMENT_METHOD_LABELS[
        transaction.paymentMethod as keyof typeof TRANSACTION_PAYMENT_METHOD_LABELS
      ] ?? "";

    // Formate os valores
    const formattedAmount = transaction.amount.toString();
    const formattedDate = new Intl.DateTimeFormat("pt-BR").format(
      new Date(transaction.date),
    );

    // Combine os campos que deseja pesquisar
    const combinedValues = `${transaction.name} ${translatedCategory} ${translatedPaymentMethod} ${formattedAmount} ${formattedDate}`;

    // Verifique se qualquer parte contém o valor filtrado
    return combinedValues
      .toLowerCase()
      .trim()
      .includes(filterValue.toLowerCase().trim());
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn, // Use a função de filtro expandida
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4 pl-4">
        <Input
          placeholder="Filtrar transações"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado correspondente foi encontrado. Tente ajustar o
                filtro.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
 