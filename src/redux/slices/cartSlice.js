
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalPrice: 0,
    totalCount: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push(action.payload)
            }
            state.totalPrice += action.payload.price
            state.totalCount++
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
            state.totalPrice -= action.payload.price * action.payload.count
            state.totalCount -= action.payload.count
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem && findItem.count > 1) {
                findItem.count--
                state.totalCount--
            }
        }
    }
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer