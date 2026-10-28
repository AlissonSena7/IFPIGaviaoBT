import { Categoria } from "../model/entities/categoria";
import { Produto } from "../model/entities/produto";

export interface IMenuUseCase {
  obterCategorias(): Promise<Categoria[]>;
  obterProdutosPorCategoria(categoriaId: string): Promise<Produto[]>;
  obterProdutoPorId(produtoId: string): Promise<Produto | undefined>;
}
