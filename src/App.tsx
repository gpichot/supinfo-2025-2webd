import { keepPreviousData, useQuery } from "@tanstack/react-query";
import "./App.css";
import { PokemonCard } from "./components/PokemonCard";
import type { PokemonListResponse } from "./types";
import { useSearchParams } from "react-router";
import { useState } from "react";

function App() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || 1;
	const searchText = searchParams.get("searchText") || "";

	const nbItemsPerPage = 10;
	const offset = (Number(page) - 1) * nbItemsPerPage;

	const { isPending, error, data } = useQuery({
		queryKey: ["pokemons", { page, searchText }],
		queryFn: () =>
			fetch(
				`https://pokeapi.fly.dev/namespace/pokemons/?offset=${offset}&searchText=${searchText}`,
			).then((response) => response.json() as Promise<PokemonListResponse>),
		placeholderData: keepPreviousData,
	});

	const isPreviousDisabled = Number(page) === 1;
	const isNextDisabled = data?.nextOffset === null;

	const handlePreviousPage = () => {
		setSearchParams({ page: String(Number(page) - 1), searchText });
	};

	const handleNextPage = () => {
		setSearchParams({ page: String(Number(page) + 1), searchText });
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
			<input
				type="text"
				id="searchText"
				name="searchText"
				placeholder="Search for a Pokémon"
				value={searchText}
				onChange={(e) => {
					setSearchParams({ searchText: e.target.value });
				}}
				className="border-2 border-gray-300 rounded-md p-2"
			/>
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
