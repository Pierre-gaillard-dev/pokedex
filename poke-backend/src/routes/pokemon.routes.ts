import { Router, Request, Response } from "express"
import pokemonController from "../controller/pokemon.controller"

const router = Router()

router.get("/", pokemonController.getPokemons)
router.get("/:id", pokemonController.getPokemonById)
router.post("/", pokemonController.createPokemon)
router.put("/:id", pokemonController.updatePokemon)
router.delete("/:id", pokemonController.deletePokemon)

export default router
