import { configureStore } from "@reduxjs/toolkit";
import userChatsSlice from "./userChatsSlice";
const store = configureStore({
    reducer: {
        userChats: userChatsSlice
    }
})

export default store;