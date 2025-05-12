export interface Pokemon {
	id: number;
	name: string;
	types: string[];
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
}
