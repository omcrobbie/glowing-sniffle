import React from "react";
import { Home } from "../containers/Home";
import { UsersProvider } from "../hooks/user-hook";

export const App = () => {
  return (
    <React.StrictMode>
      <UsersProvider>
        <Home />
      </UsersProvider>
    </React.StrictMode>
  );
};
