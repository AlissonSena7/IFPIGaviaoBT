/**
 * Classe base para todos os erros de domínio da aplicação.
 */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

/**
 * Erro lançado quando ocorre uma falha na validação de dados.
 */
export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Erro lançado quando ocorre uma falha no acesso ou obtenção de dados (Infra/Data).
 */
export class DataSourceError extends DomainError {
  constructor(
    message: string,
    public readonly originalError?: any,
  ) {
    super(message);
    this.name = "DataSourceError";
    Object.setPrototypeOf(this, DataSourceError.prototype);
  }
}
