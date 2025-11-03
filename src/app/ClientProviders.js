"use client";

import { store } from "@/Helper/Redux/store";
import { Provider as ReduxProvider } from "react-redux";

export default function ClientProviders({ children }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
