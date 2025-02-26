import { Router } from "express"
import pokemonRoutes from "./pokemon.routes"
import typeRoutes from "./type.routes"
import pokemonFamilyRoutes from "./pokemonFamily.routes"

const router = Router()

router.use("/pokemons", pokemonRoutes)
router.use("/types", typeRoutes)
router.use("/family", pokemonFamilyRoutes)

export default router
