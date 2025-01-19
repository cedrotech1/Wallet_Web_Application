import { accountI } from '@/shared/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface accountSliceI {
    accounts: accountI[],
    selectedAccount: accountI | undefined
}

const initialState: accountSliceI = {
    accounts: [],
    selectedAccount: undefined
}
const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addFetchedAccounts: (state: accountSliceI, action: PayloadAction<accountI[]>) => {
            return {
                ...state,
                accounts: action.payload
            }
        },
        addNewAccount: (state: accountSliceI, action: PayloadAction<accountI>) => {
            return {
                ...state,
                accounts: [...state.accounts, action.payload]
            }
        },
        updateAccount: (state: accountSliceI, action: PayloadAction<accountI>) => {
            const newAccounts = state.accounts.map((el) => el.id == action.payload.id ? { ...el, ...action.payload } : el);
            return {
                ...state,
                accounts: newAccounts
            }
        },
        deleteAccount: (state: accountSliceI, action: PayloadAction<accountI>) => {
            return {
                ...state,
                accounts: state.accounts.filter(el => el.id !== action.payload.id)
            }
        },
        setSelectedAccount: (state: accountSliceI, action: PayloadAction<accountI>) => {
            return {
                ...state,
                selectedAccount: action.payload
            }
        }

    }
})
export const { addFetchedAccounts, addNewAccount, updateAccount, deleteAccount } = accountSlice.actions;

export default accountSlice.reducer