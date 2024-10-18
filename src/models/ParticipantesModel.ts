import { executar_sql } from "../conexion/connection";

interface IParticipantesModel {
  cpf: string;
  nome: string;
  celular: string;
}

export class ParticipantesModel implements IParticipantesModel {
  cpf: string;
  nome: string;
  celular: string;

  constructor(attr: IParticipantesModel) {
    Object.assign(this, attr);
  }

  static async listar_db() {
    const SQL = "SELECT * FROM PARTICIPANTES";

    const eventos = await executar_sql(SQL);

    console.table(eventos);
  }
}
