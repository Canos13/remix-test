import {
	json,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import Header from "./components/Header";

import "./styles/main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { getUserSession } from "./services/auth.server";

export const links: LinksFunction = () => [
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getUserSession(request);
	return json({ userId: session?.userId });
}

export default function App() {
	const data = useLoaderData<typeof loader>();
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="font-inter">
				<Header userId={data.userId} />
				<main className="mx-auto px-4">
					<Outlet />
				</main>
				<ScrollRestoration />
				<Scripts />

			</body>
		</html>
	);
}
