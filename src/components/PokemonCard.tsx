import type { Pokemon } from "../types";

interface PokemonCardProps {
	pokemon: Pokemon;
}

const typeColors = {
	normal: "bg-gray-300",
	fire: "bg-orange-500",
	water: "bg-blue-500",
	electric: "bg-yellow-400",
	grass: "bg-green-500",
	ice: "bg-blue-200",
	fighting: "bg-red-700",
	poison: "bg-purple-500",
	ground: "bg-yellow-600",
	flying: "bg-indigo-300",
	psychic: "bg-pink-500",
	bug: "bg-lime-500",
	rock: "bg-yellow-800",
	ghost: "bg-purple-700",
	dragon: "bg-indigo-600",
	dark: "bg-gray-800",
	steel: "bg-gray-400",
	fairy: "bg-pink-300",
};

const borderColors = {
	normal: "border-gray-400",
	fire: "border-orange-600",
	water: "border-blue-600",
	electric: "border-yellow-500",
	grass: "border-green-600",
	ice: "border-blue-300",
	fighting: "border-red-800",
	poison: "border-purple-600",
	ground: "border-yellow-700",
	flying: "border-indigo-400",
	psychic: "border-pink-600",
	bug: "border-lime-600",
	rock: "border-yellow-900",
	ghost: "border-purple-800",
	dragon: "border-indigo-700",
	dark: "border-gray-900",
	steel: "border-gray-500",
	fairy: "border-pink-400",
};

export function PokemonCard(props: PokemonCardProps) {
	const { pokemon } = props;
	const { types, image, name } = pokemon;
	const primaryType = types[0];
	const borderColor =
		borderColors[primaryType as keyof typeof borderColors] || "border-gray-300";

	return (
		<div
			className={`w-64 rounded-xl overflow-hidden border-8 bg-white shadow-lg transform transition-transform hover:scale-105 ${borderColor}`}
		>
			<div className="p-4 bg-gradient-to-b from-gray-100 to-white">
				<div className="flex justify-between items-center mb-2">
					<h2 className="text-xl font-bold">{name}</h2>
				</div>

				<div className="bg-gray-100 rounded-lg p-4 flex justify-center items-center mb-3">
					<img
						src={image || "/placeholder.svg"}
						alt={name}
						className="h-40 w-40 object-contain"
					/>
				</div>

				<div className="flex gap-2 mt-2">
					{types.map((type) => (
						<span
							key={type}
							className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${typeColors[type as keyof typeof typeColors] || "bg-gray-300"}`}
						>
							{type}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
