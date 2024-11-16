export interface ClientData {
  client_id: string;
  total_mrr: number;
  score: number;
  decision: string | 'Rejected' | 'Approved';
}


export interface ApplyLoanData {
  client_id: null,
  approved_amount: number,
  payment_table: PaymentTable[]
}


export interface PaymentTable {
  month: number;
  payment_amount: number;
}

export interface LoanStatusData {
  client_id: string;
  status: string;
  details: string;
}