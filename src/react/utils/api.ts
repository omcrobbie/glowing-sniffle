import { User } from 'src/app/models/user';

const url = 'http://localhost:8080/users';

const headers = new Headers({ 'Content-Type': 'application/json' });

export const findAll = async (): Promise<User[]> => {
  const data = await fetch(url, { method: 'GET' });
  return data.json();
};

export const findOne = async (id?: string): Promise<User> => {
  const data = await fetch(`${url}/${id}`, { method: 'GET' });
  return data.json();
};

export const saveUser = (user: User) =>
  fetch(url, { method: 'POST', body: JSON.stringify(user), headers });

export const deleteUser = (id?: string) =>
  fetch(`${url}/${id}`, { method: 'DELETE' });

export const updateUser = ({ user, id }: { user: User; id?: string }) =>
  fetch(`${url}/${id}`, { method: 'PUT', body: JSON.stringify(user), headers });
