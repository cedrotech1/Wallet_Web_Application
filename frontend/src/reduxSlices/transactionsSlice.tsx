import { transactionI } from '@/shared/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface transactionsliceI {
    transactions: transactionI[],
}

const initialState: transactionsliceI = {
    transactions: [],
}
const transactionslice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addFetchedtransactions: (state: transactionsliceI, action: PayloadAction<transactionI[]>) => {
            return {
                ...state,
                transactions: action.payload
            }
        },
        addNewTransaction: (state: transactionsliceI, action: PayloadAction<transactionI>) => {
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        },
        deleteTransaction: (state: transactionsliceI, action: PayloadAction<number>) => {
            return {
                ...state,
                transactions: state.transactions.filter(el => el.id !== action.payload)
            }
        },

    }
})
export const { addFetchedtransactions, addNewTransaction, deleteTransaction } = transactionslice.actions;

export default transactionslice.reducer