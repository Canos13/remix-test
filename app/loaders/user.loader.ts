// app/loaders/user.loader.ts
import { getUserSession, MOCK_USER } from '~/services/auth.server';
import { User } from '~/context/authStore';

export async function loadUserData(request: Request): Promise<User | null> {
    const session = await getUserSession(request);

    if (!session?.userId) {
        return null;
    }

    /*   HACER PETICION AQUI  */

    return {
        id: session.userId,
        name: MOCK_USER.name,
        email: MOCK_USER.email
    };
}