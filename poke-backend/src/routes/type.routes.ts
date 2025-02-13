import { Router } from "express"
import typeController from "../controller/type.controller"

const router = Router()

router.get("/", typeController.getTypes)
router.get("/:id", typeController.getTypeById)
router.get("/name/:name", typeController.getTypeByName)
router.post("/", typeController.createType)
router.put("/:id", typeController.updateType)
router.delete("/:id", typeController.deleteType)

export default router
