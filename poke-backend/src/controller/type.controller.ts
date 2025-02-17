import { Request, Response } from "express"
import Type from "../models/type"

const TypeController = {
	getTypes: async (req: Request, res: Response) => {
		try {
			const types = await Type.findAll()
			res.status(200).json(types)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	getTypeById: async (req: Request, res: Response) => {
		try {
			const type = await Type.findByPk(req.params.id, {
				include: "pokemons",
			})
			if (!type) {
				res.status(404).json({ message: "Type not found" })
				return
			}
			res.status(200).json(type)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	getTypeByName: async (req: Request, res: Response) => {
		try {
			const type = await Type.findOne({
				where: { name: req.params.name },
				include: "pokemons",
			})
			if (!type) {
				res.status(404).json({ message: "Type not found" })
				return
			}
			res.status(200).json(type)
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},

	createType: async (req: Request, res: Response) => {
		if (!req.body || Object.keys(req.body).length === 0) {
			res.status(400).json({ message: "Data to create can not be empty" })
			return
		}
		try {
			const type = new Type(req.body)
			const newType = await type.save()
			res.status(201).json(newType)
		} catch (error: any) {
			console.log(`error creating type :`, error)
			res.status(400).json({ message: error.message })
		}
	},

	updateType: async (req: Request, res: Response) => {
		if (!req.body || Object.keys(req.body).length === 0) {
			res.status(400).json({ message: "Data to update can not be empty" })
			return
		}
		try {
			const type = await Type.findByPk(req.params.id, {
				include: "pokemons",
			})
			if (!type) {
				res.status(404).json({ message: "Type not found" })
				return
			}
			type.update(req.body)
			res.status(200).json(type)
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	},

	deleteType: async (req: Request, res: Response) => {
		try {
			const deletedType = await Type.destroy({
				where: { id: req.params.id },
			})
			if (!deletedType) {
				res.status(404).json({ message: "Type not found" })
				return
			}
			res.status(200).json({ message: "Type deleted successfully" })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},
}

export default TypeController
