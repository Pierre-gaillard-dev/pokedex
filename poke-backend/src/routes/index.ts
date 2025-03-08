import { Router } from "express"
import pokemonRoutes from "./pokemon.routes"
import typeRoutes from "./type.routes"
import pokemonFamilyRoutes from "./pokemonFamily.routes"
import scrapRoutes from "./scrap.routes"

const router = Router()

router.use("/pokemons", pokemonRoutes)
router.use("/types", typeRoutes)
router.use("/family", pokemonFamilyRoutes)
router.use("/scrap", scrapRoutes)

export default router
