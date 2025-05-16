import { json, LoaderFunctionArgs } from '@remix-run/node';
import { getUserSession } from '~/controller/auth.server';
import { getAddress } from '~/controller/shipping.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getUserSession(request);

    if (!session) {
        return json({
            code: 401
        });
    }

    const users = await getAddress();
    return json(users);
}
