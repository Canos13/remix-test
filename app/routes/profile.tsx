import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireAuth } from '~/services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireAuth(request);
    return json({ userId });
}

export default function Dashboard() {
    const data = useLoaderData<typeof loader>();

    return (
        <div style={{ padding: 24 }}>
            <h1>Perfil</h1>
            <p>Bienvenido usuario ID: {data.userId}</p>
        </div>
    );
}