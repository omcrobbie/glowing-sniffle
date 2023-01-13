import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "src/app/models/user";
import { deleteUser, findAll } from "./use-fetch";

interface Props {
  users?: User[];
  refreshData: () => Promise<void>;
  deleteUser: (id?: string) => Promise<void>;
}
const context = React.createContext<Props | null>(null);

export const UsersProvider: FunctionComponent<any> = ({ children }) => {
  const [users, setUsers] = useState<User[] | undefined>();

  const refreshData = () => findAll().then((data) => setUsers(data));
  useEffect(() => {
    if (!users) {
      refreshData();
    }
  }, []);

  const _deleteUser = (id?: string) => {
    return deleteUser(id).then(() =>
      setUsers(users?.filter((u) => u.id !== id))
    );
  };

  const value = { users, deleteUser: _deleteUser, refreshData };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useUsers = (): Props => {
  const value = useContext(context);
  if (!value) {
    throw new Error("Hook called outside of provider");
  }
  return value;
};
