export type Type = {
	id: number
	name: string
	Rel_pokemon_type: {
		id: number
		pokemon_id: number
		type_id: number
	}
}

export type Family = {
	id: number
	pokemons: Pokemon[]
}

export type Pokemon = {
	id: number
	name: string
	hp: number
	cp: number
	picture: string
	family_id: number
	created: Date
	types: Type[]
	family: Family
}
