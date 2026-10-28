import { Produto } from "../entities/produto";

export interface IProductDataSource {
  buscarProdutosPorCategoria(categoriaId: string): Promise<Produto[]>;
  buscarProdutoPorId(produtoId: string): Promise<Produto | undefined>;
}
