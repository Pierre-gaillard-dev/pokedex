import dotenv from "dotenv"
//import pokemons from "./mock-pokemons"

dotenv.config()

let pokemons: any[] = []
const pokemonsAdded: string[] = []
const types: { name: string; image: string }[] = []
const typesAdded: string[] = []

export const fillDB = async () => {
	console.log("Filling database")
	pokemons = await getDistantPokemons()
	await addAllPokemons()
	await addAllTypes()

	await addAllPokemonTypes()
	console.log("Databse filled")
}

const getDistantPokemons = async () => {
	console.log("fetching pokemons...")

	const pokemons = await fetch(`${process.env.SCRAP_URL}/pokemon`)
	if (pokemons.status != 200) {
		console.error("error fetching pokemons from distant API")
		return []
	}
	console.log("fetched pokemons")
	return (await pokemons.json()) as unknown as []
}

const addAllPokemons = async () => {
	console.log("adding all pokemons...")
	for (const pokemon of pokemons) {
		await addPokemon(pokemon)

		pokemon.apiTypes.forEach((type: { name: string; image: string }) => {
			const added = types.find((a) => a.name == type.name)
			if (!added) {
				types.push(type)
			}
		})
	}
	console.log("all pokemons added", pokemons.length)
}

const addPokemon = async (pokemon: any) => {
	const controller = new AbortController()
	const timeout = setTimeout(() => controller.abort(), 20000) // 10s timeout
	try {
		await fetch("http://localhost:3000/api/pokemons", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// id: pokemon.id,
				name: pokemon.name,
				hp: pokemon.stats.HP,
				cp: pokemon.stats.attack,
				picture: pokemon.sprite,
			}),
			signal: controller.signal,
		})
		pokemonsAdded.push(pokemon.name)
		return
	} catch (error: any) {
		console.log(`error creating pokemon at init :`, error, pokemon.name)
		console.error(error.stack)
	} finally {
		clearTimeout(timeout)
	}
}

const addAllTypes = async () => {
	console.log("adding all types...")
	for (const type of types) {
		await addType(type)
	}
	console.log("types added", types.length)
}

/*
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
*/

const addType = async (type: { name: string; image: string }) => {
	try {
		const res = await fetch("http://localhost:3000/api/types", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: type.name,
				image: type.image,
			}),
		})
		typesAdded.push(type.name)
		return res.body
	} catch (error) {
		console.error(`error creating type at init :`, error)
	}
}

const addAllPokemonTypes = async () => {
	console.log("adding types to pokemons")
	for (const pokemon of pokemons) {
		const pokemon2 = await fetch(
			`http://localhost:3000/api/pokemons/name/${pokemon.name}`,
			{
				method: "GET",
			}
		)
		if (pokemon2.status === 404) {
			console.error(`pokemon not found at init :`, pokemon.name)
			return
		}
		const pokemonBody = await pokemon2.json()
		const pokemonId = pokemonBody.id
		for (const type of pokemon.apiTypes) {
			const type2 = await fetch(
				`http://localhost:3000/api/types/name/${type.name}`,
				{
					method: "GET",
				}
			)

			if (type2.status === 404) {
				console.error(`type not found at init :`, type)
				return
			}
			const typebody = await type2.json()
			const typeId = typebody.id
			await addPokemonType(pokemonId, typeId)
		}
	}
	console.log("added all pokemons types")
	return
}

const addPokemonType = async (pokemonId: number, typeId: number) => {
	try {
		const res = await fetch(
			`http://localhost:3000/api/pokemons/${pokemonId}/types/${typeId}`,
			{
				method: "POST",
			}
		)
		return res.body
	} catch (error) {
		console.error(`error creating pokemonType at init :`, error)
	}
}

const addPokemonFamily = async () => {
	try {
		const res = await fetch("https://localhost:3000/api/family", {
			method: "POST",
		})
		return res.body
	} catch (error) {
		console.error("error creating pokemon family :", error)
	}
}
