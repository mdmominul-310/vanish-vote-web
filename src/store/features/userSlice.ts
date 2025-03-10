import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userInfo = action.payload;

        },
    },
    selectors: {
        getUser: state => state?.userInfo,
    },
    extraReducers: builder => {
        builder.addCase("user/logout", state => {
            state.userInfo = null;
        });
    },
});

export default userInfoSlice.reducer;
export const { addUser } = userInfoSlice.actions;
export const { getUser } = userInfoSlice.selectors;