import { Box, Typography, styled } from '@mui/material';
import { Card } from './Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FC, memo } from 'react';

const Header = styled(Box)`
  margin-bottom: 1rem;
`;

const Title = styled(Box)`
  font-size: 0.75rem;
  background-color: #272a2f; //TODO: change to theme
  color: white;
  padding: 0.8rem 0.75rem;
  display: inline-block;
`;

const CardsContainer = styled(Box)`
  display: inline-flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  min-height: 100px;
`;

const cardListAreEqual = (prevProps, nextProps) => {
  return prevProps.tasks === nextProps.tasks;
};

const CardList: FC<{ tasks: any[] }> = memo(({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Card data={task} key={task.id} index={index} />
      ))}
    </>
  );
}, cardListAreEqual);

const columnAreEqual = (prevProps, nextProps) => {
  return prevProps.taskMap === nextProps.taskMap;
};

export const Column: FC<{ data: any; taskMap: any; index: number }> = memo(
  ({ data, taskMap, index }) => {
    const { title, taskIds } = data;
    const tasks = taskIds.map((id) => taskMap[id]);

    return (
      <Draggable draggableId={data.id} index={index}>
        {(provided) => (
          <Box {...provided.draggableProps} ref={provided.innerRef}>
            <Header {...provided.dragHandleProps}>
              <Title>{title}</Title>
            </Header>
            <Droppable droppableId={data.id} type="task">
              {(provided) => (
                <CardsContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {<CardList tasks={tasks} />}
                  {provided.placeholder}
                </CardsContainer>
              )}
            </Droppable>
          </Box>
        )}
      </Draggable>
    );
  },
  columnAreEqual
);
