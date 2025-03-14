import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
  userRegister: {
    email: "",
    password: "",
    name: "",
    data: null,
    loading: false,
    success: false,
    error: false,
  },
  userLogin: {
    email: "",
    password: "",
    name: "",
    userId: '',
    data: [
    ],
    loading: false,
    success: false,
    error: false,
  },
};

export const getUserDataAsyncStorage = async () => {
  try {
    const jsonUser = await AsyncStorage.getItem('user');
    return jsonUser ? JSON.parse(jsonUser) : null;
  } catch (error) {
    console.error("Помилка отримання користувача:", error);
  }
};


export const getUserData = (userId: string) =>  async () => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return console.log(userData)
    } else {
      console.log("Користувач не знайдений!");
      return null;
    }
  } catch(error) {
    console.error("Помилка отримання даних користувача:", error);
  }
}


export const setUserRegister =
  (email: string, password: string, name: string) => async (dispatch: any) => {
    try {
      dispatch(actions.setUserLoginLoading(true));

      // Реєстрація користувача
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Створюємо документ користувача в "users/{userId}"
      await setDoc(doc(db, "users", userId), {
        name: name,
        email: email,
      });

      console.log("Користувача створено та структура ініціалізована!");

      // **Додаємо першу вправу в "users/{userId}/exercises"**
      await addDoc(collection(db, "users", userId, "exercises"), {
        name: "Підйом на біцепс зі штангою",
        groupId: doc(db, "muscleGroups", "1"), // **Посилання на muscleGroups/1**
      });

      dispatch(actions.setUserId(userId));
      dispatch(actions.setUserLoginLoading(false));
      dispatch(actions.setUserLoginSuccess(true));
      dispatch(actions.setLoginUser(userCredential));

      dispatch(actions.setLoginEmail(""));
      dispatch(actions.setLoginPassword(""));
    } catch (error) {
      console.error("Помилка реєстрації:", error);
      dispatch(actions.setUserLoginSuccess(false));
      dispatch(actions.setUserLoginError(error));
    }
  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterEmail(state, action) {
      state.userRegister.email = action.payload;
    },
    setRegisterPassword(state, action) {
      state.userRegister.password = action.payload;
    },
    setRegisterName(state, action) {
      state.userRegister.name = action.payload;
    },
    setRegisterUser(state, action) {
      state.userRegister.data = action.payload;
    },
    setUserRegisterLoading(state, action) {
      state.userRegister.loading = action.payload;
    },
    setUserRegisterSuccess(state, action) {
      state.userRegister.success = action.payload;
    },
    setUserRegisterError(state, action) {
      state.userRegister.error = action.payload;
    },
    setLoginEmail(state, action) {
      state.userLogin.email = action.payload;
    },
    setLoginPassword(state, action) {
      state.userLogin.password = action.payload;
    },
    setLoginName(state, action) {
      state.userLogin.name = action.payload;
    },
    setLoginUser(state, action) {
      state.userLogin.data = action.payload;
    },
    setUserLoginLoading(state, action) {
      state.userLogin.loading = action.payload;
    },
    setUserLoginSuccess(state, action) {
      state.userLogin.success = action.payload;
    },
    setUserLoginError(state, action) {
      state.userLogin.error = action.payload;
    },
    setUserId(state, action) {
      state.userLogin.userId = action.payload
    }
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;
