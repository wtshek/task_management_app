import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { initialData } from './intialData';
import { Column } from './Column';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

const ColumnContainer = styled(Box)`
  display: inline-flex;
  gap: 1rem;
`;

export const Kanban = () => {
  const [data, setData] = useState(initialData);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true);
    }
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData((prev) => ({
        ...prev,
        columnOrder: newColumnOrder
      }));

      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId];

    if (start === end) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn
        }
      }));

      return;
    }

    const newStartTaskIds = Array.from(start.taskIds);
    newStartTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: newStartTaskIds
    };

    const newEndTaskIds = Array.from(end.taskIds);
    newEndTaskIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      taskIds: newEndTaskIds
    };

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd
      }
    }));
  };

  if (!isBrowser) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="kanban-board"
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <ColumnContainer {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.map((col, index) => {
              return (
                <Column
                  key={col}
                  data={data.columns[col]}
                  taskMap={data.tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </ColumnContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Kanban;
