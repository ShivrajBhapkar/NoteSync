import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import authenticationSlice from "./authenticationSlice";
import notesReducer from "./noteSlice";
const store = configureStore({
    reducer: {
        app: appSlice,
        authentication: authenticationSlice,
        notes: notesReducer,
    },
});
export default store;
