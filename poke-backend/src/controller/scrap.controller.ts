import { Request, Response } from "express"
import { fillDB } from "../utils/fillDB"

const scrapController = {
	scrap: async (req: Request, res: Response) => {
		try {
			fillDB()
			res.status(200).json({ message: "Scrapping started" })
		} catch (error: any) {
			res.status(500).json({ message: error.message })
		}
	},
}

export default scrapController
