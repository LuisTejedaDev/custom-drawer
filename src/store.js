import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {appSlice} from './slices';
import thunk from 'redux-thunk'
import drawerSlice from './slices/drawerSlice';

export const store = configureStore({
    reducer: {
        navApp: appSlice,
        navDrawer: drawerSlice,
    }
}, applyMiddleware(thunk))