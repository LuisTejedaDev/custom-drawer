import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    hide: true,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setHide: (state, action) => {state.hide = action.payload},
    }
})

export const {setHide} = navSlice.actions

export const selectHide = (state) => state.navDrawer.hide;

export default navSlice.reducer