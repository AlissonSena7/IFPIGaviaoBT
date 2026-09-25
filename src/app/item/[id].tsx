import { useLocalSearchParams, useRouter } from "expo-router";

import DetalhesScreen from "../../view/detalhes-screen";

export default function ItemDetailPage() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const produtoId = Array.isArray(id) ? id[0] : id;

  return (
    <DetalhesScreen
      id={produtoId}
      onVoltar={() => router.back()}
      onVoltarCardapio={() => router.back()}
    />
  );
}