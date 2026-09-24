import { simularConsultaProdutoPorId } from "../data/mockDatabase";
import { Produto } from "./categoria";

export async function buscarProdutoPorId(
  produtoId: string
): Promise<Produto | undefined> {
  return await simularConsultaProdutoPorId(produtoId);
}