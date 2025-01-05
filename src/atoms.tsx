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
  default: JSON.parse(localStorage.getItem("TODOS") ?? "{}"),
});

// 해야할것
// 1. 투두 삭제 기능(드래그로 삭제) V
// 2. 각 태스크 로컬스토리지에 저장 V
// 3. 새 보드 생성 기능 V
// 4. 보드들의 순서를 바꾸는 기능
// 5. 보드 삭제(드래그로)
