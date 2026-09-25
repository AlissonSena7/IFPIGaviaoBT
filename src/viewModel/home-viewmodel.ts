import { useEffect, useState } from "react";

import { buscarCategorias } from "../model/categoria-datasource";
import { Categoria } from "../model/categoria";

export function useHomeViewModel() {
  const [carregando, setCarregando] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);

        const resultado = await buscarCategorias();

        setCategorias(resultado);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  return {
    carregando,
    categorias,
  };
}