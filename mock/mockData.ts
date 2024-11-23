const financeData: FinanceData = {
    name: 'João Vitor',
    months: [
        {
            value: EMonth.Junho,
            balance: 2706.5,
            predictedBalance: 2024.0,
            expenses: [
                { description: 'Mercado', date: '2024-06-01', category: ECategory.food, amount: 543.5 },
                { description: 'Faculdade', date: '2024-06-01', category: ECategory.education, amount: 200.0 },
                { description: 'Festa', date: '2024-06-04', category: ECategory.leisure, amount: 100.0 },
                { description: 'Farmácia', date: '2024-06-09', category: ECategory.food, amount: 150.0 },
                { description: 'Academia', date: '2024-06-14', category: ECategory.education, amount: 120.0 },
                { description: 'Cinema', date: '2024-06-16', category: ECategory.leisure, amount: 50.0 },
                { description: 'Transporte', date: '2024-06-23', category: ECategory.leisure, amount: 30.0 },
                { description: 'Internet', date: '2024-06-28', category: ECategory.education, amount: 100.0 },
                { description: 'Aluguel', date: '2024-06-30', category: ECategory.food, amount: 1200.0 }

            ],
            incomes: [
                { description: 'Salário', date: '2024-06-05', amount: 3000 },
                { description: 'Aluguel', date: '2024-06-10', amount: 600 },
            ],
            planning: [
                {
                    category: ECategory.education,
                    plannedSpending: 600,
                    percentage: 90,
                    fillColor: '#FD764C',
                    spent: 652.1,
                },
                {
                    category: ECategory.leisure,
                    plannedSpending: 300,
                    percentage: 50,
                    fillColor: '#FD4C4C',
                    spent: 66.66,
                },
                {
                    category: ECategory.food,
                    plannedSpending: 1200,
                    percentage: 80,
                    fillColor: '#4C88FD',
                    spent: 1146.83,
                }
            ],
            chartData: [
                { day: '01/06', expense: 100.1 },
                { day: '05/06', expense: 120.3 },
                { day: '10/06', expense: 113.9 },
                { day: '15/06', expense: 244.1 },
                { day: '20/06', expense: 321.5 },
                { day: '25/06', expense: 350.6 },
                { day: '30/05', expense: 429.8 },
            ],
        }
    ],
};

export default financeData;
