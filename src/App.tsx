import "./App.css";
import { PokemonCard } from "./components/PokemonCard";
import { pokemons } from "./mocks/pokemons";

function App() {
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
				{pokemons.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
		</div>
	);
}

export default App;
