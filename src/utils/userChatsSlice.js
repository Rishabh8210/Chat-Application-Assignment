import { createSlice } from "@reduxjs/toolkit";
const userChatsSlice = createSlice({
    name: 'userChats',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
})

export const {addMessage} = userChatsSlice.actions;
export default userChatsSlice.reducer;
