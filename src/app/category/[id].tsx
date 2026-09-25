import { useLocalSearchParams, useRouter } from "expo-router";

import CategoryScreen from "../../view/category-screen";

export default function CategoryPage() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string}>();

  const categoriaId = Array.isArray(id)
    ? id[0]
    : id;

  return (
    <CategoryScreen
      id={categoriaId}
      onVoltar={() => router.back()}
      onProdutoPress={(produtoId) =>
        router.push(`/item/${produtoId}` as any)
      }
    />
  );
}