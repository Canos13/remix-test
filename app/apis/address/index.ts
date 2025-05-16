import { LoaderFunctionArgs } from '@remix-run/node';
import { getAddress } from '~/controller/shipping.server';
import { protectedLoader } from '~/middleware/auth.server';

export async function loader(args: LoaderFunctionArgs) {
     return protectedLoader(args, async (userId, { request }) => {   
        const users = await getAddress();
        return Response.json(users);
    });
}
