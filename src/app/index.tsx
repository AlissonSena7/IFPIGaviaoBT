import { useRouter } from "expo-router";

import HomeScreen from "../view/home-screen";

export default function HomePage() {
  const router = useRouter();

  return (
    <HomeScreen
      onCategoriaPress={(categoriaId) =>
        router.push(`/category/${categoriaId}`)
      }
    />
  );
}