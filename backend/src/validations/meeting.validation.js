"use strict";
import Joi from "joi";

export const meetingBodyValidation = Joi.object({
  horaInicio: Joi.string()
    .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
    .messages({
      "string.pattern":"Formato de Fecha de inicio invalido deber ser de la forma XX:XX",
    }),
  horaTermino: Joi.string()
    .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
    .messages({
      "string.pattern":"Formato de Fecha de termino invalido deber ser de la forma XX:XX",
    }),
  lugar: Joi.string()
    .min(5)
    .message({
        "string.min":"El lugar debe de tener un minimo de 5 caracteres",
    }),
    fecha: Joi.date()
    .iso()
    .greater('now')
    .message({
        "date.greater":"La fecha debe ser de un dia futuro",
        "date.iso":"La fecha debe de tener un minimo de 5 caracteres",
    }),
    visibilidad: Joi.number()
        .integer()
        .positive()
        .messages({
          "integer.base": "La visibilidad debe ser un entero.",
          "integer.positive": "La visibilidad debe positiva.",
        }),
    cuerpo: Joi.string()
        .min(4)
        .max(100)
        .message({
          "string.min":"El cuerpo de la reunion debe tener como minimo 4 caracteres",
          "string.max":"El cuerpo de la reunion debe tener como maximo 100 caracteres"
        }),
  })
  .or(
    "horaInicio",
    "horaTermino",
    "lugar",
    "fecha",
    "visibilidad",
    "cuerpo",
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

    })