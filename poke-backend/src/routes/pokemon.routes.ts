import { Router, Request, Response } from "express"
import pokemonController from "../controller/pokemon.controller"
import Rel_pokemonType from "../controller/Rel_pokemonType.controller"

const router = Router()

router.get("/", pokemonController.getPokemons)
router.get("/:id", pokemonController.getPokemonById)
router.post("/", pokemonController.createPokemon)
router.put("/:id", pokemonController.updatePokemon)
router.delete("/:id", pokemonController.deletePokemon)

router.get("/:id/types", Rel_pokemonType.getTypesByPokemonId)
router.post("/:pokemon_id/types/:type_id", Rel_pokemonType.addTypeToPokemon)

export default router
