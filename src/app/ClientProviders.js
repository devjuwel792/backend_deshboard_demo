"use client";

import { store } from "@/Helper/Redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { useEffect } from "react";
import i18n from "@/Utils/i18n";
import { setTheme } from "@/Helper/Redux/features/theme/themeSlice";

export default function ClientProviders({ children }) {
  useEffect(() => {
    i18n.init();

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';
    store.dispatch(setTheme(isDarkMode));
  }, []);

  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
