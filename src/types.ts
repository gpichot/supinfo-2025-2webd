export type PokemonType =
	| "bug"
	| "dark"
	| "dragon"
	| "electric"
	| "fairy"
	| "fighting"
	| "fire"
	| "flying"
	| "ghost"
	| "grass"
	| "ground"
	| "ice"
	| "normal"
	| "poison"
	| "psychic"
	| "rock"
	| "steel"
	| "water";

export type PokemonDetail = {
	id: number | string;
	name: string;
	types: PokemonType[];
	image: string;
	weight: number;
	height: number;
	base_experience: number;
	forms: string[];
	abilities: string[];
	stats: {
		hp: number;
		attack: number;
		defense: number;
		"special-attack": number;
		"special-defense": number;
		speed: number;
	};
};
export interface PokemonListResponse {
	previousOffset: number | null;
	nextOffset: number | null;
	results: PokemonDetail[];
}
