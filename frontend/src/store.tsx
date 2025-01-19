import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reduxSlices/authSlice';
import budgetReducer from './reduxSlices/budgetSlice';
import accountsReducer from './reduxSlices/accountsSlice';
import categoriesReducer from './reduxSlices/categoriesSlice';
import subcategoriesReducer from './reduxSlices/subcategoriesSlice';
import transactionsReducer from './reduxSlices/transactionsSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        budget: budgetReducer,
        accounts: accountsReducer,
        categories: categoriesReducer,
        subcategories: subcategoriesReducer,
        transactions: transactionsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//state getters

export const getUser = (state: RootState) => state.auth.user;
export const getBudget = (state: RootState) => state.budget;
export const getAccounts = (state: RootState) => state.accounts.accounts;
export const getSelectedAccount = (state: RootState) => state.accounts.selectedAccount;
export const getAllCategories = (state: RootState) => state.categories.categories;
export const getSelectedCategory = (state: RootState) => state.categories.selectedCategory;
export const getAllSubCategories = (state: RootState) => state.subcategories.subcategories;
export const getSelectedSubCategory = (state: RootState) => state.subcategories.selectedSubcategory;
export const getAllTransactions = (state: RootState) => state.transactions.transactions;

