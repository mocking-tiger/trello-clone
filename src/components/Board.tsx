import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { ITodo } from "../atoms";

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
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
`;

const Area = styled.div<IAreaProps>`
  padding: 20px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#b2bec3"
      : props.isDraggingFromThis
      ? "#dfe6e9"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
  }
`;

// 스타일드 컴포넌트 영역 끝

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    console.log(toDo);
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
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
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
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
