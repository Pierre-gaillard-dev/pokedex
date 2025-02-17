import { Router } from "express"
import typeController from "../controller/type.controller"
import Rel_pokemonType from "../controller/Rel_pokemonType.controller"

const router = Router()

router.get("/", typeController.getTypes)
router.get("/name/:name", typeController.getTypeByName)
router.get("/:id", typeController.getTypeById)
router.post("/", typeController.createType)
router.put("/:id", typeController.updateType)
router.delete("/:id", typeController.deleteType)

router.get("/:id/pokemons", Rel_pokemonType.getPokemonsByTypeId)

export default router
