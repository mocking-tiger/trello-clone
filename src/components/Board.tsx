import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import DeleteIcon from "../assets/plus.svg";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

export interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis?: boolean;
}

const Wrapper = styled.div`
  width: 300px;
  min-height: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  user-select: none;
  position: relative;

  img {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 2px;
    right: 5%;
    transform: rotate(45deg);
    cursor: pointer;
  }
`;

const Area = styled.div<IAreaProps>`
  padding: 10px;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#b2bec3"
      : props.$isDraggingFromThis
      ? "#dfe6e9"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
    margin: 0 auto;
    padding: 10px 5px;
    border: 0px;
    border-radius: 6px;

    &:focus {
      outline: none;
    }
  }
`;

// 스타일드 컴포넌트 영역 끝

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

export interface IForm {
  toDo: string;
  boardName: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      const newToDos = {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
      localStorage.setItem("TODOS", JSON.stringify(newToDos));
      return newToDos;
    });
    setValue("toDo", "");
  };

  const deleteBoard = () => {
    setToDos((allBoards) => {
      const newToDos = {
        ...allBoards,
      };
      delete newToDos[boardId];
      localStorage.setItem("TODOS", JSON.stringify(newToDos));
      return newToDos;
    });
  };

  return (
    <Wrapper>
      <Title>
        {boardId}
        <img src={DeleteIcon} alt="보드 지우기 아이콘" onClick={deleteBoard} />
      </Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`${boardId}에 할 일 추가하기`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
