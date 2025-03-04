import { Stack } from "expo-router";

export default function ExercisesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Exercises",
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="index" options={{ title: "Групи м'язів" }} />
      <Stack.Screen name="[category]" options={{ title: "Вправи по групі" }} />
      <Stack.Screen name="[category]/[exerciseId]" options={{ title: "Деталі вправи" }} />
    </Stack>
  );
}