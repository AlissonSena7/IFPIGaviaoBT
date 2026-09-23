import {
  simularConsultaCategorias,
  simularConsultaProdutosPorCategoria,
} from "../data/mockDatabase";

import {
  Categoria,
  Produto,
} from "./categoria";

export async function buscarCategorias(): Promise<Categoria[]> {
  return await simularConsultaCategorias();
}

export async function buscarProdutosPorCategoria(
  categoriaId: string
): Promise<Produto[]> {
  return await simularConsultaProdutosPorCategoria(categoriaId);
}