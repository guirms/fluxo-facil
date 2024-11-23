const financeData: FinanceData = {
    name: "João Vitor",
    months: [
        {
            name: "Julho",
            balance: 2706.5,
            predictedBalance: 1024.0,
            expenses: [
                { name: "Mercado", amount: 543.5 },
                { name: "Transporte", amount: 200.0 },
                { name: "Café", amount: 100.0 },
            ],
            incomes: [
                { name: "Salário", amount: 3000.0 },
                { name: "Freelance", amount: 250.0 },
            ],
            planning: [
                {
                    category: "Educação",
                    percentage: 90,
                    fillColor: "#FD764C",
                    spent: 450.0,
                },
                {
                    category: "Lazer",
                    percentage: 50,
                    fillColor: "#FD4C4C",
                    spent: 275.0,
                },
                {
                    category: "Alimentação",
                    percentage: 80,
                    fillColor: "#4C88FD",
                    spent: 105.5,
                },
            ],
            chartData: [
                { day: "01/06", expense: 60 },
                { day: "05/06", expense: 120 },
                { day: "10/06", expense: 180 },
                { day: "15/06", expense: 240 },
                { day: "20/06", expense: 300 },
                { day: "25/06", expense: 360 },
                { day: "30/05", expense: 420 },
            ],
        },
        {
            name: "Agosto",
            balance: 3200.0,
            predictedBalance: 800.0,
            expenses: [
                { name: "Aluguel", amount: 1000.0 },
                { name: "Lazer", amount: 500.0 },
                { name: "Supermercado", amount: 600.0 },
            ],
            incomes: [
                { name: "Salário", amount: 3500.0 },
                { name: "Investimento", amount: 700.0 },
            ],
            planning: [
                {
                    category: "Educação",
                    percentage: 80,
                    fillColor: "#FD764C",
                    spent: 400.0,
                },
                {
                    category: "Lazer",
                    percentage: 60,
                    fillColor: "#FD4C4C",
                    spent: 300.0,
                },
                {
                    category: "Alimentação",
                    percentage: 70,
                    fillColor: "#4C88FD",
                    spent: 700.0,
                },
            ],
            chartData: [
                { day: "01/06", expense: 60 },
                { day: "05/06", expense: 120 },
                { day: "10/06", expense: 180 },
                { day: "15/06", expense: 240 },
                { day: "20/06", expense: 300 },
                { day: "25/06", expense: 360 },
                { day: "30/05", expense: 420 },
            ],
        },
    ],
};

export default financeData;
