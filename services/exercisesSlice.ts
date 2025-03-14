import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const initialState = {
  getExercises: {
    data: [],
    loading: false,
    success: false,
    error: "",
  },
  setExercises: {
    data: null,
    name: '',
    modalOpen: false,
    loading: false,
    success: false,
    error: "",
  },
};

export const setExercises = createAsyncThunk(
  "exercises/setExercises",
  async (
    {
      userId,
      name,
      groupId,
    }: { userId: string; name: string; groupId: string },
    thunkAPI
  ) => {
    try {
      const muscleGroupRef = doc(db, "muscleGroups", groupId);
      const exerciseRef = await addDoc(
        collection(db, "users", userId, "exercises"),
        {
          name,
          groupId: muscleGroupRef, 
        }
      );

      return { id: exerciseRef.id, name, groupId };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserExercises = createAsyncThunk(
  "exercises/fetchUserExercises",
  async (userId: string, { rejectWithValue }) => {
    try {
      const exercisesRef = collection(db, "users", userId, "exercises");
      const querySnapshot = await getDocs(exercisesRef);

      if (querySnapshot.empty) {
        return [];
      }

      // Отримуємо список вправ
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setGetExercises(state, action) {
      state.getExercises.data = action.payload;
    },
    setGetExercisesLoading(state, action) {
      state.getExercises.loading = action.payload;
    },
    setGetExercisesSuccess(state, action) {
      state.getExercises.success = action.payload;
    },
    setGetExercisesError(state, action) {
      state.getExercises.error = action.payload;
    },
    setExercisesName(state, action) {
        state.setExercises.name = action.payload
    },
    setModalOpen(state, action) {
        state.setExercises.modalOpen = action.payload
    },
    setExSuccessFalse(state) {
        state.setExercises.success = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserExercises.pending, (state) => {
        state.getExercises.loading = true;
        state.getExercises.success = false;
        state.getExercises.error = "";
      })
      .addCase(fetchUserExercises.fulfilled, (state, action: any) => {
        state.getExercises.loading = false;
        state.getExercises.success = true;
        state.getExercises.data = action.payload;
      })
      .addCase(fetchUserExercises.rejected, (state, action) => {
        state.getExercises.loading = false;
        state.getExercises.success = false;
        state.getExercises.error = action.payload as string;
      })
      .addCase(setExercises.pending, (state) => {
        state.setExercises.loading = true;
        state.setExercises.success = false;
        state.setExercises.error = "";
      })
      .addCase(setExercises.fulfilled, (state, action: any) => {
        state.setExercises.loading = false;
        state.setExercises.success = true;
        state.setExercises.modalOpen = false;
        state.setExercises.name = '';
      })
      .addCase(setExercises.rejected, (state, action) => {
        state.setExercises.loading = false;
        state.setExercises.success = false;
        state.setExercises.error = action.payload as string;
      });
  },
});

export const actions = exercisesSlice.actions;
export default exercisesSlice.reducer;
