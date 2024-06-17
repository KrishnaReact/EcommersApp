import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk('fetchAllCategories', async (payload) => {
     //console.log('aaaaaaaaaaa',payload)
    const data = await fetch(`https://kingscollection.co.ke/wp-json/wc/v3/products/categories?orderby=id&order=asc&page=${payload}&per_page=100&consumer_key=ck_c5d35a45ffebe72c27e05025038d8b51a4f833cb&consumer_secret=cs_9c84183cd0a78c3e89a29b47aba10b59fc97c4a5`)
    const res = await data.json();
    //console.log('slicerCategory>>>>>>', res)
    return res;

})
const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState: {
        data: [],
        allCategoryData: [],
        isLoading: true,
        error: ''
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCategories.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.allCategoryData= [...state.allCategoryData, ...action.payload];
        });
        builder.addCase(fetchAllCategories.rejected, (state, action) => {
            state.error = true
        })
    }
})

export default categoriesSlice.reducer;