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
import { PokemonDetailsPage } from "./components/PokemonDetailsPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

function Contact() {
	const { name, lastname } = useParams();
	return (
		<div>
			<h1>
				Hello {name} {lastname}
			</h1>
			Contact
		</div>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <div>Page non trouvée</div>,
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
				path: "/pokemons/:pokemonId",
				element: <PokemonDetailsPage />,
			},
			{
				path: "/contact/:name/:lastname",
				element: <Contact />,
			},
			{
				path: "/mentions-legales",
				element: <div>Mentions Legales</div>,
			},
		],
	},
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>,
);
