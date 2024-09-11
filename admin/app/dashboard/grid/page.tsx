"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridForm } from './gridform';
import { GridView } from './gridview';

const GridPage = () => {
  const [grids, setGrids] = useState<any[]>([]);

  useEffect(() => {
    fetchGrids();
  }, []);

  const fetchGrids = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/grids');
      setGrids(response.data);
    } catch (error) {
      console.error('Failed to fetch grids:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/grids/${id}`);
      fetchGrids();  // Refresh list after deletion
    } catch (error) {
      console.error('Failed to delete grid:', error);
    }
  };

  return (
    <div>
      <GridForm refreshGrids={fetchGrids} />
      {grids.map(grid => (
        <GridView key={grid._id} grid={grid} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default GridPage;
