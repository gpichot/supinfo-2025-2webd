import { Link } from "react-router";

export function Navigation() {
	return (
		<div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
			<Link to="/">Accueil</Link>
			<Link to="/pokemons/new">New Pokemon</Link>
			<Link to="/contact/Gabriel">Contact</Link>
			<Link to="/mentions-legales">Mentions légales</Link>
		</div>
	);
}
