export type KanbanTaskType = {
  _id: string;
  title: string;
  abstract: string;
  description: string;
  thumbnail: string;
  index: string;
};

export type KanbanColumnType = {
  _id: string;
  title: string;
  numberOfItems: number;
  titleBackgroundColor: string;
  tasks: KanbanTaskType[];
};

export type KanbanDataType = {
  _id: string;
  title: string;
  description: string;
  columns: {
    [key: string]: KanbanColumnType;
  };
  columnsOrder: string[];
};
