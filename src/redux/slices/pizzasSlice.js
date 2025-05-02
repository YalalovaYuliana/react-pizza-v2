
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {
            category,
            sortBy,
            search,
            currentPage,
        } = params
        const { data } = await axios.get(`https://68126593129f6313e20e746e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=decs${search}`)
        return data
    },
)

const initialState = {
    items: [],
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state, action) => {
                console.log('Идёт отправка')
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                console.log('ВСЁ ОК')
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                console.log('Была ошибка')
            })
    },
})

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer