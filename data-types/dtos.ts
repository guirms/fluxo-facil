interface Expense {
    name: string;      
    amount: number;    
  }
  
  interface Income {
    name: string;      
    amount: number;    
  }
  
  interface Planning {
    category: string;   
    percentage: number; 
    fillColor: string;  
    spent: number;      
  }
  
  interface ChartData {
    day: string;        
    expense: number;    
  }
  
  interface Month {
    name: string;                 
    balance: number;              
    predictedBalance: number;     
    expenses: Expense[];          
    incomes: Income[];            
    planning: Planning[];         
    chartData: ChartData[];       
  }
  
  interface FinanceData {
    name: string;        
    months: Month[];     
  }
  