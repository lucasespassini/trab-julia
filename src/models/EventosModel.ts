import { executar_sql } from "../conexion/connection";

interface IEventosModel {
  IDEvento?: number;
  tipoEvento: string;
  descricao: string;
  dataEvento: string;
  limiteParticipantes: number;
  duracaoEvento: string;
}

export class EventosModel implements IEventosModel {
  IDEvento?: number;
  tipoEvento: string;
  descricao: string;
  dataEvento: string;
  limiteParticipantes: number;
  duracaoEvento: string;

  constructor(eventoModel: IEventosModel) {
    Object.assign(this, eventoModel);
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
}
