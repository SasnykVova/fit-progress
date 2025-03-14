import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { fetchMuscleGroups } from "../../../services/muscleGroupsSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";



export default function Exercises() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {data, loading, success, error} = useAppSelector(state => state.muscleGroup.getMuscleGroups);


  useEffect(() => {
    dispatch(fetchMuscleGroups())
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.muscleGroupsWrapper}>
        {data?.map((g) => (
          <Pressable
            key={g.id}
            onPress={() => router.push(`/exercises/${g.id}`)}
            style={styles.muscleGroupWrapper}
          >
            <Text style={styles.muscleGroupText}>{g.name}</Text>
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
