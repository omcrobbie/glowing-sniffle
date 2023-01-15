import React from "react";
import { User } from "src/app/models/user";
import { useDeleteUser, useFetchUsers } from "src/react/utils/queries";
import { UsersListItem } from "./UsersListItem";

export const UsersListConnected = () => {
  const fetchUsers = useFetchUsers();
  const deleteUser = useDeleteUser();

  if (fetchUsers.isLoading) {
    return <div>Loading...</div>;
  }
  return <UsersList users={fetchUsers.data} removeUser={deleteUser} />;
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
