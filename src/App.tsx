import styled from "styled-components";
import Board, { IAreaProps } from "./components/Board";
import CanIcon from "./assets/trash.svg";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
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

const TrashCan = styled.div<IAreaProps>`
  width: 75px;
  height: 75px;
  position: absolute;
  left: 50%;
  bottom: 150px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#b2bec3" : "#dfe6e9"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => (props.isDraggingOver ? 1.2 : 1)});
  transition: all 0.2s ease-in-out;

  img {
    width: 37.5px;
    height: 37.5px;
  }
`;

// 스타일드 컴포넌트 영역 끝

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (destination?.droppableId === "trash") {
      setToDos((allBoards) => {
        const copiedBoard = [...allBoards[source.droppableId]];
        copiedBoard.splice(source.index, 1);

        return {
          ...allBoards,
          [source.droppableId]: copiedBoard,
        };
      });
    } else if (destination?.droppableId === source.droppableId) {
      // 같은 보드에서의 이동
      setToDos((allBoards) => {
        const copiedBoard = [...allBoards[source.droppableId]];
        const taskObj = copiedBoard[source.index];
        copiedBoard.splice(source.index, 1);
        copiedBoard.splice(destination.index, 0, taskObj);
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
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination?.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
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
      <Droppable droppableId="trash">
        {(provided, snapshot) => (
          <TrashCan
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <img src={CanIcon} alt="휴지통 아이콘" />
            <div style={{ position: "absolute" }}>{provided.placeholder}</div>
          </TrashCan>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
