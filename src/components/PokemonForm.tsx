import { useState } from "react";

export function PokemonForm() {
	const [name, setName] = useState("");
	const [height, setHeight] = useState(0);
	const [weight, setWeight] = useState(0);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		alert(`New pokemon ${name}: weight ${weight}, height ${height}`);
	};
	const nameIsValid = name.length >= 4;
	const heightIsValid = height >= 10 && height <= 500;
	const weightIsValid = weight >= 10 && weight <= 500;

	const formIsValid = nameIsValid && heightIsValid && weightIsValid;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border-2 border-gray-300 rounded-md p-2"
				/>
			</div>
			<div>
				<label htmlFor="height">Height:</label>
				<input
					type="number"
					id="height"
					name="height"
					required
					value={height}
					onChange={(e) => setHeight(e.target.valueAsNumber)}
					className="border-2 border-gray-300 rounded-md p-2"
				/>
			</div>
			<div>
				<label htmlFor="weight">Weight:</label>
				<input
					type="number"
					id="weight"
					name="weight"
					required
					value={weight}
					onChange={(e) => setWeight(e.target.valueAsNumber)}
					className="border-2 border-gray-300 rounded-md p-2"
				/>
			</div>
			<button
				type="submit"
				disabled={!formIsValid}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Submit
			</button>
		</form>
	);
}
