import styled from "styled-components";
import Board from "./components/Board";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

// 스타일드 컴포넌트 영역 끝

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (destination?.droppableId === source.droppableId) {
      // 같은 보드에서의 이동
      setToDos((allBoards) => {
        const copiedBoard = [...allBoards[source.droppableId]];
        copiedBoard.splice(source.index, 1);
        copiedBoard.splice(destination.index, 0, draggableId);
        // 배열.splice(타겟index, 삭제할 개수, 추가할 요소(옵션))
        return {
          ...allBoards,
          [source.droppableId]: copiedBoard,
        };
      });
    } else {
      // 보드간 이동
      setToDos((allBoards) => {
        if (!destination) return { ...allBoards };
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination?.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
