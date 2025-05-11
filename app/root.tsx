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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import "./styles/main.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { loadUserData } from "./loaders/user.loader";
import { AuthInitializer } from "./components/AuthInitializer";

export const links: LinksFunction = () => [
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await loadUserData(request);
  	return json({ user });
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
				<AuthInitializer />
				<div className="flex flex-col min-h-screen">
					<Header userId={data.user?.id} name={data.user?.name} />
					<section className="flex-grow">
						<main className="mx-auto px-4 ">
							<Outlet />
						</main>
					</section>
					<Footer />
				</div>
				<ScrollRestoration />
				<Scripts />

			</body>
		</html>
	);
}
