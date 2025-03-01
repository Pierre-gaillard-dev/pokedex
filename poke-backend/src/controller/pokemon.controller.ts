import { Request, Response } from "express"
import Pokemon from "../models/pokemon"
import { PokemonFamily } from "../models"

const pokemonController = {
	getPokemons: async (req: Request, res: Response) => {
		try {
			const pokemons = await Pokemon.findAll({
				include: [
					"types",
					{
						association: "family",
						include: [
							{
								association: "pokemons",
							},
						],
					},
				],
				order: [
					[
						{ model: PokemonFamily, as: "family" },
						{ model: Pokemon, as: "pokemons" },
						"id",
						"ASC",
					],
				],
			})
			res.status(200).json(pokemons)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	getPokemonById: async (req: Request, res: Response) => {
		try {
			const pokemon = await Pokemon.findByPk(req.params.id, {
				include: [
					"types",
					{
						association: "family",
						include: [
							{
								association: "pokemons",
							},
						],
					},
				],
				order: [
					[
						{ model: PokemonFamily, as: "family" },
						{ model: Pokemon, as: "pokemons" },
						"id",
						"ASC",
					],
				],
			})
			if (!pokemon) {
				res.status(404).json({ message: "Pokemon not found" })
				return
			}
			res.status(200).json(pokemon)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	getPokemonByName: async (req: Request, res: Response) => {
		try {
			const pokemon = await Pokemon.findOne({
				where: { name: req.params.name },
				include: "types",
			})
			if (!pokemon) {
				res.status(404).json({ message: "Pokemon not found" })
				return
			}
			res.status(200).json(pokemon)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	createPokemon: async (req: Request, res: Response) => {
		const pokemon = new Pokemon(req.body)
		try {
			const newPokemon = await pokemon.save()
			res.status(201).json(newPokemon)
		} catch (error: any) {
			console.log(error.message)
			res.status(400).json({ message: error.message })
		}
	},

	updatePokemon: async (req: Request, res: Response) => {
		if (!req.body || Object.keys(req.body).length === 0) {
			res.status(400).json({ message: "Data to update can not be empty" })
			return
		}
		try {
			const pokemon = await Pokemon.findByPk(req.params.id)
			if (!pokemon) {
				res.status(404).json({ message: "Pokemon not found" })
				return
			}
			pokemon.update(req.body)
			res.status(200).json(pokemon)
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	},

	deletePokemon: async (req: Request, res: Response) => {
		try {
			const deletedPokemon = await Pokemon.destroy({
				where: { id: req.params.id },
			})
			if (!deletedPokemon) {
				res.status(404).json({ message: "Pokemon not found" })
				return
			}
			res.status(200).json({ message: "Pokemon deleted" })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},
}

export default pokemonController
