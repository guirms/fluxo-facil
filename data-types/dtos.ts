interface TransactionDto {
  description: any;
  name: string;
  date: string;
  category: string;
  amount: number;
}

interface IncomeDto {
  name: string;
  amount: number;
}

interface PlanningDto {
  category: string;
  percentage: number;
  fillColor: string;
  spent: number;
}

interface ChartDataDto {
  day: string;
  expense: number;
}

interface MonthDto {
  name: string;
  balance: number;
  predictedBalance: number;
  expenses: TransactionDto[];
  incomes: TransactionDto[];
  planning: PlanningDto[];
  chartData: ChartDataDto[];
}

interface FinanceDataDto {
  name: string;
  months: MonthDto[];
}
