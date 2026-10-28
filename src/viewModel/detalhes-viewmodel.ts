import { useEffect, useState } from "react";
import { container } from "../di/container";
import { Produto } from "../model/entities/produto";
import { DomainError } from "../model/error";
import { IMenuUseCase } from "../useCase/iMenuUseCase";

/**
 * ViewModel da tela de Detalhes do Produto.
 * Utiliza o MenuUseCase para buscar as informações de um produto específico.
 */
export function useDetalhesViewModel(
  id?: string,
  menuUseCase: IMenuUseCase = container.getMenuUseCase(),
) {
  const [carregando, setCarregando] = useState(true);
  const [produto, setProduto] = useState<Produto | undefined>();
  const [quantidade, setQuantidade] = useState(1);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarProduto() {
      if (!id) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(null);

        const resultado = await menuUseCase.obterProdutoPorId(id);
        setProduto(resultado);
      } catch (e) {
        console.error("Erro ao buscar produto:", e);

        if (e instanceof DomainError) {
          setErro(e.message);
        } else {
          setErro("Não foi possível carregar os detalhes do produto.");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto();
  }, [id, menuUseCase]);

  function incrementarQuantidade() {
    setQuantidade((prev) => prev + 1);
  }

  function decrementarQuantidade() {
    setQuantidade((prev) => (prev > 1 ? prev - 1 : prev));
  }

  return {
    carregando,
    produto,
    quantidade,
    erro,
    incrementarQuantidade,
    decrementarQuantidade,
  };
}
