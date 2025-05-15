import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { PokemonCard } from "./components/PokemonCard";
import type { PokemonListResponse } from "./types";

function App() {
	const { isPending, error, data } = useQuery({
		queryKey: ["pokemons"],
		queryFn: () =>
			fetch("https://pokeapi.fly.dev/namespace/pokemons/?offset=20").then(
				(response) => response.json() as Promise<PokemonListResponse>,
			),
	});

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
		</div>
	);
}

export default App;
