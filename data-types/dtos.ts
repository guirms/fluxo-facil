interface Transaction {
  description: string;
  date: string;
  category?: ECategory;
  amount: number;
}

interface Planning {
  category: ECategory;
  plannedSpending: number;
  percentage: number;
  fillColor: string;
  spent: number;
}

interface ChartData {
  day: string;
  expense: number;
}

interface Month {
  value: EMonth;
  balance: number;
  predictedBalance: number;
  expenses: Transaction[];
  incomes: Transaction[];
  planning: Planning[];
  chartData: ChartData[];
}

interface FinanceData {
  name: string;
  months: Month[];
}
