import { useEffect, useState } from "react";
import { container } from "../di/container";
import { Categoria } from "../model/entities/categoria";
import { DomainError } from "../model/error";
import { IMenuUseCase } from "../useCase/iMenuUseCase";

/**
 * ViewModel da tela Home.
 * Utiliza o MenuUseCase para buscar as categorias do cardápio.
 */
export function useHomeViewModel(
  menuUseCase: IMenuUseCase = container.getMenuUseCase(),
) {
  const [carregando, setCarregando] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro(null);

        const resultado = await menuUseCase.obterCategorias();
        setCategorias(resultado);
      } catch (e) {
        console.error("Erro ao carregar categorias:", e);

        if (e instanceof DomainError) {
          setErro(e.message);
        } else {
          setErro("Não foi possível carregar as categorias.");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [menuUseCase]);

  return {
    carregando,
    categorias,
    erro,
  };
}
