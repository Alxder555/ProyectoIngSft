import { Router } from "express";
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
router.get("/", authenticateJwt, isAdmin, async (req, res) => {
    try {
        const actas = await actaController.obtenerTodasActas();
        res.status(200).json({ message: "Actas obtenidas exitosamente", data: actas });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las actas", error: error.message });
    }
});
export default router;
