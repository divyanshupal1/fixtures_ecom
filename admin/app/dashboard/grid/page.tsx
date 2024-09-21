"use client"

import React from 'react';
import { GridComp } from './gridform';

const GridPage = () => {

  return (
    <>
    <div className="flex max-sm:items-start justify-between items-center w-full mb-5 px-5 pt-8 rounded-xl">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Home Page Grid
        </h2>
      </div>
    </div>
    <div className='w-full h-auto bg-slate-900 p-4 rounded-lg'>
      <GridComp/>
    </div>
  </>
  );
};

export default GridPage;
