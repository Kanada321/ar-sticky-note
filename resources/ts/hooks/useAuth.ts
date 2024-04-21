import * as api from '@/api/authAPI'
import { queryClient } from '@/queryClient'
import { useQueryClient, useMutation , useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const authUserQuery = () => ({
    queryKey: ['auth'],
    queryFn: api.getUser
})

export const useAuthUser = async () => {
    const query = authUserQuery()

    const user = queryClient.getQueryData(query.queryKey)
        ?? (await queryClient.fetchQuery(query).catch(() => undefined))
    console.log("Auth User Data:", user);

    return user
}


export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: api.login,
        onError: (error: AxiosError) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ['auth'] });
            window.location.href = '/user';
        }
    });
}

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: api.logout,
        onError: (error: AxiosError) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ['auth'] });
            window.location.href = '/';
        }
    });
}
