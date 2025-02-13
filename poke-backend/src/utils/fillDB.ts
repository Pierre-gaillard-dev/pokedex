import Pokemon from "../models/pokemon"
import pokemons from "./mock-pokemons"

export const fillDB = async () => {
	console.log("Filling the database with pokemons")

	pokemons.forEach((pokemon) => {
		try {
			fetch("http://localhost:3000/api/pokemons", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: pokemon.id,
					name: pokemon.name,
					hp: pokemon.hp,
					cp: pokemon.cp,
					picture: pokemon.picture,
				}),
			})
		} catch (error: any) {
			console.log(error.message)
		}
	})
}
