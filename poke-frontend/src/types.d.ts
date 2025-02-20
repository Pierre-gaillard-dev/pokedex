export type Type = {
	id: number
	name: string
	Rel_pokemon_type: {
		id: number
		pokemon_id: number
		type_id: number
	}
}

export type Pokemon = {
	id: number
	name: string
	hp: number
	cp: number
	picture: string
	created: Date
	types: Type[]
}
