import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const addProduct = createSlice({
    name: 'addProduct',
    initialState: {
        data: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.data.push(action.payload)
        },
        deleteItem: (state, action) => {
          state.data.splice(action.payload,1)
        }
    }
})

export const { addItem, deleteItem } = addProduct.actions;
export default addProduct.reducer;

