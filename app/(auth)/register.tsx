import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { actions, setUserRegister } from "../../services/authSlice";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "expo-router";

export default function register() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth.userRegister);
  const router = useRouter();

  const { email, password, name } = state;
  const {
    setRegisterEmail,
    setRegisterPassword,
    setRegisterUser,
    setUserRegisterError,
    setUserRegisterLoading,
    setUserRegisterSuccess,
    setRegisterName,
  } = actions;

  // const [ name, setName ] = useState<string>('');
  // const [ email, setEmail ] = useState<string>('');
  // const [ password, setPassword ] = useState<string>('');

  const handleLogIn = () => {
    dispatch(setUserRegister(email, password, name))
  };

  return (
    <View style={styles.logIn}>
      <View style={styles.container}>

        <Text style={styles.title}>Реєстрація</Text>

        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Повернутись на сторінку</Text>
          <TouchableOpacity onPress={() => router.push("login")}>
            <Text style={styles.link}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          {/* <TextInput style={styles.input} placeholder='Name' keyboardType='default' value={name} onChangeText={setName}/> */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            keyboardType="default"
            value={name}
            onChangeText={(text) => dispatch(setRegisterName(text))}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => dispatch(setRegisterEmail(text))}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            keyboardType="default"
            value={password}
            onChangeText={(text) => dispatch(setRegisterPassword(text))}
            secureTextEntry={true}
          />
        </View>

        <Button title="Зараєструватись" onPress={handleLogIn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    logIn: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        paddingBottom: 25
    },
    subTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    },
    subTitle: {
        marginBottom: 25,
    },
    link: {
        textDecorationLine: 'underline'
    },
    inputContainer: {
        display: 'flex',
        gap: 25,
        marginBottom: 25
    },
    input: {
        width: 250,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5
    },
    button: {}
})
