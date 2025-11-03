import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Default to light mode if no preference saved
        return false;
    }
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
            localStorage.setItem('theme', newTheme);
            document.documentElement.classList.toggle('dark', state.isDarkMode);
        },
        setTheme: (state, action) => {
            state.isDarkMode = action.payload;
            const theme = action.payload ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            document.documentElement.classList.toggle('dark', action.payload);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
