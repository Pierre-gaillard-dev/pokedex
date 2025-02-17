import { Request, Response } from "express"
import Rel_pokemonType from "../models/rel_pokemonType"
import { Pokemon, Type } from "../models"

const rel_pokemonTypeController = {
	getTypesByPokemonId: async (req: Request, res: Response) => {
		try {
			const types = await Rel_pokemonType.findAll({
				where: { pokemon_id: req.params.id },
				include: "type",
			})
			res.status(200).json(types)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	getPokemonsByTypeId: async (req: Request, res: Response) => {
		try {
			const pokemons = await Rel_pokemonType.findAll({
				where: { type_id: req.params.id },
				include: "pokemon",
			})
			res.status(200).json(pokemons)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	addTypeToPokemon: async (req: Request, res: Response) => {
		const rel = await Rel_pokemonType.findOne({
			where: {
				pokemon_id: req.params.pokemon_id,
				type_id: req.params.type_id,
			},
		})
		if (rel) {
			res.status(400).json({ message: "This relation already exists" })
			return
		}

		const pokemon = await Pokemon.findByPk(req.params.pokemon_id)
		if (!pokemon) {
			res.status(404).json({ message: "Pokemon not found" })
			return
		}

		const type = await Type.findByPk(req.params.type_id)
		if (!type) {
			res.status(404).json({ message: "Type not found" })
			return
		}

		const rel_pokemonType = new Rel_pokemonType({
			pokemon_id: req.params.pokemon_id,
			type_id: req.params.type_id,
		})
		try {
			await rel_pokemonType.save()
			const newPokemon = await Pokemon.findByPk(req.params.pokemon_id, {
				include: "types",
			})
			res.status(201).json(newPokemon)
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	},
}

export default rel_pokemonTypeController
