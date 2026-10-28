import { CategoriaDataSource } from "../infra/datasources/categoria-datasource";
import { ProdutoDataSource } from "../infra/datasources/produto-datasource";
import { ICategoryDataSource } from "../model/datasources/iCategoryDataSource";
import { IProductDataSource } from "../model/datasources/iProductDataSource";
import { IMenuUseCase } from "../useCase/iMenuUseCase";
import { MenuUseCase } from "../useCase/menuUseCase";

/**
 * Service Locator simplificado para Injeção de Dependências.
 * Centraliza a criação das instâncias das camadas de Infra e Domain.
 */
class Container {
  private static instance: Container;

  private categoryDataSource: ICategoryDataSource;
  private productDataSource: IProductDataSource;
  private menuUseCase: IMenuUseCase;

  private constructor() {
    // Inicializa as implementações concretas (Infra)
    this.categoryDataSource = new CategoriaDataSource();
    this.productDataSource = new ProdutoDataSource();

    // Inicializa o UseCase (Domínio) injetando as dependências
    this.menuUseCase = new MenuUseCase(
      this.categoryDataSource,
      this.productDataSource,
    );
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  /**
   * Provê a instância do MenuUseCase.
   */
  public getMenuUseCase(): IMenuUseCase {
    return this.menuUseCase;
  }
}

export const container = Container.getInstance();
