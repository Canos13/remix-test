import bcrypt from 'bcryptjs';
import { createCookieSessionStorage, redirect, } from '@remix-run/node';

export const MOCK_USER = {
    email: 'li_sergiocm@unca.edu.mx',
    passwordHash: bcrypt.hashSync('10', 10),
    id: '1',
    name: 'Sergio Cano'
};

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET || 'secret'],
        secure: process.env.NODE_ENV === 'production',
    },
});

type UserSession = {
    id: string;
    email: string;
    name: string;
};

export async function createUserSession(user: UserSession, redirectTo: string) {
    const session = await sessionStorage.getSession();
    session.set('userId', user.id);
    session.set('userEmail', user.email);
    session.set('userName', user.name);

    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session),
        },
    });
}

export async function getUserData(request: Request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );

    return {
        id: session.get('userId'),
        email: session.get('userEmail'),
        name: session.get('userName'),
    } as UserSession;
}

export async function login(email: string, password: string) {

    if (email !== MOCK_USER.email) {
        throw new Error('Usuario no encontrado');
    }

    const isValidPassword = await bcrypt.compare(password, MOCK_USER.passwordHash);
    if (!isValidPassword) {
        throw new Error('Contraseña incorrecta');
    }

    return {
        user: {
            id: MOCK_USER.id,
            email: MOCK_USER.email,
            name: MOCK_USER.name
        }
    };
}

export async function getUserIdSession(request: Request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );

    const userId = session.get('userId');

    if (!userId) return null;

    return { userId };
}

export async function requireAuth(request: Request) {
    const session = await getUserIdSession(request);

    if (!session) {
        throw redirect('/');
    }

    return session.userId;
}

export async function requireAuthAndRedirect(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const session = await getUserIdSession(request);

    if (!session?.userId) {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
        throw redirect(`/login?${searchParams}`);
    }

    return session.userId;
}

export async function logout(request: Request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );

    return redirect('/', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session),
        },
    });
}