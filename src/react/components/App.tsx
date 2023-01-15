import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Home } from "../containers/Home";

const client = new QueryClient();

export const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <Home />
      </QueryClientProvider>
    </React.StrictMode>
  );
};
