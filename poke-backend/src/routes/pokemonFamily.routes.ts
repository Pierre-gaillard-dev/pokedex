import { Router } from "express"
import pokemonFamilyController from "../controller/pokemonFamily.controller"

const router = Router()

router.get("/:id", pokemonFamilyController.getPokemonFamilyById)
router.post("/", pokemonFamilyController.createPokemonFamily)
router.delete("/:id", pokemonFamilyController.deletePokemonFamily)

export default router
