export type ExpenseCategory = 'Food' | 'Transport' | 'Bills' | 'Other';

export type Expense = {
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
};

export type ExpenseData = Expense & {
  id: string;
}
