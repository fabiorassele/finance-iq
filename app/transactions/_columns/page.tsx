"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, PencilIcon, TrashIcon } from "lucide-react";

export const TRANSACTION_CATEGORY_LABELS = {
  HOUSING: "Moradia",
  ENTERTAINMENT: "Entretenimento",
  SALARY: "Salário",
  UTILITY: "Utilidade",
  FOOD: "Alimentação",
  TRANSPORTATION: "Transporte",
  HEALTH: "Saúde",
  EDUCATION: "Educação",
  OTHER: "Outros",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  PIX: "PIX",
  OTHER: "Outros",
};

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT) {
        return (
          <Badge className="bg-muted font-bold text-primary hover:bg-muted">
            <CircleIcon size={10} className="mr-2 fill-primary" />
            Depósito
          </Badge>
        );
      }
      if (transaction.type === TransactionType.EXPENSE) {
        return (
          <Badge className="bg-danger bg-opacity-10 font-bold text-danger">
            <CircleIcon size={10} className="mr-2 fill-danger" />
            Despesa
          </Badge>
        );
      }
      return (
        <Badge className="bg-muted font-bold text-white hover:bg-muted">
          <CircleIcon size={10} className="mr-2 fill-white" />
          Investimento
        </Badge>
      );
    },
  },

  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: () => {
      return (
        <div className="space-x-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <PencilIcon size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon size={16} />
          </Button>
        </div>
      );
    },
  },
];
