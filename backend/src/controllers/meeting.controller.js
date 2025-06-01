"use strict";
import{
    createMeetingService,
    getMeetingService,
    getMeetingsService,
    deleteMeetingService,
    updateMeetingService
}from "../services/meeting.service.js";
import {
  meetingBodyValidation,
  meetingQueryValidation
} from "../validations/meeting.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createMeeting(req, res) {
  try {
    const { body } = req;

    const { error } = meetingBodyValidation.validate(body);

    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const [newMeeting, errorNewMeeting] = await createMeetingService(body);

    if (errorNewMeeting) return handleErrorClient(res, 400, "Error registrando la reunion", errorNewMeeting);

    handleSuccess(res, 201, "Reunion registrada con éxito", newMeeting);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
export async function getMeeting(req, res) {
  try {
    const { id } = req.query;

    const { error } = meetingQueryValidation.validate({ id });

    if (error) return handleErrorClient(res, 400, error.message);

    const [meeting, errorMeeting] = await getMeetingService({ id });

    if (errorMeeting) return handleErrorClient(res, 404, errorMeeting);

    handleSuccess(res, 200, "Reunion encontrada", meeting);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
export async function getMeetings(req,res) {
  try {
      const [meetings, errorMeetings] = await getMeetingsService();
  
      if (errorMeetings) return handleErrorClient(res, 404, errorMeetings);
  
      meetings.length === 0
        ? handleSuccess(res, 204)
        : handleSuccess(res, 200, "Reuniones encontradas", meetings);
    } catch (error) {
      handleErrorServer(
        res,
        500,
        error.message,
      );
    }
}
export async function deleteMeeting(req,res) {
  try {
    const { id } = req.query;

    const {error: queryError} = meetingQueryValidation.validate({
      id,
    })
    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [meetingDelete, errorMeetingDelete] = await deleteMeetingService({id});
    
    if(errorMeetingDelete) return handleErrorClient(res, 404, "Error al eliminar una reunion", errorMeetingDelete);
    
    handleSuccess(res, 200, "Reunion eliminada correctamente", meetingDelete);

  } catch (error) {
    console.error("Error al eliminar reunion:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateMeeting(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

    const { error: queryError } = meetingQueryValidation.validate({ id });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = meetingBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [meeting, ,meetingError] = await updateMeetingService({id}, body);

    if (meetingError) return handleErrorClient(res, 400, "Error modificando la reunion", meetingError);

    handleSuccess(res, 200, "Reunion modificado correctamente", meeting);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}