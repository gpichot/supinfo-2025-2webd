import { useParams } from "react-router";
import { pokemons } from "../mocks/pokemons";
import { useQuery } from "@tanstack/react-query";
import type { PokemonDetail } from "../types";

interface TwoColumnProps {
	left: React.ReactNode;
	right: React.ReactNode;
}

function TwoColumn(props: TwoColumnProps) {
	const { left, right } = props;

	return (
		<div style={{ display: "flex", flex: "row nowrap", gap: "1rem" }}>
			<div>{left}</div>
			<div>{right}</div>
		</div>
	);
}

export function PokemonDetailsPage() {
	const { pokemonId } = useParams();

	const {
		isPending,
		error,
		data: pokemon,
	} = useQuery({
		queryKey: ["pokemons", pokemonId],
		queryFn: () =>
			fetch(`https://pokeapi.fly.dev/namespace/pokemons/${pokemonId}`).then(
				(response) => response.json() as Promise<PokemonDetail>,
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
			<h1>{pokemon.name}</h1>
			<div style={{ display: "flex", flex: "row nowrap", gap: "1rem" }}>
				<TwoColumn
					left={<img src={pokemon.image} alt={pokemon.name} />}
					right={
						<>
							<p>
								Types:{" "}
								{pokemon.types.map((t) => (
									<span key={t}>{t}</span>
								))}
							</p>
							<p>
								Abilities:{" "}
								{pokemon.abilities.map((a) => (
									<span key={a}>{a}</span>
								))}
							</p>
						</>
					}
				/>
			</div>
			<div>
				<p></p>
				<p>hp: {pokemon.stats["hp"]}</p>
				<p>attack: {pokemon.stats["attack"]}</p>
				<p>defense: {pokemon.stats["defense"]}</p>
				<p>special-attack: {pokemon.stats["special-attack"]}</p>
				<p>special-defense: {pokemon.stats["special-defense"]}</p>
				<p>speed: {pokemon.stats["speed"]}</p>
			</div>
		</div>
	);
}
