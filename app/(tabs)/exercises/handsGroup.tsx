import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";

export default function handsGroup() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [exerciseName, setExerciseName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [exercisesData, setExercisesData] = useState([
    "Підйом на біцепс",
    "Підйом на біцепс на лавці скота",
  ]);

  const handleAddExercise = () => {
    if (exerciseName.trim()) {
      setExercisesData((prev) => [...prev, exerciseName]);
      setExerciseName("");
      setModalIsOpen(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>HandsGroup</Text>

      <View style={styles.btnInputBlock}>
        <TextInput
          style={styles.input}
          placeholder="Search exercises..."
          value={search}
          onChangeText={setSearch}
        />
        <Button title={"Добавити вправу"} onPress={() => setModalIsOpen(true)}></Button>
      </View>

      <View style={styles.exercisesBlock}>
        {exercisesData.map((e) => (
          <Pressable style={styles.exercisesContainer}>
            <Text>{e}</Text>
          </Pressable>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Нова вправа</Text>
            <TextInput
              placeholder="Назва вправи"
              value={exerciseName}
              onChangeText={setExerciseName}
              style={styles.inputInsideModal}
            />

            <View style={styles.buttonsWrapper}>
              <Button
                title="Відмінити"
                color="red"
                onPress={() => setModalIsOpen(false)}
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
});
