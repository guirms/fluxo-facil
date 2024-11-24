import { ECategory, EMonth } from "./enums";

export interface Transaction {
    description: string;
    date: string;
    category?: ECategory;
    amount: number;
}

interface Planning {
    category: ECategory;
    plannedSpending: number;
    fillColor: string;
    spent: number;
}

interface Month {
    value: EMonth;
    expenses: Transaction[];
    incomes: Transaction[];
    planning: Planning[];
}

export interface FinanceDataResponse {
    name: string;
    months: Month[];
}
