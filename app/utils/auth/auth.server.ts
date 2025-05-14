
import { redirect } from '@remix-run/node';
import { getUserSession } from '~/services/auth.server';

export async function requireAuth(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const session = await getUserSession(request);

    if (!session?.userId) {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
        throw redirect(`/login?${searchParams}`);
    }

    return session.userId;
}