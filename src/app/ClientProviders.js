"use client";

import { store } from "@/Helper/Redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { useEffect } from "react";
import i18n from "@/Utils/i18n";

export default function ClientProviders({ children }) {
  useEffect(() => {
    i18n.init();
  }, []);

  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
