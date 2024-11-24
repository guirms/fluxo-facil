import { EMonth, ECategory } from "@/data-types/enums";
import { FinanceDataResponse } from "@/data-types/responses";

const financeDataResponse: FinanceDataResponse = {
    name: 'João Vitor',
    months: [
        {
            value: EMonth.june,
            expenses: [
                { description: 'Mercado', date: '2024-06-01 00:00:00', category: ECategory.food, amount: 543.5 },
                { description: 'Faculdade', date: '2024-06-01 00:00:00', category: ECategory.education, amount: 200.0 },
                { description: 'Festa', date: '2024-06-04 00:00:00', category: ECategory.leisure, amount: 100.0 },
                { description: 'Farmácia', date: '2024-06-09 00:00:00', category: ECategory.food, amount: 150.0 },
                { description: 'Academia', date: '2024-06-14 00:00:00', category: ECategory.education, amount: 120.0 },
                { description: 'Cinema', date: '2024-06-16 00:00:00', category: ECategory.leisure, amount: 50.0 },
                { description: 'Transporte', date: '2024-06-23 00:00:00', category: ECategory.leisure, amount: 30.0 },
                { description: 'Internet', date: '2024-06-28 00:00:00', category: ECategory.education, amount: 100.0 },
                { description: 'Aluguel', date: '2024-06-30 00:00:00', category: ECategory.food, amount: 1200.0 }

            ],
            incomes: [
                { description: 'Salário', date: '2024-06-05', amount: 3000 },
                { description: 'Aluguel', date: '2024-06-10', amount: 600 },
            ],
            planning: [
                {
                    category: ECategory.education,
                    plannedSpending: 660,
                    fillColor: '#FD764C',
                    spent: 652.1,
                },
                {
                    category: ECategory.leisure,
                    plannedSpending: 300,
                    fillColor: '#FD4C4C',
                    spent: 66.66,
                },
                {
                    category: ECategory.food,
                    plannedSpending: 1200,
                    fillColor: '#4C88FD',
                    spent: 1146.83,
                }
            ]
        }
    ],
};

export default financeDataResponse;