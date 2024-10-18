import { readFileSync } from "fs";
import { executar_sql } from "../conexion/connection";

type EventosModelAttr = {
  IDEvento?: number;
  tipoEvento: string;
  descricao: string;
  dataEvento: string;
  limiteParticipantes: number;
  duracaoEvento: string;
};

export class EventosModel implements EventosModelAttr {
  IDEvento?: number;
  tipoEvento: string;
  descricao: string;
  dataEvento: string;
  limiteParticipantes: number;
  duracaoEvento: string;

  constructor(attr: EventosModelAttr) {
    Object.assign(this, attr);
  }

  static async listar_db() {
    const SQL = "SELECT * FROM EVENTOS";

    const eventos = await executar_sql(SQL);

    console.table(eventos);
  }

  static async criar_db(evento: EventosModel) {
    try {
      const SQL = `INSERT INTO 
                    EVENTOS(TIPO_EVENTO, DESCRICAO_EVENTO, DATA_EVENTO, LIMITE_PARTICIPANTES, DURACAO_EVENTO) 
                    VALUES("${evento.tipoEvento}","${evento.descricao}","${evento.dataEvento}",${evento.limiteParticipantes},"${evento.duracaoEvento}")`;
      console.log(SQL);
      await executar_sql(SQL);
      console.log("\nEvento criado com sucesso!!!\n");
    } catch (error) {
      console.log("\nErro ao criar evento!!!\n");
    }
  }

  static async atualizar_db(evento: EventosModel) {
    const SQL = `UPDATE EVENTOS 
                  SET TIPO_EVENTO = "${evento.tipoEvento}", 
                    DESCRICAO_EVENTO = "${evento.descricao}", 
                    DATA_EVENTO = "${evento.dataEvento}", 
                    LIMITE_PARTICIPANTES = ${evento.limiteParticipantes}, 
                    DURACAO_EVENTO = "${evento.duracaoEvento}"
                WHERE EVENTO_ID = ${evento.IDEvento}`;

    await executar_sql(SQL);
    console.log("\nEvento editado com sucesso!!!\n");
  }

  static async relatorio_db() {
    const relatorioSQL = readFileSync(
      "src/sql/rel_eventos_agrupados_por_mes.sql",
      "utf-8"
    );

    const relatorioResult = await executar_sql(relatorioSQL);

    console.table(relatorioResult);
  }
}
