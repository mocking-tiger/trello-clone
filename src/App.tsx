import styled from "styled-components";
import Board, { IAreaProps, IForm } from "./components/Board";
import CanIcon from "./assets/trash.svg";
import AddIcon from "./assets/plus.svg";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
  right: 5%;
  bottom: 10%;
  background-color: ${(props) =>
    props.$isDraggingOver ? "#b2bec3" : "#dfe6e9"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => (props.$isDraggingOver ? 1.2 : 1)});
  transition: all 0.2s ease-in-out;

  img {
    width: 37.5px;
    height: 37.5px;
  }
`;

const AddBoardButton = styled.div`
  width: 75px;
  height: 75px;
  position: absolute;
  left: 5%;
  bottom: 10%;
  background-color: #dfe6e9;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  img {
    width: 37.5px;
    height: 37.5px;
  }
`;

const NewBoardModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 480px;
    padding: 30px;
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 6px;

    h2 {
      text-align: center;
      margin-bottom: 10px;
      font-size: 20px;
      color: white;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 0;
      border-radius: 6px;

      &:focus {
        outline: none;
      }
    }
  }
`;

// 스타일드 컴포넌트 영역 끝

function App() {
  const { register, setValue, handleSubmit, setFocus } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isModalOn, setIsModalOn] = useState(false);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (destination?.droppableId === "trash") {
      setToDos((allBoards) => {
        const copiedBoard = [...allBoards[source.droppableId]];
        copiedBoard.splice(source.index, 1);
        const newToDos = {
          ...allBoards,
          [source.droppableId]: copiedBoard,
        };
        localStorage.setItem("TODOS", JSON.stringify(newToDos));

        return newToDos;
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

  const createBoard = ({ boardName }: IForm) => {
    setValue("boardName", "");
    setToDos((allBoards) => {
      const newBoard = {
        ...allBoards,
        [boardName]: [],
      };
      localStorage.setItem("TODOS", JSON.stringify(newBoard));
      return newBoard;
    });
    handleModal();
  };

  const handleModal = () => {
    if (isModalOn) {
      setIsModalOn(false);
    } else {
      setIsModalOn(true);
      setTimeout(() => {
        setFocus("boardName");
      }, 0);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddBoardButton onClick={handleModal}>
        <img src={AddIcon} alt="보드 추가 아이콘" />
      </AddBoardButton>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
      {Object.keys(toDos).length > 0 && (
        <Droppable droppableId="trash">
          {(provided, snapshot) => (
            <TrashCan
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isDraggingOver={snapshot.isDraggingOver}
            >
              <img src={CanIcon} alt="휴지통 아이콘" />
              <div style={{ position: "absolute" }}>{provided.placeholder}</div>
            </TrashCan>
          )}
        </Droppable>
      )}
      {isModalOn && (
        <NewBoardModal onClick={handleModal}>
          <div>
            <h2>새 보드 추가하기</h2>
            <form onSubmit={handleSubmit(createBoard)}>
              <input
                {...register("boardName", { required: true })}
                type="text"
                placeholder="이름 입력해줘"
              />
            </form>
          </div>
        </NewBoardModal>
      )}
    </DragDropContext>
  );
}

export default App;
