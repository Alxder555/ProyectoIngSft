
import * as actaService from "../services/acta.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";
import Acta from "../entity/acta.entity.js";

//crear nueva acta
export async function crearActa(req, res) {
    try {
        const { body } = req;

        const nuevaActa = await actaService.crearActa(body);
        handleSuccess(res, 201, "Acta creada exitosamente", nuevaActa);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

//editar acta existente
export async function editarActa(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;

        const actaEditada = await actaService.editarActa(id, body);
        if (!actaEditada) {
            return handleErrorClient(res, 404, "Acta no encontrada");
        }

        handleSuccess(res, 200, "Acta editada exitosamente", actaEditada);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

//obtener acta por reunionId
export async function actaPorReunionId(req, res) {
    try {
        const { reunionId } = req.params;

        const acta = await actaService.actaPorReunionId(reunionId);
        if (!acta) {
            return handleErrorClient(res, 404, "Acta no encontrada para la reunión especificada");
        }

        handleSuccess(res, 200, "Acta encontrada", acta);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

//obtener acta por id
export async function actaPorId(req, res) {
    try {
        const { id } = req.params;

        const acta = await actaService.actaPorId(id);
        if (!acta) {
            return handleErrorClient(res, 404, "Acta no encontrada");
        }

        handleSuccess(res, 200, "Acta encontrada", acta);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}   