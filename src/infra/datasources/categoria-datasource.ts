import { simularConsultaCategorias } from "../../data/mockDatabase";
import { ICategoryDataSource } from "../../model/datasources/iCategoryDataSource";
import { Categoria } from "../../model/entities/categoria";
import { DataSourceError } from "../../model/error";

export class CategoriaDataSource implements ICategoryDataSource {
  async buscarCategorias(): Promise<Categoria[]> {
    try {
      return await simularConsultaCategorias();
    } catch (error) {
      throw new DataSourceError(
        "Erro ao buscar categorias no banco de dados.",
        error,
      );
    }
  }
}
