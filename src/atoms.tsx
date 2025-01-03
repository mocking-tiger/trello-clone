import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [
      { id: 1, text: "테스트1" },
      { id: 2, text: "테스트2" },
    ],
    Doing: [],
    Done: [],
  },
});
