import bcrypt from 'bcryptjs';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

// Mock user database
const MOCK_USER = {
    email: 'cano@gmail.com',
    passwordHash: bcrypt.hashSync('1010', 10),
    id: '1',
    name: 'Cano Mock'
};

// Session storage
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

export async function createUserSession(userId: string, redirectTo: string) {
    const session = await sessionStorage.getSession();
    session.set('userId', userId);

    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session),
        },
    });
}

export async function login(email: string, password: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate credentials
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

export async function getUserSession(request: Request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );

    const userId = session.get('userId');

    if (!userId) return null;

    return { userId };
}

export async function requireAuth(request: Request) {
    const session = await getUserSession(request);

    if (!session) {
        throw redirect('/');
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