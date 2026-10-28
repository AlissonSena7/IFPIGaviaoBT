import {
    simularConsultaProdutoPorId,
    simularConsultaProdutosPorCategoria,
} from "../../data/mockDatabase";
import { IProductDataSource } from "../../model/datasources/iProductDataSource";
import { Produto } from "../../model/entities/produto";
import { DataSourceError } from "../../model/error";

export class ProdutoDataSource implements IProductDataSource {
  async buscarProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    try {
      return await simularConsultaProdutosPorCategoria(categoriaId);
    } catch (error) {
      throw new DataSourceError(
        `Erro ao buscar produtos da categoria ${categoriaId}.`,
        error,
      );
    }
  }

  async buscarProdutoPorId(produtoId: string): Promise<Produto | undefined> {
    try {
      return await simularConsultaProdutoPorId(produtoId);
    } catch (error) {
      throw new DataSourceError(
        `Erro ao buscar produto com ID ${produtoId}.`,
        error,
      );
    }
  }
}
