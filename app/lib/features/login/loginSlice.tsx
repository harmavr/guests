import { createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "../../types";
import { log } from "console";


const initialState: UserLogin = {
    loggedIn: false,
    userCredentials: [{
        firstName: 'charis',
        lastName: 'mavr',
        email: 'a@a',
        password: '1234'
    }]
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeStatus(state) {
            state.loggedIn = true

            console.log(state.loggedIn);


        },

        registerUser(state, action) {
            const { data } = action.payload

            console.log(data.userCredentials[0]);


            state.userCredentials.push(data.userCredentials[0])
            state.userCredentials.map((e) => {
                console.log(`email ${e.email},password ${e.password}`);
            })

        }
    }
})

export const loginAction = loginSlice.actions
export default loginSlice.reducer