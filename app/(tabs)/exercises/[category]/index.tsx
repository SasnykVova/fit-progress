import { useLocalSearchParams } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Pressable,
    Modal,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { fetchMuscleGroupById } from '../../../../services/muscleGroupsSlice';
import { actions, fetchUserExercises, setExercises } from '../../../../services/exercisesSlice';
import { auth } from '../../../../firebase/firebaseConfig';
  
  export default function handsGroup() {

    const { category } = useLocalSearchParams();

    const router = useRouter();
    const dispatch = useAppDispatch();
    const {data, loading, success, error} = useAppSelector(state => state.muscleGroup.getMuscleGroupById);
    const userId = auth.currentUser?.uid;

    const { data: exercisesData, loading: exLoading} = useAppSelector(state => state.exercises.getExercises);
    const { name, modalOpen, success: addExSuccess } = useAppSelector(state => state.exercises.setExercises);
    
    const exercisesDataSort = exercisesData.filter(e => e?.groupId?.id === category);
  
 
      useEffect(() => {
        dispatch(fetchMuscleGroupById(category))
      }, [])
      useEffect(() => {
        dispatch(fetchUserExercises(userId))
      }, [])

      useEffect(() => {
        if(addExSuccess) {
          dispatch(fetchUserExercises(userId))
          dispatch(actions.setExSuccessFalse())
        }
      }, [addExSuccess])


    const [search, setSearch] = useState<string>("");

  
    const handleAddExercise = () => {
      const data = {userId: userId,name: name,groupId: category}
      dispatch(setExercises(data));
    };

    if(loading) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.h2}>{data.name}</Text>
  
        <View style={styles.btnInputBlock}>
          <TextInput
            style={styles.input}
            placeholder="Search exercises..."
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <Button title={"Добавити вправу"} onPress={() => dispatch(actions.setModalOpen(true))}></Button>
        </View>
  
        <View style={styles.exercisesBlock}>
          {exLoading ? <ActivityIndicator size="large" />
          :
          exercisesDataSort?.map((e) => (
            <Pressable key={e.id} style={styles.exercisesContainer} onPress={() => router.push(`/exercises/${category}/${e.id}`)}>
              <Text>{e.name}</Text>
            </Pressable>
          ))}
        </View>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => dispatch(actions.setModalOpen(false))}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Нова вправа</Text>
              <TextInput
                placeholder="Назва вправи"
                value={name}
                onChangeText={(text) => dispatch(actions.setExercisesName(text))}
                style={styles.inputInsideModal}
              />
  
              <View style={styles.buttonsWrapper}>
                <Button
                  title="Відмінити"
                  color="red"
                  onPress={() => dispatch(actions.setModalOpen(false))}
                />
                <Button title="Додати" onPress={handleAddExercise} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    h2: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 30,
    },
    btnInputBlock: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: "5px",
    },
    input: {
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    exercisesBlock: {
      paddingVertical: 25,
    },
    exercisesContainer: {
      height: 50,
      borderColor: "#000",
      borderWidth: 1,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      paddingLeft: 15,
      marginVertical: 5,
    },
    modalWrapper: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    inputInsideModal: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    indicatorContainer: {
      flex: 1,
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  