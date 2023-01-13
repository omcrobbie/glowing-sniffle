import React, { FormEvent, FunctionComponent, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { User } from "src/app/models/user";
import { saveUser, updateUser } from "src/react/hooks/use-fetch";
import { useUsers } from "src/react/hooks/user-hook";

export const UserFormConnected = () => {
  const user: User = useLoaderData() as User;
  const { refreshData } = useUsers();
  return <UserForm user={user} refreshData={refreshData} />;
};

interface Props {
  user?: User;
  refreshData?: () => Promise<void>;
}
export const UserForm: FunctionComponent<Props> = ({ user, refreshData }) => {
  const [formState, setFormState] = useState({
    name: user?.name,
    email: user?.email,
  });
  const navigate = useNavigate();
  const { name, email } = formState;
  const validName = !!name;
  const validEmail = !!email && email.includes("@");
  const validForm = validEmail && validName;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = new User(name, email);
    if (!user) {
      await saveUser(payload);
    } else {
      await updateUser(payload, user.id);
    }
    refreshData?.().then(() => navigate("/users"));
  };
  return (
    <div className="card my-5">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              defaultValue={name}
              // [(ngModel)]="user.name"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              onChange={(e) => setFormState({ email, name: e.target.value })}
              // #name="ngModel"
            />
          </div>
          <div
            hidden={name === undefined || (!!name && validName)}
            className="alert alert-danger"
          >
            Name is required
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              defaultValue={email}
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
              onChange={(e) => setFormState({ name, email: e.target.value })}
            />
            <div
              hidden={email === undefined || (!!email && validEmail)}
              className="alert alert-danger"
            >
              Email is required
            </div>
          </div>
          <button type="submit" disabled={!validForm} className="btn btn-info">
            {user ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
