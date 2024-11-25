import { EMonth, ECategory } from '@/data-types/enums';
import { FinanceDataResponse } from '@/data-types/responses';

const financeDataResponse: FinanceDataResponse = {
    name: 'João Vitor',
    months: [
        {
            value: EMonth.january,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.february,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.march,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.april,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.may,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.june,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.july,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.august,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.september,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.october,
            expenses: [],
            incomes: [],
            planning: []
        },
        {
            value: EMonth.november,
            expenses: [
                { description: 'Almoço', date: '2024-11-01 00:00:00', category: ECategory.food, amount: 532.5 },
                { description: 'Farmácia', date: '2024-11-09 00:00:00', category: ECategory.food, amount: 150.0 },
                { description: 'Academia', date: '2024-11-14 00:00:00', category: ECategory.education, amount: 120.0 },
                { description: 'Cinema', date: '2024-11-16 00:00:00', category: ECategory.leisure, amount: 50.0 },
                { description: 'Transporte', date: '2024-11-23 00:00:00', category: ECategory.leisure, amount: 30.0 },
            ],
            incomes: [
                { description: 'Salário', date: '2024-11-05', category: ECategory.leisure, amount: 3000 },
                { description: 'Aluguel', date: '2024-11-10', amount: 600 },
            ],
            planning: [
                {
                    category: ECategory.education,
                    plannedSpending: 960,
                    fillColor: '#FD764C',
                    spent: 652.1,
                },
                {
                    category: ECategory.leisure,
                    plannedSpending: 600,
                    fillColor: '#FD4C4C',
                    spent: 66.66,
                },
                {
                    category: ECategory.food,
                    plannedSpending: 1400,
                    fillColor: '#4C88FD',
                    spent: 1146.83,
                }
            ]
        },
        {
            value: EMonth.december,
            expenses: [
                { description: 'Mercado', date: '2024-12-02 00:00:00', category: ECategory.food, amount: 543.5 },
                { description: 'Faculdade', date: '2024-12-02 00:00:00', category: ECategory.education, amount: 200.0 },
                { description: 'Festa', date: '2024-12-04 00:00:00', category: ECategory.leisure, amount: 100.0 },
                { description: 'Farmácia', date: '2024-12-09 00:00:00', category: ECategory.food, amount: 150.0 },
                { description: 'Academia', date: '2024-12-14 00:00:00', category: ECategory.education, amount: 120.0 },
                { description: 'Cinema', date: '2024-12-16 00:00:00', category: ECategory.leisure, amount: 50.0 },
                { description: 'Transporte', date: '2024-12-23 00:00:00', category: ECategory.leisure, amount: 30.0 },
                { description: 'Internet', date: '2024-12-28 00:00:00', category: ECategory.education, amount: 100.0 },
                { description: 'Almoço de comemoração', date: '2024-12-30 00:00:00', category: ECategory.food, amount: 307.0 }
            ],
            incomes: [
                { description: 'Salário', date: '2024-12-05', amount: 3000 },
                { description: 'Aluguel', date: '2024-12-10', amount: 600 },
            ],
            planning: [
                {
                    category: ECategory.education,
                    plannedSpending: 960,
                    fillColor: '#FD764C',
                    spent: 652.1,
                },
                {
                    category: ECategory.leisure,
                    plannedSpending: 600,
                    fillColor: '#FD4C4C',
                    spent: 66.66,
                },
                {
                    category: ECategory.food,
                    plannedSpending: 1400,
                    fillColor: '#4C88FD',
                    spent: 1146.83,
                }
            ]
        }
    ],
};

export default financeDataResponse;
