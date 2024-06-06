import { create } from "zustand";

interface State {
  code: string | null;
  name: string | null;
  openAddUser: boolean;
  openTimeInForm: boolean;
  setCode: (getCode: string | null) => void;
  setName: (getName: string | null) => void;
  setOpenAddUser: (openAddUser: boolean) => void;
  setOpenTimeInForm: (openTimeInForm: boolean) => void;
}
const store = (set: any) => ({
  code: null,
  name: null,
  openAddUser: false,
  openTimeInForm: false,
  setCode: (getCode: string | null) => {
    set({ code: getCode });
  },
  setName: (getName: string | null) => {
    console.log(getName);
    set({ name: getName });
  },
  setOpenAddUser: (openAddUser: boolean) => {
    set({ openAddUser });
  },
  setOpenTimeInForm: (openTimeInForm: boolean) => {
    set({ openTimeInForm });
  },
});

export const utilStore = create<State>(store);
