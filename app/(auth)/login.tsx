import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { actions } from "../../services/authSlice";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "expo-router";

export default function login() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth.userLogin);
  const router = useRouter();

  const { email, password } = state;
  const {
    setLoginEmail,
    setLoginPassword,
    setLoginUser,
    setUserLoginError,
    setUserLoginLoading,
    setUserLoginSuccess,
    setRegisterName,
    setUserId,
  } = actions;

  // const [ name, setName ] = useState<string>('');
  // const [ email, setEmail ] = useState<string>('');
  // const [ password, setPassword ] = useState<string>('');

  const handleLogIn = () => {
    dispatch(setUserLoginLoading(true));
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setUserLoginLoading(false));
        dispatch(setUserLoginSuccess(true));
        const user = userCredential.user;
        dispatch(setUserId(user.uid));
        dispatch(setLoginUser(user));
        dispatch(setLoginEmail(""));
        dispatch(setLoginPassword(""));
      })
      .catch((error) => {
        dispatch(setUserLoginSuccess(false));
        dispatch(setUserLoginError(error.message));
      });
  };

  return (
    <View style={styles.logIn}>
      <View style={styles.container}>
        <Text style={styles.title}>Вхід</Text>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Немає акаунту ?</Text>
          <TouchableOpacity onPress={() => router.push("register")}>
            <Text style={styles.link}>Зараєстуватись</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          {/* <TextInput style={styles.input} placeholder='Name' keyboardType='default' value={name} onChangeText={setName}/> */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => dispatch(setLoginEmail(text))}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            keyboardType="default"
            value={password}
            onChangeText={(text) => dispatch(setLoginPassword(text))}
            secureTextEntry={true}
          />
        </View>

        <Button title="Увійти" onPress={handleLogIn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logIn: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    paddingBottom: 25,
  },
  subTitleContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  subTitle: {
    marginBottom: 25,
  },
  link: {
    textDecorationLine: "underline",
  },
  inputContainer: {
    display: "flex",
    gap: 25,
    marginBottom: 25,
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  button: {},
});
