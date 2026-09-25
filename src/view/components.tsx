import React from "react";
import { View, Text, StyleSheet } from "react-native";

type CardProps = {
  titulo: string;
  subtitulo?: string;
};

export function Card({ titulo, subtitulo }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{titulo}</Text>

      {subtitulo && (
        <Text style={styles.subtitulo}>{subtitulo}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitulo: {
    marginTop: 4,
    fontSize: 14,
    color: "#666666",
  },
});