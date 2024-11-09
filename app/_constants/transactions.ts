import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

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

export const TRANSACTION_TYPE_OPTIONS = [
  {
    label: "Despesa",
    value: TransactionType.EXPENSE,
  },
  {
    label: "Depósito",
    value: TransactionType.DEPOSIT,
  },
  {
    label: "Investimento",
    value: TransactionType.INVESTMENT,
  },
];

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
    value: TransactionPaymentMethod.BANK_TRANSFER,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_SLIP],
    value: TransactionPaymentMethod.BANK_SLIP,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
    value: TransactionPaymentMethod.CASH,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
    value: TransactionPaymentMethod.CREDIT_CARD,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
    value: TransactionPaymentMethod.DEBIT_CARD,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
    value: TransactionPaymentMethod.PIX,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
    value: TransactionPaymentMethod.OTHER,
  },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOUSING],
    value: TransactionCategory.HOUSING,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.ENTERTAINMENT],
    value: TransactionCategory.ENTERTAINMENT,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SALARY],
    value: TransactionCategory.SALARY,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.UTILITY],
    value: TransactionCategory.UTILITY,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FOOD],
    value: TransactionCategory.FOOD,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.TRANSPORTATION],
    value: TransactionCategory.TRANSPORTATION,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HEALTH],
    value: TransactionCategory.HEALTH,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.EDUCATION],
    value: TransactionCategory.EDUCATION,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.OTHER],
    value: TransactionCategory.OTHER,
  },
];
