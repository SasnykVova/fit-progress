import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export const groupData = [
  { id: 1, name: "Руки"},
  { id: 2, name: "Ноги"},
  { id: 3, name: "Тіло (передня частина)"},
  { id: 4, name: "Тіло (задня частина)"},
  { id: 5, name: "Кардіо"},
  { id: 6, name: "Інші"},
];

export default function Exercises() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.muscleGroupsWrapper}>
        {groupData.map(({ id, name }) => (
          <Pressable
            key={id}
            onPress={() => router.push(`/exercises/${id}`)}
            style={styles.muscleGroupWrapper}
          >
            <Text style={styles.muscleGroupText}>{name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  muscleGroupsWrapper: {
    flex: 1,
  },
  muscleGroupWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    marginVertical: 5,
    borderRadius: 10,
  },
  muscleGroupText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textDecorationLine: "none",
  },
});
