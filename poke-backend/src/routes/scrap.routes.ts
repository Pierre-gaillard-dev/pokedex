import { Router } from "express"
import scrapController from "../controller/scrap.controller"

const scrapRouter = Router()

scrapRouter.get("/", scrapController.scrap)

export default scrapRouter
