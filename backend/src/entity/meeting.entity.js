"use strict";
import { EntitySchema } from "typeorm";

const MeetingSchema = new EntitySchema({
    name:"Meeting",
    tableName:"Meetings",
    columns:{
    id: {
       type: "int",
       primary: true,
       generated: true,
    },
    fechaInicio: {
        type:"varchar",
        nullable:false,
    },
    fechaTermino: {
        type:"varchar",
        nullable:false,
    },
    lugar: {
      type: "varchar",
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