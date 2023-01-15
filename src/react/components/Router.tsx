import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { findOne } from "../utils/api";

import { App } from "./App";
import { UserFormConnected } from "./UserForm";
import { UsersListConnected } from "./UsersList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "users",
        element: <UsersListConnected />,
      },
      {
        path: "users/:id",
        element: <UserFormConnected />,
        loader: async ({ params }) => {
          const user = await findOne(params["id"]);
          return user;
        },
      },
      {
        path: "users/add_user",
        element: <UserFormConnected />,
      },
    ],
  },
]);
