import { budgetI } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface budgetState {
    budget: budgetI | null;
}
const initialState: budgetState = {
    budget: null,
};

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        setBudget: (state, action: PayloadAction<budgetI | null>) => {
            return {
                ...state,
                budget: action.payload,
            };
        },
        updateBudget: (state, action: PayloadAction<budgetI>) => {
            return {
                ...state,
                budget: {
                    ...state.budget,
                    ...action.payload,
                },
            };
        },
    },
});

export const { setBudget, updateBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
