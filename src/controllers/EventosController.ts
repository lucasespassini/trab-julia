import { scan } from "../libs/scan";
import { EventosModel } from "../models/EventosModel";

export class EventosController {
  async inserir_evento() {
    console.log("Digite os dados para criar o evento:\n");

    const descricao = scan("Descrição: ");
    const tipo = scan("Tipo: ");
    const data = scan("Data evento(yyyy-MM-dd): ");
    const limite = +scan("Limite de participantes: ");
    const duracao = scan("Duração: ");

    const novoEvento = new EventosModel({
      dataEvento: data,
      descricao: descricao,
      duracaoEvento: duracao,
      limiteParticipantes: limite,
      tipoEvento: tipo,
    });

    await EventosModel.criar_db(novoEvento);
  }

  async atualizar_evento() {
    await EventosModel.listar_db();

    console.log("Digite os dados para atualizar o evento:\n");

    const IDEvento = +scan("Id do evento: ");
    const descricao = scan("Descrição: ");
    const tipo = scan("Tipo: ");
    const data = scan("Data evento(yyyy-MM-dd): ");
    const limite = +scan("Limite de participantes: ");
    const duracao = scan("Duração: ");

    const novoEvento = new EventosModel({
      IDEvento: IDEvento,
      dataEvento: data,
      descricao: descricao,
      duracaoEvento: duracao,
      limiteParticipantes: limite,
      tipoEvento: tipo,
    });

    await EventosModel.atualizar_db(novoEvento);
  }

  async remover_evento() {}
}
