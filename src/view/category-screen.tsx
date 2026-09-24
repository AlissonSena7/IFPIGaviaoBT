import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useCategoriaViewModel } from "../viewModel/category-viewmodel";
import { formatarPreco } from "./util";

type CategoryScreenProps = {
  id?: string;
  onVoltar: () => void;
  onProdutoPress: (produtoId: string) => void;
};

export default function CategoryScreen({
  id,
  onVoltar,
  onProdutoPress,
}: CategoryScreenProps) {
  const {
    carregando,
    produtos,
    nomeCategoria,
  } = useCategoriaViewModel(id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.titulo}>
          {nomeCategoria}
        </Text>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onProdutoPress(item.id)}
              style={styles.produto}
            >
              <Image
                source={item.imagem}
                style={styles.imagem}
              />

              <View>
                <Text style={styles.nome}>
                  {item.nome}
                </Text>

                <Text style={styles.preco}>
                  {formatarPreco(item.preco)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
  },

  produto: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  imagem: {
    width: 80,
    height: 80,
    marginRight: 16,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },

  preco: {
    fontSize: 14,
    marginTop: 4,
  },
});