"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { CardContent } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction, TransactionType } from "@prisma/client";
import TransactionCategoryIcon from "./category-icon";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { useState } from "react";
import { FilterIcon } from "lucide-react";

interface MobileTransactionsProps {
  MobileTransactions: Transaction[];
}

const MobileTransactions = ({
  MobileTransactions,
}: MobileTransactionsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);

  const handleEditClick = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setDialogIsOpen(true);
  };

  // Função para definir a cor do valor
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-danger";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }
    return "text-white";
  };

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };

  // Filtra as transações com base na pesquisa e no filtro de categoria
  const filteredTransactions = MobileTransactions.filter((transaction) => {
    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory
      ? transaction.category === filterCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  // Agrupa transações por data
  const groupedTransactions = filteredTransactions.reduce(
    (acc, transaction) => {
      const dateKey = new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      });
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(transaction);
      return acc;
    },
    {} as Record<string, Transaction[]>,
  );

  // Ordena as datas em ordem decrescente
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    const dateA = new Date(a.split(" ").reverse().join(" "));
    const dateB = new Date(b.split(" ").reverse().join(" "));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <ScrollArea className="rounded-md border">
      <CardContent className="space-y-6 p-4">
        {/* Barra de ferramentas */}
        <div className="mb-4 flex items-center gap-4">
          {/* Campo de pesquisa */}
          <Input
            type="text"
            placeholder="Pesquisar transações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />

          {/* Botão de filtros */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <FilterIcon size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-4">
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilterCategory(null)}
                  className={!filterCategory ? "font-bold" : ""}
                >
                  Todas as categorias
                </Button>
                {(
                  Object.keys(TRANSACTION_CATEGORY_LABELS) as Array<
                    keyof typeof TRANSACTION_CATEGORY_LABELS
                  >
                ).map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterCategory(category)}
                    className={
                      filterCategory === category
                        ? "font-bold text-primary"
                        : ""
                    }
                  >
                    {TRANSACTION_CATEGORY_LABELS[category]}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Lista de transações */}
        {sortedDates.map((date) => (
          <div key={date} className="mb-6">
            {/* Data */}
            <div className="mb-4 text-xs font-semibold text-muted-foreground">
              {date}
            </div>
            {/* Lista de transações dessa data */}
            {groupedTransactions[date].map((transaction) => (
              <div
                key={transaction.id}
                className="mb-4 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <TransactionCategoryIcon category={transaction.category} />
                  <div className="flex flex-col">
                    {/* Nome */}
                    <span className="w-20 truncate text-xs font-medium sm:w-full sm:text-sm">
                      {transaction.name}
                    </span>
                    {/* Categoria e Método de Pagamento */}
                    <span className="text-xs text-muted-foreground">
                      {TRANSACTION_CATEGORY_LABELS[transaction.category]} |{" "}
                      {
                        TRANSACTION_PAYMENT_METHOD_LABELS[
                          transaction.paymentMethod
                        ]
                      }
                    </span>
                  </div>
                </div>
                {/* Valor e Popover */}
                <div className="flex items-center gap-3">
                  <div
                    className={`${getAmountColor(
                      transaction,
                    )} text-xs font-bold`}
                  >
                    {getAmountPrefix(transaction)}
                    {formatCurrency(Number(transaction.amount))}
                  </div>
                  {/* Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                      >
                        ⋮
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="absolute -right-[17px] w-40 p-2">
                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(transaction)}
                        >
                          Editar
                        </Button>
                        {/* Botão de exclusão */}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => console.log("Delete transaction")}
                        >
                          Excluir
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        ))}
      </CardContent>

      {/* Modal de edição */}
      {currentTransaction && (
        <UpsertTransactionDialog
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
          defaultValues={{
            ...currentTransaction,
            amount: Number(currentTransaction.amount),
          }}
          transactionId={currentTransaction.id}
        />
      )}
    </ScrollArea>
  );
};

export default MobileTransactions;
