import Pokemon from "../models/pokemon"
import pokemons from "./mock-pokemons"

const types: string[] = []

export const fillDB = async () => {
	console.log("Filling the database with pokemons and types")

	pokemons.forEach((pokemon) => {
		addPokemon(pokemon)
		pokemon.types.forEach((type) => {
			if (!types.includes(type)) {
				types.push(type)
				addType(type)
			}
		})
	})
}

const addPokemon = async (pokemon: any) => {
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
		console.log(`error creating pokemon at init :`, error.message)
	}
}

const addType = async (name: string) => {
	const type = await fetch(`http://localhost:3000/api/types/name/${name}`, {
		method: "GET",
	})
	if (type.status === 200) {
		return
	}
	try {
		const res = await fetch("http://localhost:3000/api/types", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
			}),
		})
		return res.body
	} catch (error) {
		console.error(`error creating type at init :`, error)
	}
}
