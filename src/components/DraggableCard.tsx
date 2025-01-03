import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Card = styled.div<{ isDragging: boolean }>`
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  border-radius: 5px;
  user-select: none;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : ""};
`;

// 스타일드 컴포넌트 영역 끝

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    <Draggable key={toDoId} draggableId={String(toDoId)} index={index}>
      {/* beautiful-dnd의 Draggable의 key와 draggableId의 값은 같아야함*/}
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
