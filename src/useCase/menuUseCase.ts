import { ICategoryDataSource } from "../model/datasources/iCategoryDataSource";
import { IProductDataSource } from "../model/datasources/iProductDataSource";
import { Categoria } from "../model/entities/categoria";
import { Produto } from "../model/entities/produto";
import { ValidationError } from "../model/error";
import { IMenuUseCase } from "./iMenuUseCase";

export class MenuUseCase implements IMenuUseCase {
  constructor(
    private categoryDataSource: ICategoryDataSource,
    private productDataSource: IProductDataSource,
  ) {}

  async obterCategorias(): Promise<Categoria[]> {
    return await this.categoryDataSource.buscarCategorias();
  }

  async obterProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    if (!categoriaId) {
      throw new ValidationError("O ID da categoria é obrigatório.");
    }
    return await this.productDataSource.buscarProdutosPorCategoria(categoriaId);
  }

  async obterProdutoPorId(produtoId: string): Promise<Produto | undefined> {
    if (!produtoId) {
      throw new ValidationError("O ID do produto é obrigatório.");
    }
    return await this.productDataSource.buscarProdutoPorId(produtoId);
  }
}
