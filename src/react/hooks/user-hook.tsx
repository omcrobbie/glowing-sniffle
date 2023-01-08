import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "src/app/models/user";

interface Props {
  users?: User[];
  deleteUser: (id?: string) => void;
}
const context = React.createContext<Props | null>(null);

const url = "http://localhost:8080/users";

export const UsersProvider: FunctionComponent<any> = ({ children }) => {
  const [users, setUsers] = useState<User[] | undefined>();

  const findAll = async (): Promise<User[]> => {
    const data = await fetch(url, { method: "GET" });
    return data.json();
  };
  useEffect(() => {
    if (!users) {
      findAll().then((data) => setUsers(data));
    }
  }, []);

  const deleteUser = (id?: string) => {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(() =>
      setUsers(users?.filter((u) => u.id !== id))
    );
  };

  const value = { users, deleteUser };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useUsers = (): Props => {
  const value = useContext(context);
  if (!value) {
    throw new Error("Hook called outside of provider");
  }
  return value;
};
