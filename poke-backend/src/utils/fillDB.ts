import pokemons from "./mock-pokemons"

const types: string[] = []

export const fillDB = async () => {
	console.log("Filling database")
	await addAllPokemons()
	await addAllTypes()
	while ((await pokemonsAdded()).length < pokemons.length) {
		console.log("Waiting for pokemons to be added")
	}
	while ((await typesAdded()).length < types.length) {
		console.log("Waiting for types to be added")
	}
	await addAllPokemonTypes()
	console.log("Databse filled")
}

const pokemonsAdded = async () => {
	const pokemons = await fetch("http://localhost:3000/api/pokemons", {
		method: "GET",
	})
	return pokemons.json()
}

const addAllPokemons = async () => {
	pokemons.forEach(async (pokemon) => {
		await addPokemon(pokemon)
		pokemon.types.forEach(async (type) => {
			if (!types.includes(type)) {
				types.push(type)
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

const typesAdded = async () => {
	const types = await fetch("http://localhost:3000/api/types", {
		method: "GET",
	})
	return types.json()
}

const addAllTypes = async () => {
	types.forEach(async (type) => {
		await addType(type)
	})
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

const addAllPokemonTypes = async () => {
	pokemons.forEach(async (pokemon) => {
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
		pokemon.types.forEach(async (type) => {
			const type2 = await fetch(
				`http://localhost:3000/api/types/name/${type}`,
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
		})
	})
}

const addPokemonType = async (pokemonId: number, typeId: number) => {
	console.log(
		`Adding pokemonType for pokemon ${pokemonId} and type ${typeId}`
	)
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
