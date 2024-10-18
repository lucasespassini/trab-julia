import { ParticipantesModel } from "../models/ParticipantesModel";
import { prompt } from "../utils/prompt";

export class ParticipantesController {
  async inserir_participante() {
    console.log("Digite os dados para criar o participante:\n");

    const cpf = prompt("CPF: ");
    const nome = prompt("Nome: ");
    const celular = prompt("Celular: ");

    const novoParticipante = new ParticipantesModel({
      cpf,
      nome,
      celular,
    });
  }

  async atualizar_participante() {
    await ParticipantesModel.listar_db();
  }

  async remover_participante() {}
}
