import { db } from "../_lib/prisma"; // Ensure you import or define db properly
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns/page";
import AddTransactionButton from "../_components/add-transaction-button";

const TransactionPage = async () => {
  // acessar as transações do banco de dados
  const transactions = await db.transaction.findMany({});
  return (
    <div className="space-y-6 p-6">
      {/* Titulo e Botão */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionPage;
