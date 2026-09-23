import { useEffect, useState } from "react";

import { buscarProdutosPorCategoria } from "../model/categoria-datasource";

import { Produto } from "../model/categoria";

export function useCategoriaViewModel(id?: string) {
  const [carregando, setCarregando] = useState(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function carregarProdutos() {
      if (!id) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);

        const resultado =
          await buscarProdutosPorCategoria(id);

        setProdutos(resultado);
      } catch (erro) {
        console.error(
          "Erro ao buscar produtos da categoria:",
          erro
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, [id]);

  const nomeCategoria =
    id === "bebidas"
      ? "Bebidas"
      : id === "comidas"
        ? "Comidas"
        : "Cardápio";

  return {
    carregando,
    produtos,
    nomeCategoria,
  };
}