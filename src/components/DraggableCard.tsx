import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Card = styled.div`
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  user-select: none;
`;

// 스타일드 컴포넌트 영역 끝

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  console.log(toDo, " is rendered");
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {/* beautiful-dnd의 Draggable의 key와 draggableId의 값은 같아야함*/}
      {(props) => (
        <Card
          ref={props.innerRef}
          {...props.dragHandleProps}
          {...props.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
