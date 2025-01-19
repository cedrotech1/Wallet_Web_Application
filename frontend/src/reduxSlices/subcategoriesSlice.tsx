import { subcategoryI } from '@/shared/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface subcategoriesliceI {
    subcategories: subcategoryI[],
    selectedSubcategory: subcategoryI | undefined
}

const initialState: subcategoriesliceI = {
    subcategories: [],
    selectedSubcategory: undefined
}
const subcategorieslice = createSlice({
    name: 'subcategories',
    initialState,
    reducers: {
        addFetchedsubcategories: (state: subcategoriesliceI, action: PayloadAction<subcategoryI[]>) => {
            return {
                ...state,
                subcategories: action.payload
            }
        },
        addNewSubcategory: (state: subcategoriesliceI, action: PayloadAction<subcategoryI>) => {
            return {
                ...state,
                subcategories: [...state.subcategories, action.payload]
            }
        },
        updateSubcategory: (state: subcategoriesliceI, action: PayloadAction<subcategoryI>) => {
            const newsubcategories = state.subcategories.map((el) => el.id == action.payload.id ? { ...el, ...action.payload } : el);
            return {
                ...state,
                subcategories: newsubcategories
            }
        },
        deleteSubcategory: (state: subcategoriesliceI, action: PayloadAction<subcategoryI>) => {
            return {
                ...state,
                subcategories: state.subcategories.filter(el => el.id !== action.payload.id)
            }
        },
        setSelectedSubcategory: (state: subcategoriesliceI, action: PayloadAction<subcategoryI>) => {
            return {
                ...state,
                selectedSubcategory: action.payload
            }
        }

    }
})
export const { addFetchedsubcategories, addNewSubcategory, updateSubcategory, deleteSubcategory } = subcategorieslice.actions;

export default subcategorieslice.reducer