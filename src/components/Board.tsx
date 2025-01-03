import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Wrapper = styled.div`
  width: 300px;
  min-height: 300px;
  padding: 20px 10px;
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
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

// 스타일드 컴포넌트 영역 끝

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
