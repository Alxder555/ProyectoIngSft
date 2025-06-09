import { Router } from "express";
import { AppDataSource } from "../config/configDb.js";
import * as actaController from "../controllers/acta.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
const router = Router();

//crear nueva acta (solo admin)
router.post("/", authenticateJwt, isAdmin, actaController.crearActa);

//editar acta existente (solo admin)
router.put("/:id", authenticateJwt, isAdmin, actaController.editarActa);

//obtener acta por reunionId (usuarios)
router.get("/reunion/:reunionId", authenticateJwt, actaController.actaPorReunionId);

//obtener acta por id (usuarios)
router.get("/:id", authenticateJwt, actaController.actaPorId);

//obtener todas las actas (usuarios)
router.get("/", authenticateJwt, actaController.obtenerTodasActas);

//borrar acta por id (solo admins)
router.delete("/:id", authenticateJwt, isAdmin, actaController.borrarActaPorId)

//borrar acta por id (solo admin)
//router.delete("/:id", authenticateJwt, isAdmin, async (req, res) => {
//    try {
//        const { id } = req.params;
//        const result = await actaController.borrarActa(id);
//        if (result) {
//            res.status(200).json({ message: "Acta eliminada exitosamente" });
//        } else {
//            res.status(404).json({ message: "Acta no encontrada" });
//        }
//    } catch (error) {
//        res.status(500).json({ message: "Error al eliminar el acta", error: error.message });
//    }
//});

//borrar acta por reunionId (solo admin)
router.delete("/reunion/:reunionId", authenticateJwt, isAdmin, actaController.borrarActaPorReunionId);

//router.delete("/reunion/:reunionId", authenticateJwt, isAdmin, async (req, res) => {
//    try {
//        const { reunionId } = req.params;
//        const result = await actaController.borrarActaPorReunionId(reunionId);
//        if (result) {
//            res.status(200).json({ message: "Acta eliminada exitosamente" });
//        } else {
//            res.status(404).json({ message: "Acta no encontrada para la reunión especificada" });
//        }
//    } catch (error) {
//        res.status(500).json({ message: "Error al eliminar el acta", error: error.message });
//    }
//});
export default router;
