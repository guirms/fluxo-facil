
interface Expense {
    name: string;
    amount: number
}

interface Income {
    name: string;
    amount: number
}

interface PlanningItem {
    category: string;
    percentage: number;
    fillColor: string;
    spent: number;
}

interface ChartDataItem {
    day: string;
    expense: number;
}

interface MonthData {
    name: string;
    balance: number;
    predictedBalance: number;
    expenses: Expense;
    incomes: Income;
    planning: PlanningItem;
    chartData: ChartDataItem;
}

interface UserData {
    name: string;
    months: MonthData;
}
