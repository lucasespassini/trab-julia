import { scan } from "../libs/scan";
import { ParticipantesModel } from "../models/ParticipantesModel";

export class ParticipantesController {
  async inserir_participante() {
    console.log("Digite os dados para criar o participante:\n");

    const cpf = scan("CPF: ");
    const nome = scan("Nome: ");
    const celular = scan("Celular: ");

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
