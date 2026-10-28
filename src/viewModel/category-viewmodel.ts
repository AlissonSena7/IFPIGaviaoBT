import { useEffect, useState } from "react";
import { container } from "../di/container";
import { Produto } from "../model/entities/produto";
import { DomainError } from "../model/error";
import { IMenuUseCase } from "../useCase/iMenuUseCase";

/**
 * ViewModel da tela de Categoria.
 * Utiliza o MenuUseCase para buscar os produtos de uma categoria específica.
 */
export function useCategoriaViewModel(
  id?: string,
  menuUseCase: IMenuUseCase = container.getMenuUseCase(),
) {
  const [carregando, setCarregando] = useState(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarProdutos() {
      if (!id) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(null);

        const resultado = await menuUseCase.obterProdutosPorCategoria(id);
        setProdutos(resultado);
      } catch (e) {
        console.error("Erro ao buscar produtos da categoria:", e);

        if (e instanceof DomainError) {
          setErro(e.message);
        } else {
          setErro("Não foi possível carregar os produtos.");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, [id, menuUseCase]);

  const nomeCategoria =
    id === "bebidas" ? "Bebidas" : id === "comidas" ? "Comidas" : "Cardápio";

  return {
    carregando,
    produtos,
    nomeCategoria,
    erro,
  };
}
