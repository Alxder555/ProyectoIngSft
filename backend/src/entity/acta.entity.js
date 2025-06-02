import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Acta",
  tableName: "actas",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    descripcion: {
      type: String,
      nullable: false,
    },
    acuerdos: {
      type: String,
      nullable: false,
    },
    votaciones: {
      type: String,
      nullable: false,
    },
    fechaCreacion: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    reunion: {
      type: "many-to-one",
      target: "Reunion",
      joinColumn: { name: "reunionId" },
      nullable: false,
    },
    creador: {
      type: "many-to-one",
      target: "Usuario",
      joinColumn: { name: "creadorId" },
      nullable: false,
    },
  },
});
