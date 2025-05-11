import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { login, createUserSession } from '~/services/auth.server';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const redirectTo = formData.get('redirectTo') as string || '/profile';

    try {
        const { user } = await login(email, password);
        return createUserSession(user.id, redirectTo);
    } catch (error) {
        return json({
            error: error instanceof Error ? error.message : 'Error desconocido',
            email
        }, { status: 401 });
    }
}