export interface user {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: string;
}
export interface createCategoryI {
  name: string;
  description: string;
}
export interface categoryI extends createCategoryI {
  id: number
}
export interface createSubcategoryI {
  name: string;
  categoryId: number;
}
export interface subcategoryI extends createSubcategoryI {
  id: number
}
export interface createAccountI {
  balance: number;
  accountType: string;
  name: string;
}
export interface accountI extends createAccountI {
  id: number,
}
export interface createBudgetI {
  limit: number;
}
export interface budgetI {
  currentSpending: number;
  limit: number;
  id: number;
}
export interface transactionI {
  id: number;
  description: string;
  amount: number;
  subcategoryId: number;
  categoryId: number;
  accountId: number;
  type: string;
}