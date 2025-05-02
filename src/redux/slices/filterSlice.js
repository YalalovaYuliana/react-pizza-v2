
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sortType: { name: 'популярности', sortProperty: 'rating' },
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sortType = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sortType = action.payload.sort
        },
    }
})

export const { setCategoryId, setSortType, setCurrentPage, setFilters } = filterSlice.actions
export default filterSlice.reducer