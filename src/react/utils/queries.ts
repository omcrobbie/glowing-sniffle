import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { User } from 'src/stories/User';
import { deleteUser, findAll, saveUser, updateUser } from './api';

export const useMutateUsers = (user: User) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: ['users'] });

  const onSettled = () => navigate('/users');
  const update = useMutation({
    mutationFn: updateUser,
    onSuccess,
    onSettled,
  });
  const save = useMutation({
    mutationFn: saveUser,
    onSuccess,
    onSettled,
  });
  const mutateUsers = (userData: User, id?: string) => {
    if (!user) {
      save.mutate(userData);
    } else {
      update.mutate({ user: userData, id });
    }
  };
  return { mutateUsers, update, save };
};

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: findAll,
  });
};

export const useDeleteUser = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => client.invalidateQueries(['users']),
  });
  return mutate;
};
