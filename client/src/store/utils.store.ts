import { create } from "zustand";

interface State {
  code: string | null;
  name: string | null;
  setCode: (getCode: string | null) => void;
  setName: (getName: string | null) => void;
}
const store = (set: any) => ({
  code: null,
  name: null,
  setCode: (getCode: string | null) => {
    set({ code: getCode });
  },
  setName: (getName: string | null) => {
    console.log(getName);
    set({ name: getName });
  },
});

export const utilStore = create<State>(store);
