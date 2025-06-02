

import { AppDataSource } from "../config/configDb.js";
import Acta  from "../entity/acta.entity.js";

//crear acta
export async function crearActa(data) {
  const actaRepo = AppDataSource.getRepository(Acta);
  const nuevaActa = actaRepo.create(data);
  return await actaRepo.save(nuevaActa);
}

//editar acta
export async function editarActa(id, data) {

    const actaRepo = AppDataSource.getRepository(Acta);
    const acta = await actaRepo.findOneBy({ id });
    if (!acta) {
        throw new Error("Acta no encontrada");
    }

    actaRepo.merge(acta, data);
    return await actaRepo.save(acta);
}

//obtener acta por reunionId
export async function actaPorReunionId(reunionId) {
    const actaRepo = AppDataSource.getRepository(Acta);
    const acta = await actaRepo.findOne({
        where: { reunionId },
        relations: ["reunion", "creador"]
    });
    
    if (!acta) {
        throw new Error("Acta no encontrada para la reunión especificada");
    }
    
    return acta;
}

//obtener acta por id
export async function actaPorId(id) {
    const actaRepo = AppDataSource.getRepository(Acta);
    const acta = await actaRepo.findOne({
        where: { id },
        relations: ["reunion", "creador"]
    });
    
    if (!acta) {
        throw new Error("Acta no encontrada");
    }
    
    return acta;
}   