import React from "react";
import { User } from "src/app/models/user";
import { useUsers } from "src/react/hooks/user-hook";
import { UsersListItem } from "./UsersListItem";

export const UsersListConnected = () => {
  const { users, deleteUser } = useUsers();
  return <UsersList users={users} removeUser={deleteUser} />;
};
export const UsersList = ({
  users,
  removeUser,
}: {
  users?: User[];
  removeUser: any;
}) => {
  return (
    <div className="card-body">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col" className="centered">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <UsersListItem key={user.id} user={user} deleteUser={removeUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
