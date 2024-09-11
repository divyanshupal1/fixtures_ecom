import React from 'react';

interface GridProps {
  grid: any;  // You can define a more specific type based on your data structure
  onDelete: (id: string) => void;
}

export const GridView: React.FC<GridProps> = ({ grid, onDelete }) => {
  return (
    <div>
      <h2>{grid.gridName}</h2>
      {/* Display other grid details */}
      <button onClick={() => onDelete(grid._id)}>Delete</button>
    </div>
  );
};
