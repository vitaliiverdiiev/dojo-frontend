import { create } from "zustand";

type CounterType = {
  count: number;
  inc: () => void;
  dec: () => void;
};

export const useCounterStore = create<CounterType>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));
