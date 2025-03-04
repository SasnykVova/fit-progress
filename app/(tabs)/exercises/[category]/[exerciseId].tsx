import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Button, Modal, TextInput } from "react-native";



export default function ExerciseScreen() {
  const { category, exerciseId } = useLocalSearchParams();

  const [weight, setWeight] = useState<string>();
  const [reps, setReps] = useState<string>();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [setsData, setSetsData] = useState([
    { id: '1', set: '1', weight: '10', reps: '14' },
    { id: '2', set: '2', weight: '10', reps: '12' },
  ]);

  const handleAddExercise = () => {
    const idAndSet = (setsData.length + 1).toString();
    setSetsData(prev => [...prev, {id: idAndSet, set: idAndSet, weight: weight ?? '0', reps: reps ?? '0'}]);
    setModalIsOpen(false);
    setReps('');
    setWeight('');
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Назва вправи</Text>
        <Text>Вправа ID: {exerciseId}</Text>
        <Button title="Добавити підхід" onPress={() => setModalIsOpen(true)}/>
      </View>

      <View style={styles.setsContainer}>
        {setsData.map(({ id, set, weight, reps }) => (
          <View style={styles.setWrapper} key={id}>
            <Text>
              Підхід <Text style={styles.text}>{set}</Text>
            </Text>
            <Text>Вага {weight}</Text>
            <Text>Повторень {reps}</Text>
          </View>
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
            <Text style={styles.modalTitle}>Вага</Text>
            <TextInput
              placeholder="Вага"
              keyboardType='numeric'
              value={weight}
              onChangeText={setWeight}
              style={styles.inputInsideModal}
            />
            <Text style={styles.modalTitle}>Кількість повторень</Text>
            <TextInput
              placeholder="Кількість повторень"
              keyboardType='numeric'
              value={reps}
              onChangeText={setReps}
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
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  setsContainer: {
    display: "flex",
    gap: 15,
    paddingHorizontal: 5,
  },
  setWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    fontWeight: "700",
  },
  text: {
    fontWeight: "400",
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputInsideModal: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
