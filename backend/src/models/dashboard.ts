export interface MonthlySales {
  month: string;
  cashSales: number;
  creditSales: number;
  cashRatio: number;
  creditRatio: number;
}

export interface CurrentMonthSales {
  cashSales: number;
  creditSales: number;
  cashRatio: number;
  creditRatio: number;
}

export interface MaturedInvoice {
  count: number;
}

