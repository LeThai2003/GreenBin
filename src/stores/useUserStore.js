// stores/useUserStore.js
import { create } from "zustand";
import { fakeUser } from "../data/fakeUser";

export const useUserStore = create((set) => ({
  user: fakeUser,

  addGreenPoint: (point) =>
    set((state) => ({
      user: {
        ...state.user,
        greenPoints: state.user.greenPoints + point,
      },
    })),

  minusTrainingPoint: (point) =>
    set((state) => ({
      user: {
        ...state.user,
        trainingPoints: state.user.trainingPoints - point,
      },
    })),
}));
