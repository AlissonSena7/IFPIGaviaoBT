import { Categoria } from "../entities/categoria";

export interface ICategoryDataSource {
  buscarCategorias(): Promise<Categoria[]>;
}
