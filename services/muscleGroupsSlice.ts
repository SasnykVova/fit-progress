import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface MuscleGroupsData {
    id: string
    name: string
}
interface MuscleGroupsByIdData {
    id: string
    data: {
        name: string
    }
}

interface State {
  getMuscleGroups: {
    data: MuscleGroupsData[];
    loading: boolean;
    success: boolean;
    error: boolean;
  },
  getMuscleGroupById: {
    data: {
        id: string,
        name: string
    },
    loading: boolean,
    success: boolean,
    error: boolean,
  }
}

const initialState: State = {
  getMuscleGroups: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getMuscleGroupById: {
    data: {
        id: '',
        name: '',
    },
    loading: false,
    success: false,
    error: false,
  }
};

const getMuscleGroups = async () => {
  const querySnapshot = await getDocs(collection(db, "muscleGroups"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getMuscleGroupById = async (id: string) => {
    const docRef = doc(db, "muscleGroups", id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
    } else {
      throw new Error("Група м'язів не знайдена");
    }
  };

  export const fetchMuscleGroupById = (id: string) => async (dispatch: any) => {
    try {
      dispatch(actions.setMuscleGroupByIdLoading(true));
      const group = await getMuscleGroupById(id);
      dispatch(actions.setMuscleGroupByIdSuccess(true));
      dispatch(actions.setMuscleGroupByIdLoading(false));
      dispatch(actions.setMuscleGroupById(group));
      console.log(group)
    } catch (error: any) {
      dispatch(actions.setMuscleGroupByIdLoading(false));
      dispatch(actions.setMuscleGroupsError(error.message));
    }
  };

export const fetchMuscleGroups = () => async (dispatch: any) => {
  try {
    dispatch(actions.setMuscleGroupsLoading(true));
    const groups = await getMuscleGroups();
    dispatch(actions.setMuscleGroupsSuccess(true));
    dispatch(actions.setMuscleGroupsLoading(false));
    dispatch(actions.setMuscleGroups(groups));
  } catch (error: any) {
    dispatch(actions.setMuscleGroupsLoading(false));
    dispatch(actions.setMuscleGroupsError(error.message));
  }
};

const muscleGroupsSlice = createSlice({
  name: "muscleGroups",
  initialState,
  reducers: {
    setMuscleGroups(state, action) {
      state.getMuscleGroups.data = action.payload;
    },
    setMuscleGroupsLoading(state, action) {
      state.getMuscleGroups.loading = action.payload;
    },
    setMuscleGroupsSuccess(state, action) {
      state.getMuscleGroups.success = action.payload;
    },
    setMuscleGroupsError(state, action) {
      state.getMuscleGroups.error = action.payload;
    },
    setMuscleGroupById(state, action) {
      state.getMuscleGroupById.data = action.payload;
    },
    setMuscleGroupByIdLoading(state, action) {
      state.getMuscleGroupById.loading = action.payload;
    },
    setMuscleGroupByIdSuccess(state, action) {
      state.getMuscleGroupById.success = action.payload;
    },
    setMuscleGroupByIdError(state, action) {
      state.getMuscleGroupById.error = action.payload;
    },
  },
});

export const actions = muscleGroupsSlice.actions;
export default muscleGroupsSlice.reducer;
