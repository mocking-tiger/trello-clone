import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["테스트1", "테스트2"],
    Doing: ["테스트3", "테스트4", "테스트5"],
    Done: ["테스트6"],
  },
});
