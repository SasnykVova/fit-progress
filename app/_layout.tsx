import { Slot, useRouter, useSegments } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isAuth === null) return; // Чекаємо поки auth перевіриться

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuth && !inAuthGroup) {
      router.replace("/login");
    } else if (isAuth && inAuthGroup) {
      router.replace("/");
    }
  }, [isAuth, segments]);

  if (isAuth === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
