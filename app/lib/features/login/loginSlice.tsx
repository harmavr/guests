import { createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "../../types";
import { REHYDRATE } from "redux-persist";

const initialState: UserLogin = {
    // loggedIn: false,
    loggedInUser: {
        firstName: '',
        lastName: '',
    },
    userCredentials: [{
        firstName: 'charis',
        lastName: 'mavr',
        email: '1',
        password: '1',
    }]
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login(state, action) {
            const { user } = action.payload;


            console.log(user);

            // Update state with the logged-in user and set loggedIn to true
            state.loggedInUser.firstName = user;
            state.loggedInUser.lastName = '';
            // state.loggedIn = true;

            console.log('User logged in:', user);
        },

        logout(state) {
            // Reset the state upon logout
            // state.loggedIn = false;
            state.loggedInUser = {
                firstName: '',
                lastName: '',
            };
        },

        registerUser(state, action) {
            const { data } = action.payload;

            console.log(data.userCredentials[0]);

            // Store user credentials in the state
            state.userCredentials.push(data.userCredentials[0]);
            state.userCredentials.map((e) => {
                console.log(`email ${e.email}, password ${e.password}`);
            });
        }
    },

});

export const loginAction = loginSlice.actions;
export default loginSlice.reducer;
