import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from "react-native-gesture-handler";
import { Button, StyleSheet, View } from "react-native";
import { auth } from "../../firebase/firebaseConfig";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { actions, getUserData, getUserDataAsyncStorage } from "../../services/authSlice";


export default function TabLayout() {


  const state = useAppSelector(state => state.auth.userLogin.data);
  const dispatch = useAppDispatch();
  const userId = auth.currentUser?.uid;


  const handleLogOut = async () => {
    try {
      await auth.signOut();
      alert('User signed out successfully');
    } catch (error) {
      alert(error);
    }

  }

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserDataAsyncStorage();
      dispatch(actions.setLoginUser(user))
      console.log("Авторизований користувач:", user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if(userId) {
      dispatch(getUserData(userId));
    }
  }, [])

  return (
    <>
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#ffd33d',
      headerStyle: {
        backgroundColor: '#25292e',
      },
      headerShadowVisible: false,
      headerTintColor: '#fff',
      tabBarStyle: {
      backgroundColor: '#25292e',
      },
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({color}) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
    {/* <View style={styles.nameContainer}>
      <Text style={styles.name}>
        {state?.name}
      </Text>
    </View> */}
    <Text style={styles.button}>
      <Button title="Вийти" onPress={handleLogOut}></Button>
    </Text>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 25,
    top: 50,
    color: 'white',
    fontWeight: '700'
  },
  nameContainer: {
    position: 'absolute',
    left: 20,
    top: 55,
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700'
  }
})

