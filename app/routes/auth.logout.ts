import { ActionFunctionArgs } from '@remix-run/node';
import { logout } from '~/controller/auth.server';

export async function action({ request }: ActionFunctionArgs) {
	return logout(request);
}