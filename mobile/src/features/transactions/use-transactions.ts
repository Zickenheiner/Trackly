import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTransactions } from "./transaction.api";
import type { TransactionFilters } from "./transaction.types";

export const transactionsQueryKey = ["transactions"];

export function useTransactionList(filters: TransactionFilters = {}) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => getTransactions(filters),
    placeholderData: keepPreviousData,
  });
}
