import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {}, // You may want to provide an initial state here
    reducers: {
        cacheResults: (state, action) => {
            // Return a new state object with action.payload merged into it
            return { ...state, ...action.payload };
        },
    },
});

export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;
