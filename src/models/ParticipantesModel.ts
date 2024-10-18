import { readFileSync } from "fs";
import { executar_sql } from "../conexion/connection";

type ParticipantesModelAttr = {
  cpf: string;
  nome: string;
  celular: string;
};

export class ParticipantesModel implements ParticipantesModelAttr {
  cpf: string;
  nome: string;
  celular: string;

  constructor(attr: ParticipantesModelAttr) {
    Object.assign(this, attr);
  }

  static async listar_db() {
    const SQL = "SELECT * FROM PARTICIPANTES";

    const eventos = await executar_sql(SQL);

    console.table(eventos);
  }

  static async relatorio_db() {
    const relatorioSQL = readFileSync(
      "src/sql/rel_numero_participantes_por_evento.sql",
      "utf-8"
    );

    const relatorioResult = await executar_sql(relatorioSQL);

    console.table(relatorioResult);
  }
}
