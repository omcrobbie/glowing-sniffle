import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "src/app/models/user";

interface Props {
  user: User;
  deleteUser: (id?: string) => void;
}
export const UsersListItem: FunctionComponent<Props> = ({
  user,
  deleteUser,
}) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>
        <a href="mailto:{ user.email }">{user.email}</a>
      </td>
      <td>
        <div className="group" role="toolbar" aria-label="Basic example">
          <button
            title="Update"
            // [octicon]="{ key: 'pencil' }"
            type="button"
            className="btn btn-light no-bg"
            onClick={() => navigate(user.id!.toString())}
          >
            Update
          </button>
          <button
            title="Delete"
            // [octicon]="{ key: 'trash', color: 'white' }"
            type="button"
            className="btn btn-danger"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
