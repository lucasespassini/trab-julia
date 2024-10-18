import { setTimeout } from "timers/promises";
import { connectDb, disconnectDb } from "./conexion/connection";
import { MenuController } from "./libs/menu";
import { scan } from "./libs/scan";

async function main() {
  await connectDb();

  const menu = new MenuController();
  let escolha = 0;

  while (true) {
    menu.menu_principal();

    escolha = +scan("\n-> ");

    if (escolha < 1 || escolha > 5) {
      console.log("\nOpção inválida!!!\n");
      await setTimeout(1000);
      continue;
    }

    if (escolha === 5) {
      disconnectDb();
      console.log("\nOBRIGADO POR UTILIZAR NOSSO SISTEMA\n");
      break;
    }

    menu.menu_secundario(escolha);
    await setTimeout(2000);
  }
}

main();
