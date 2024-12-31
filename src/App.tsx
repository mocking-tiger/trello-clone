import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(props) => (
            <ul ref={props.innerRef} {...props.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(props) => (
                  <li
                    ref={props.innerRef}
                    {...props.draggableProps}
                    {...props.dragHandleProps}
                  >
                    테스트1
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(props) => (
                  <li
                    ref={props.innerRef}
                    {...props.draggableProps}
                    {...props.dragHandleProps}
                  >
                    테스트2
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
