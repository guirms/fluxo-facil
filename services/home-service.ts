import { FinanceDataResponse, Transaction } from "@/data-types/responses";

class HomeService {
    static getFinanceDataDto(financeDataResponse: FinanceDataResponse): FinanceDataDto {         
        const monthsDto: MonthDto[] = [];

        for (let month of financeDataResponse.months) {  
            const balance = this.getBalance(month.expenses, month.incomes);
            const predictedBalance = this.getPredictedBalance(balance, month.expenses, month.incomes);

            const expensesDto: TransactionDto[] = [];

            for (let expense of month.expenses)
            {
                expensesDto.push({
                    name: expense.description,
                    amount: expense.amount
                });
            }

            const incomesDto: TransactionDto[] = [];

            for (let income of month.incomes)
            {
                incomesDto.push({
                    name: income.description,
                    amount: income.amount
                });
            }

            const planningDto: PlanningDto[] = [];

            for (let planning of month.planning)
                {
                    planningDto.push({
                        category: planning.category,                        
                        percentage: planning.spent * 100 / planning.plannedSpending,
                        fillColor: planning.fillColor,
                        spent: planning.spent
                    });
                }

            const chartDataDto = this.getChartDto(month.expenses);            

            const monthDto: MonthDto = {
                name: month.value,
                balance: balance,
                predictedBalance: predictedBalance,
                expenses: expensesDto,
                incomes: incomesDto,
                planning: planningDto,
                chartData:chartDataDto
            };

            monthsDto.push(monthDto);
        }

        return {
            name: financeDataResponse.name,
            months: monthsDto
        };
    }

    static getPredictedBalance(balance: number, expenses: Transaction[], incomes: Transaction[]) {
        const totalIncomes = incomes
            .filter(e => new Date(e.date).getTime() > Date.now())
            .reduce((acc, income) => acc + (income.amount || 0), 0);
        
        const totalExpenses = expenses
            .filter(e => new Date(e.date).getTime() > Date.now())
            .reduce((acc, expense) => acc + (expense.amount || 0), 0);
    
        return balance + totalIncomes - totalExpenses;
    }

    private static getBalance(expenses: Transaction[], incomes: Transaction[]): number {
        const totalIncomes = incomes
            .filter(e => new Date(e.date).getTime() <= Date.now())
            .reduce((acc, income) => acc + (income.amount || 0), 0);
        
        const totalExpenses = expenses
            .filter(e => new Date(e.date).getTime() <= Date.now())
            .reduce((acc, expense) => acc + (expense.amount || 0), 0);
    
        return totalIncomes - totalExpenses;
    }
    

    private static getChartDto(expenses: Transaction[]): ChartDataDto[] {
        const firstExpenseData = expenses[0].date;
        const lastExpenseData = expenses[expenses.length - 1].date;

        const dayIntervals = this.divideDatesIntoParts(firstExpenseData, lastExpenseData);
        
        const chartDataDto: ChartDataDto[] = [];

        for (let day of dayIntervals) {
            const expensesSumUntilDay = expenses.filter(expense => new Date(expense.date) <= day).reduce((acc, expense) => acc + expense.amount, 0);

            chartDataDto.push({
                day: this.formatDate(day),
                expense: expensesSumUntilDay
            });
        }

        return chartDataDto;
    }

    private static divideDatesIntoParts(startDate: string, endDate: string): Date[] {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayDifference = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
        if (dayDifference < 6) {
            const days: Date[] = [];
            for (let i = 0; i <= dayDifference; i++) {
                const newDate = new Date(start);
                newDate.setDate(start.getDate() + i);
                days.push(newDate);
            }

            return days;
        } else {
            const interval = Math.floor(dayDifference / 6);
            const dates: Date[] = [new Date(startDate)];
    
            for (let i = 1; i < 6; i++) {
                const newDate = new Date(start);
                newDate.setDate(start.getDate() + i * interval);

                dates.push(newDate);
            }
    
            dates.push(new Date(endDate));

            return dates;
        }
    }

    private static formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');

        return `${day}/${month}`;
    }
}
export default HomeService;

// interface TransactionDto {
//     name: string;
//     amount: number;
//   }
  
//   interface IncomeDto {
//     name: string;
//     amount: number;
//   }
  
//   interface PlanningDto {
//     category: string;
//     percentage: number;
//     fillColor: string;
//     spent: number;
//   }
  
//   interface ChartDataDto {
//     day: string;
//     expense: number;
//   }
  
//   interface MonthDto {
//     name: string;
//     balance: number;
//     predictedBalance: number;
//     expenses: TransactionDto[];
//     incomes: TransactionDto[];
//     planning: PlanningDto[];
//     chartData: ChartDataDto[];
//   }
  
//   interface FinanceDataDto {
//     name: string;
//     months: MonthDto[];
//   }
  
  