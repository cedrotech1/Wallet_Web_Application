export interface user {
    id: number,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    role: string
}
export interface createCategoryI {
    name: string;
    description: string
}
export interface createSubcategoryI {
    name: string;
    categoryId: number
}
export interface createAccountI {
    balance: number;
    accountType: string;
    name: string;
}
export interface createBudgetI {
    limit: number;
}
export interface budgetI {
    currentSpending: number;
    limit: number;
    id: number
}