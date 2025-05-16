import { LoaderFunctionArgs } from '@remix-run/node';
import { protectedLoader } from '~/middleware/auth.server';

export async function loader(args: LoaderFunctionArgs) {
    return protectedLoader(args, async (userId, { request }) => {   
        return Response.json({
            message: "My API",
        }, {
            status: 418
        })
    });
}
