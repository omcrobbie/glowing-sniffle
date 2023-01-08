import React, { FunctionComponent } from "react";
import { User } from "src/app/models/user";
import { useNav } from "src/react/hooks/nav-hook";

interface Props {
  user: User;
  deleteUser: (id?: string) => void;
}
export const UsersListItem: FunctionComponent<Props> = ({
  user,
  deleteUser,
}) => {
  const { goTo } = useNav();
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
            onClick={() => goTo(user.id)}
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
