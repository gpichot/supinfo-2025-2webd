import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
	useParams,
} from "react-router";
import { Navigation } from "./components/Navigation.tsx";

function Contact() {
	const { name } = useParams();
	return (
		<div>
			<h1>Hello {name}</h1>
			Contact
		</div>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div>
				<Navigation />
				<main>
					<Outlet />
				</main>
			</div>
		),
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "/contact/:name",
				element: <Contact />,
			},
			{
				path: "/mentions-legales",
				element: <div>Mentions Legales</div>,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
