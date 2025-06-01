"use strict";
import Meeting from "../entity/meeting.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createMeetingService(meeting) {
    try {
    const meetingRepository = AppDataSource.getRepository(Meeting);

    const { horaInicio, horaTermino, lugar, fecha, visibilidad, cuerpo  } = meeting;

    const createErrorMessage = (dataInfo, message) => ({
      dataInfo,
      message
    });
    const newMeeting = meetingRepository.create({
      horaInicio,
      horaTermino,
      lugar,
      fecha,
      visibilidad,
      cuerpo,
    });

    await meetingRepository.save(newMeeting);

    const {...dataMeeting } = newMeeting;

    return [dataMeeting, null];
  } catch (error) {
    console.error("Error al registrar la reunion", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getMeetingsService() {
    try {
    const meetingRepository = AppDataSource.getRepository(Meeting);

    const meetings = await meetingRepository.find();

    if (!meetings || meetings.length === 0) return [null, "No hay reuniones"];

    const meetingsData = meetings.map(({...meeting }) => meeting);

    return [meetingsData, null];
  } catch (error) {
    console.error("Error al obtener a las reuniones:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getMeetingService(query) {
    try {
    const { id } = query;

    const meetingRepository = AppDataSource.getRepository(Meeting);

    const meetingFound = await meetingRepository.findOne({
      where: [{ id: id }],
    });

    if (!meetingFound) return [null, "Reunion no encontrada"];

    const {...meetingData } = meetingFound;

    return [meetingData, null];
  } catch (error) {
    console.error("Error al obtener la reunion:", error);
    return [null, "Error interno del servidor"];
  }
}
export async function updateMeetingService(query, body) {
  try {
    const {id} = query;

    const meetingRepository = AppDataSource.getRepository(Meeting);

    const meetingFound = await meetingRepository.findOne({
      where: [{ id: id}],
    });

    if (!meetingFound) return [null, "Reunion no encontrada"];

    const dataMeetingUpdate = {
      horaInicio: body.fechaInicio,
      horaTermino: body.fechaTermino,
      lugar: body.lugar,
      fecha: body.fecha,
      visibilidad: body.visibilidad,
      cuerpo: body.cuerpo,
      updatedAt: new Date(),
    };

    await meetingRepository.update({ id: meetingFound.id }, dataMeetingUpdate);

    const meetingData = await meetingRepository.findOne({
      where: { id: meetingFound.id },
    });

    if (!meetingData) {
      return [null, "Usuario no encontrado después de actualizar"];
    }

    const { meetingUpdated } = meetingData;

    return [meetingUpdated, null];
  } catch (error) {
    console.error("Error al modificar una reunion:", error);
    return [null, "Error interno del servidor"];
  }
}
export async function deleteMeetingService(query) {
  try {
    const {id} = query;

    const meetingRepository = AppDataSource.getRepository(Meeting);

    const meetingFound = await meetingRepository.findOne({
      where: [{ id: id }],
    });

    if (!meetingFound) return [null, "Reunion no encontrada"];

    if (meetingFound.rol === "administrador") {
      return [null, "No se puede eliminar un usuario con rol de administrador"];
    }

    const meetingDeleted = await meetingRepository.remove(meetingFound);

    const {...dataMeeting } = meetingDeleted;

    return [dataMeeting, null];
  } catch (error) {
    console.error("Error al eliminar una reunion:", error);
    return [null, "Error interno del servidor"];
  }
}