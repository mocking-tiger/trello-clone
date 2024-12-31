import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(props) => (
            <Board ref={props.innerRef} {...props.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(props) => (
                  <Card
                    ref={props.innerRef}
                    {...props.dragHandleProps}
                    {...props.draggableProps}
                  >
                    테스트1
                  </Card>
                )}
              </Draggable>
            </Board>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
