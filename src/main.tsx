import { StrictMode, useState } from "react";
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
import { PokemonForm } from "./components/PokemonForm.tsx";

function Contact() {
	const { name, lastname } = useParams();
	const [items, setItems] = useState<number[]>([1, 2]);
	return (
		<div>
			<h1>
				Hello {name} {lastname}
			</h1>
			<div className="m-8">
				<p>Numbers: {items.join(", ")}</p>
				<button
					type="button"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => {
						const last = items[items.length - 1];
						const newItems = [...items, last + 1];
						setItems(newItems);
					}}
				>
					Add item
				</button>
			</div>
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
			{ path: "/pokemons/new", element: <PokemonForm /> },
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
