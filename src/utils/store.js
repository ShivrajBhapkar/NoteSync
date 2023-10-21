import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import authenticationSlice from "./authenticationSlice";
import notesReducer from "./noteSlice";
const store = configureStore({
    reducer: {
        app: appSlice,
        search: searchSlice,
        chat: chatSlice,
        authentication: authenticationSlice,
        notes: notesReducer,
    },
});
export default store;
