
import { useEffect } from 'react';
import { useLoaderData } from '@remix-run/react';
import { useAuthStore } from '~/context/authStore';
import { loader } from '~/root';

export function AuthInitializer() {
    const { user } = useLoaderData<typeof loader>();
    const { setUser, clearUser } = useAuthStore();

    useEffect(() => {
        if (user) {
            setUser(user);
        } else {
            clearUser();
        }
    }, [user, setUser, clearUser]);

    return null;
}