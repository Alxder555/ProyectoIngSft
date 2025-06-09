import { AppDataSource } from "../config/configDb.js";
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

//obtener todas las actas
export async function obtenerTodasActas(req, res) {
    try {
        const actaRepo = AppDataSource.getRepository(Acta);
        const actas = await actaRepo.find({ relations: ["reunion", "creador"] });

        if (actas.length === 0) {
            return handleSuccess(res, 204, "No hay actas registradas");
        }

        handleSuccess(res, 200, "Actas obtenidas exitosamente", actas);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

//borrar acta por id
export async function borrarActaPorId(req, res) {
    try {
        const { id } = req.params;

        const actaRepo = AppDataSource.getRepository(Acta);
        const acta = await actaRepo.findOneBy({ id });
        if (!acta) {
            return handleErrorClient(res, 404, "Acta no encontrada");
        }

        await actaRepo.remove(acta);
        handleSuccess(res, 200, "Acta eliminada exitosamente");
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

//borrar acta por reunionId
export async function borrarActaPorReunionId(req, res) {
    try {
        const { reunionId } = req.params;

        const actaRepo = AppDataSource.getRepository(Acta);
        const acta = await actaRepo.findOne({ where: { reunionId } });
        if (!acta) {
            return handleErrorClient(res, 404, "Acta no encontrada para la reunión especificada");
        }

        await actaRepo.remove(acta);
        handleSuccess(res, 200, "Acta eliminada exitosamente");
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}   