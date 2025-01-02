import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Wrapper = styled.div`
  width: 300px;
  min-height: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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
        {(props) => (
          <div ref={props.innerRef} {...props.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {props.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}
