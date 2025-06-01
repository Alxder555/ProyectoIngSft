"use strict";
import { EntitySchema } from "typeorm";

const MeetingSchema = new EntitySchema({
    name:"Meeting",
    tableName:"meetings",
    columns:{
    id: {
       type: "int",
       primary: true,
       generated: true,
    },
    horaInicio: {
        type:"varchar",
        nullable:false,
    },
    horaTermino: {
        type:"varchar",
        nullable:false,
    },
    fecha:{
      type:"date",
      nullable:false,
    },
    lugar: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    visibilidad: {
      type: "int",
      nullable:false,
      
    },
    cuerpo:{
      type:"varchar",
      length: 255,
      nullable: false,
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
    },

});
export default MeetingSchema;