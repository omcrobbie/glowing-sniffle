import React from "react";
import { useUsers } from "../../hooks/user-hook";
import { UsersListItem } from "./UsersListItem";

export const UsersList = () => {
  const { users, deleteUser } = useUsers();
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
            <UsersListItem key={user.id} user={user} deleteUser={deleteUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
