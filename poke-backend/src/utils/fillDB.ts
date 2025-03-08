import dotenv from "dotenv"
import { Pokemon } from "../models"
//import pokemons from "./mock-pokemons"

dotenv.config()

let pokemons: any[] = []
const pokemonsAdded: string[] = []
const types: { name: string; image: string }[] = []
const typesAdded: string[] = []

/**
 * Fill the DB with pokemons, types and families from the distant API
 * @returns void
 */
export const fillDB = async () => {
	pokemons.empty()
	pokemonsAdded.empty()
	types.empty()
	typesAdded.empty()
	console.log("Filling database")
	pokemons = await getDistantPokemons()
	await addAllPokemons()
	await addAllTypes()

	await addAllPokemonTypes()
	await addAllPokemonFamilies()
	console.log("Databse filled")
}

/**
 * Get all pokemons from the distant API
 * @returns array of pokemons
 */
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

/**
 * Add all pokemons to the DB
 * @returns void
 */
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
	console.log("added all pokemons", pokemons.length)
}

/**
 * Add a pokemon to the DB if it doesn't exist
 * @param pokemon
 * @returns void
 */
const addPokemon = async (pokemon: any) => {
	const controller = new AbortController()
	const timeout = setTimeout(() => controller.abort(), 20000) // 10s timeout
	const pokemon2 = await fetch(
		`http://localhost:3000/api/pokemons/name/${pokemon.name}`,
		{
			method: "GET",
			signal: controller.signal,
		}
	)
	if (pokemon2.status === 200) {
		pokemonsAdded.push(pokemon.name)
		return
	}
	// add new pokemon
	try {
		await fetch("http://localhost:3000/api/pokemons", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: pokemon.id,
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

/**
 * Add all types to the DB
 * @returns void
 */
const addAllTypes = async () => {
	console.log("adding all types...")
	for (const type of types) {
		await addType(type)
	}
	console.log("added all types", types.length)
}

/**
 * Add a type to the DB if it doesn't exist
 * @param type
 * @returns void
 */
const addType = async (type: { name: string; image: string }) => {
	const type2 = await fetch(
		`http://localhost:3000/api/types/name/${type.name}`,
		{
			method: "GET",
		}
	)
	if (type2.status === 200) {
		typesAdded.push(type.name)
		return
	}
	// add new type
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

/**
 * Add types to pokemons in the DB if they aren't already
 * @returns void
 */
const addAllPokemonTypes = async () => {
	console.log("adding all types to pokemons")
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
	console.log("added all types to pokemons")
	return
}

/**
 * Add a type to a pokemon in the DB if it isn't already linked
 * @param pokemonId
 * @param typeId
 * @returns void
 */
const addPokemonType = async (pokemonId: number, typeId: number) => {
	const pokemonType = await fetch(
		`http://localhost:3000/api/pokemons/${pokemonId}/types/${typeId}`,
		{
			method: "GET",
		}
	)
	if (pokemonType.status === 200) {
		return
	}
	// add new pokemonType
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

/**
 * Add all pokemon families to the DB
 * @returns void
 */
const addAllPokemonFamilies = async () => {
	console.log("adding all pokemon families...")
	for (const pokemon of pokemons) {
		await addPokemonFamily(pokemon)
	}
	console.log("added all pokemon families")
}

/**
 * Add a pokemon family to the DB if it doesn't exist and its evolutions
 * @param pokemon
 * @param familyId if the pokemon has a pre-evolution
 * @returns void
 */
const addPokemonFamily = async (pokemon: any, familyId?: number) => {
	// check if pokemon already has a family
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
	if (pokemonBody.family_id) {
		if ((familyId && pokemonBody.family_id == familyId) || !familyId) {
			return
		}
	}
	// links pokemon to existing family
	if (familyId) {
		await fetch(`http://localhost:3000/api/pokemons/${pokemon.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				family_id: familyId,
			}),
		})

		if (pokemon.apiEvolutions != "none") {
			for (const evolution of pokemon.apiEvolutions) {
				await addPokemonFamily(
					await (
						await fetch(
							`${process.env.SCRAP_URL}/pokemon/${evolution.pokedexId}`
						)
					).json(),
					familyId
				)
			}
		}
		return
	}

	if (pokemon.apiPreEvolution != "none") {
		return
	}

	// add new family
	const res = await (
		await fetch("http://localhost:3000/api/family", {
			method: "POST",
		})
	).json()

	// links pokemon to new family
	await fetch(`http://localhost:3000/api/pokemons/${pokemon.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			family_id: res.id,
		}),
	})

	// add evolutions to family
	for (const evolution of pokemon.apiEvolutions) {
		await addPokemonFamily(
			await (
				await fetch(
					`${process.env.SCRAP_URL}/pokemon/${evolution.pokedexId}`
				)
			).json(),
			res.id
		)
	}

	return
}
