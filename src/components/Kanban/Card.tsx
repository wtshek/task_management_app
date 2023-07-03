import { Box, Divider, Typography, styled } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import Image from 'next/image';
import { Draggable } from 'react-beautiful-dnd';

const CardContainer = styled(Box)`
  max-width: 270px;
  width: 270px;
  background: #272a2f; // TODO: change to theme
  border-radius: 8px;
`;

const CardInnerContainer = styled(Box)`
  padding: 1.3rem 1rem;
`;

const CommentSection = styled(CardInnerContainer)`
  display: flex;
  gap: o.5rem;
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
`;

const CardTitle = styled(Typography)`
  color: white;
  margin: 1rem 0;
`;

const CardDescription = styled(Typography)`
  font-size: 0.875rem;
  opacity: 0.8;
`;

// TODO: remove
const blackImageURL =
  'https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg';

const IMAGE_WIDTH = 237;
const IMAGE_HEIGHT = 100;

export const Card = ({ data, index }) => {
  const { title, description, comments, thumbnail, id } = data || {};
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <CardContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <CardInnerContainer>
            <StyledImage
              src={blackImageURL}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
            />
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardInnerContainer>
          <Divider />
          <CommentSection>
            <CommentIcon />
            <Typography>1 comments</Typography>
          </CommentSection>
        </CardContainer>
      )}
    </Draggable>
  );
};
