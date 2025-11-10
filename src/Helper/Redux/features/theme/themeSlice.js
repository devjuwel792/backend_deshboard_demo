import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getInitialTheme = () => {

        const savedTheme = Cookies.get('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Default to light mode if no preference saved
        return false;
    
 
};

const initialState = {
    isDarkMode: getInitialTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            const newTheme = state.isDarkMode ? 'dark' : 'light';
            Cookies.set('theme', newTheme, { expires: 365 });
            document.documentElement.classList.toggle('dark', state.isDarkMode);
        },
        setTheme: (state, action) => {
            state.isDarkMode = action.payload;
            const theme = action.payload ? 'dark' : 'light';
            Cookies.set('theme', theme, { expires: 365 });
            document.documentElement.classList.toggle('dark', action.payload);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
