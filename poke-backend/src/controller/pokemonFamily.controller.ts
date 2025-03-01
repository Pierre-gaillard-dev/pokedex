import { Request, Response } from "express"
import PokemonFamily from "../models/pokemonFamily"
import { Pokemon } from "../models"

const pokemonFamilyController = {
	getPokemonFamilyById: async (req: Request, res: Response) => {
		const id = req.params.id
		try {
			const pokemonFamily = await PokemonFamily.findByPk(id, {
				include: "pokemons",
				order: [[{ model: Pokemon, as: "pokemons" }, "id", "ASC"]],
			})
			if (!pokemonFamily) {
				res.status(404).json({ message: "Pokemon family not found" })
				return
			}
			res.status(200).json(pokemonFamily)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	createPokemonFamily: async (req: Request, res: Response) => {
		const pokemonFamily = new PokemonFamily(req.body)
		try {
			const newPokemonFamily = await pokemonFamily.save()
			res.status(201).json(newPokemonFamily)
		} catch (error: any) {
			console.log(error.message)
			res.status(400).json({ message: error.message })
		}
	},

	deletePokemonFamily: async (req: Request, res: Response) => {
		const id = req.params.id
		try {
			const pokemonFamily = await PokemonFamily.findByPk(id)
			if (!pokemonFamily) {
				res.status(404).json({ message: "Pokemon family not found" })
				return
			}
			await pokemonFamily.destroy()
			res.status(204).json()
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},
}

export default pokemonFamilyController
