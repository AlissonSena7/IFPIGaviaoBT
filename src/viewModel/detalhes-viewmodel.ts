import { useEffect, useState } from "react";
import { buscarProdutoPorId } from "../model/produto-datasource";
import { Produto } from "../model/categoria";

export function useDetalhesViewModel(id?: string) {
  const [carregando, setCarregando] = useState(true);
  const [produto, setProduto] = useState<Produto | undefined>();
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    async function carregarProduto() {
      if (!id) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);

        const resultado = await buscarProdutoPorId(id);

        setProduto(resultado);
      } catch (erro) {
        console.error("Erro ao buscar produto:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto();
  }, [id]);

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
    incrementarQuantidade,
    decrementarQuantidade,
  };
}