import { keepPreviousData, useQuery } from "@tanstack/react-query";
import "./App.css";
import { PokemonCard } from "./components/PokemonCard";
import type { PokemonListResponse } from "./types";
import { useSearchParams } from "react-router";
import { useState } from "react";

function App() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || 1;
	const [count, setCount] = useState(0);

	const nbItemsPerPage = 10;
	const offset = (Number(page) - 1) * nbItemsPerPage;

	const { isPending, error, data } = useQuery({
		queryKey: ["pokemons", { page }],
		queryFn: () =>
			fetch(
				`https://pokeapi.fly.dev/namespace/pokemons/?offset=${offset}`,
			).then((response) => response.json() as Promise<PokemonListResponse>),
		placeholderData: keepPreviousData,
	});

	const isPreviousDisabled = page === 0;
	const isNextDisabled = data?.nextOffset === null;

	const handlePreviousPage = () => {
		setSearchParams({ page: String(Number(page) - 1) });
	};

	const handleNextPage = () => {
		setSearchParams({ page: String(Number(page) + 1) });
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<h1>Pokedex</h1>
			<p>Count: {count}</p>
			<button
				type="button"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Increment
			</button>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gridGap: "1rem",
				}}
			>
				{data.results.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
			<div
				style={{
					display: "flex",
					flex: "row nowrap",
					gap: "1rem",
					justifyContent: "space-between",
				}}
			>
				<button
					type="button"
					onClick={handlePreviousPage}
					disabled={isPreviousDisabled}
				>
					Précédent
				</button>

				<button
					type="button"
					onClick={handleNextPage}
					disabled={isNextDisabled}
				>
					Suivant
				</button>
			</div>
		</div>
	);
}

export default App;
