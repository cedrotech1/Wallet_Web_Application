import { categoryI } from '@/shared/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface categoriesliceI {
    categories: categoryI[],
    selectedCategory: categoryI | undefined
}

const initialState: categoriesliceI = {
    categories: [],
    selectedCategory: undefined
}
const categorieslice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addFetchedcategories: (state: categoriesliceI, action: PayloadAction<categoryI[]>) => {
            return {
                ...state,
                categories: action.payload
            }
        },
        addNewCategory: (state: categoriesliceI, action: PayloadAction<categoryI>) => {
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        },
        updateCategory: (state: categoriesliceI, action: PayloadAction<categoryI>) => {
            const newcategories = state.categories.map((el) => el.id == action.payload.id ? { ...el, ...action.payload } : el);
            return {
                ...state,
                categories: newcategories
            }
        },
        deleteCategory: (state: categoriesliceI, action: PayloadAction<categoryI>) => {
            return {
                ...state,
                categories: state.categories.filter(el => el.id !== action.payload.id)
            }
        },
        setSelectedCategory: (state: categoriesliceI, action: PayloadAction<categoryI>) => {
            return {
                ...state,
                selectedCategory: action.payload
            }
        }

    }
})
export const { addFetchedcategories, addNewCategory, updateCategory, deleteCategory } = categorieslice.actions;

export default categorieslice.reducer