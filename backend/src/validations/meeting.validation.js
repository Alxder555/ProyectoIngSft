"use strict";
import Joi from "joi";

export const meetingBodyValidation = Joi.object({
  fechaInicio: Joi.string()
    .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
    .messages({
      "string.isoDate":"Formato de Fecha de inicio invalido deber ser de la forma XX:XX",
    }),
  fechaTermino: Joi.string()
    .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
    .messages({
      "string.isoDate":"Formato de Fecha de termino invalido deber ser de la forma XX:XX",
    }),
  lugar: Joi.string()
    .min(5)
    .message({
        "string.min":"El lugar debe de tener un minimo de 5 caracteres",
    }),
  })
  .or(
    "fechaInicio",
    "fechaTermino",
    "lugar",

  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing": "Debes proporcionar al menos un campo: fechaInicio, fechaTermino o lugar.",
  });

  export const meetingQueryValidation = Joi.object({
    id: Joi.number()
      .integer()
      .positive()
      .messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
      }),
    fechaInicio: Joi.string()
      .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
      .messages({
        "string.isoDate":"Formato de Fecha de inicio invalido deber ser de la forma XX:XX",
    }),
    fechaTermino: Joi.string()
      .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
      .messages({
        "string.isoDate":"Formato de Fecha de termino invalido deber ser de la forma XX:XX",
    }),
    lugar: Joi.string()
      .min(5)
      .message({
        "string.min":"El lugar debe de tener un minimo de 5 caracteres",
    }),
    })