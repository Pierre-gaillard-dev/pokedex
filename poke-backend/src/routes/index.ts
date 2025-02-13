import { Router } from "express"
import pokemonRoutes from "./pokemon.routes"

const router = Router()

router.use("/pokemons", pokemonRoutes)

export default router
