# 🦅 Refatoração para MVVM Sofisticado - IFPI Gavião

Este documento detalha a refatoração completa da aplicação **IFPI Gavião**, migrando do padrão inicial "Big Tripe" para uma arquitetura **MVVM Sofisticada**.

## 🎯 1. Objetivo da Refatoração
O objetivo principal foi desacoplar as camadas da aplicação, aplicando princípios de **Clean Architecture** e **SOLID**.
- **Problemas Corrigidos:**
  - Acoplamento direto das Views com a infraestrutura de dados.
  - Lógica de negócio dispersa nos componentes de interface.
  - Ausência de contratos (interfaces) para fontes de dados e serviços.
  - Dificuldade de testabilidade devido a dependências rígidas.
  - Falta de um tratamento de erro padronizado em nível de domínio.

## 🚀 2. Resumo das Alterações
A refatoração introduziu uma separação clara entre **Domínio (Model/UseCases)**, **Infraestrutura (Data)** e **Apresentação (ViewModel/View)**.
- **Inversão de Dependência:** As camadas de alto nível agora dependem de abstrações (interfaces).
- **Injeção de Dependência:** Implementação de um Service Locator (Container) para gerenciar o ciclo de vida e a provisão das dependências.
- **Erros de Domínio:** Criação de uma hierarquia de erros tipados para melhor feedback técnico e ao usuário.

## 📂 3. Arquivos Criados
| Arquivo | Responsabilidade |
| :--- | :--- |
| [container.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/di/container.ts) | Gerenciamento centralizado de dependências (DI). |
| [categoria-datasource.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/infra/datasources/categoria-datasource.ts) | Implementação concreta da fonte de dados de categorias. |
| [produto-datasource.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/infra/datasources/produto-datasource.ts) | Implementação concreta da fonte de dados de produtos. |
| [iCategoryDataSource.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/model/datasources/iCategoryDataSource.ts) | Contrato para fontes de dados de categorias. |
| [iProductDataSource.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/model/datasources/iProductDataSource.ts) | Contrato para fontes de dados de produtos. |
| [categoria.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/model/entities/categoria.ts) | Entidade de domínio Categoria. |
| [produto.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/model/entities/produto.ts) | Entidade de domínio Produto. |
| [error.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/model/error.ts) | Definição de erros tipados (`DomainError`, `ValidationError`, `DataSourceError`). |
| [iMenuUseCase.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/useCase/iMenuUseCase.ts) | Contrato para o caso de uso principal do menu. |
| [menuUseCase.ts](file:///c%3A/Users/usuario/OneDrive/IFPI/Mod_IV/IFPIGaviaoBT/src/useCase/menuUseCase.ts) | Implementação da lógica de negócio e orquestração de dados. |

## 🛠️ 4. Arquivos Modificados
- **ViewModels:** `home-viewmodel.ts`, `category-viewmodel.ts`, `detalhes-viewmodel.ts`
  - Refatorados para utilizar `IMenuUseCase` injetado via `container`.
  - Adicionado suporte a tratamento de erros tipados.
- **Views:** `home-screen.tsx`, `category-screen.tsx`, `detalhes-screen.tsx`
  - Adicionados estados visuais de erro com feedback ao usuário.
  - Removido qualquer import direto de infraestrutura.
- **Configuração:** `package.json` e `package-lock.json`
  - Pequenos ajustes de ambiente/IDE.

## 🗑️ 5. Arquivos Removidos
- `src/model/categoria.ts` (Substituído por `src/model/entities/categoria.ts`)
- `src/model/categoria-datasource.ts` (Movido para `src/infra/datasources/`)
- `src/model/produto-datasource.ts` (Movido para `src/infra/datasources/`)
- *Motivo:* Organização das camadas seguindo os padrões de Clean Architecture.

## 🏗️ 6. Arquitetura Final
```text
View (React Native) -> ViewModel (Hooks) -> UseCase (Domain) -> DataSource (Infra)
                                 |              ^                   ^
                                 |              |                   |
                                 +--------------+-------------------+
                                                |
                                          Container (DI)
```
- **Model:** Entidades puras e erros de domínio.
- **Infraestrutura:** Implementações que tocam o `mockDatabase.ts`.
- **Domain (UseCase):** Lógica que orquestra os DataSources.
- **DI:** desacopla a criação das instâncias do seu uso.

## ✅ 7. Validação
- **Compilação:** `npx tsc --noEmit` aprovado (0 erros).
- **Linting:** `npm run lint` aprovado.
- **Funcionalidades:** 
  - Simulação de banco de dados com delay (600ms) preservada.
  - Navegação via Expo Router preservada.
  - Exibição de dados e estados de carregamento validados.

## 📝 8. Sugestão de Commit
`feat: refactor architecture to sophisticated MVVM with DI and domain errors`

## 🔗 9. Descrição do Pull Request (GitHub)
### **Objetivo**
Refatorar a aplicação IFPI Gavião para o padrão **MVVM Sofisticado**, eliminando o acoplamento do padrão "Big Tripe" e preparando a base para escalabilidade e testes.

### **Principais Mudanças**
- Implementação de **Injeção de Dependência** via `Container` singleton.
- Separação de **Entidades** e **Contratos** na camada de Domínio.
- Criação de **UseCases** para isolar regras de negócio.
- Padronização de **Erros de Domínio** (`DomainError`, `DataSourceError`, `ValidationError`).
- Atualização das **Views** para lidar com estados de erro tipados.

### **Validações Realizadas**
- [x] Verificação de tipos com TypeScript (`tsc`).
- [x] Linting da aplicação.
- [x] Auditoria manual da árvore de dependências.
- [x] Teste de fluxo de navegação e carregamento assíncrono.
