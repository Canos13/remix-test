import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { getUserIdSession } from '~/controller/auth.server';

export async function requireAuthApi(request: Request) {
    const session = await getUserIdSession(request);

    if (!session?.userId) {
        return Response.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    return session.userId;
}


export async function protectedLoader(
    args: LoaderFunctionArgs,
    handler: (userId: string, args: LoaderFunctionArgs) => Promise<Response>
) {
    const userId = await requireAuthApi(args.request);
    
    if (typeof userId !== 'string') {
        return userId;
    }
    
    return handler(userId, args);
}


export async function protectedAction(
    args: ActionFunctionArgs,
    handler: (userId: string, args: ActionFunctionArgs) => Promise<Response>
) {
    const userId = await requireAuthApi(args.request);
    
    if (typeof userId !== 'string') {
        return userId;
    }
    
    return handler(userId, args);
}