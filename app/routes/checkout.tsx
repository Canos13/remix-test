
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { requireAuth } from '~/utils/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireAuth(request);
    return json({ userId });
}

export default function Checkout() {
    return (
        <div>
            <h1>Proceso de Pago</h1>
        </div>
    );
}