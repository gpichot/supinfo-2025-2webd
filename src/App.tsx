import { keepPreviousData, useQuery } from "@tanstack/react-query";
import "./App.css";
import { PokemonCard } from "./components/PokemonCard";
import type { PokemonListResponse } from "./types";
import { useSearchParams } from "react-router";

function App() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || 0;

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
		console.log("previous page", page);
		setSearchParams({ page: String(Number(page) - 1) });
	};

	const handleNextPage = () => {
		console.log("next page", page);
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
