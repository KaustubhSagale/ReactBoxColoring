import React, { useState } from 'react';

const Grid = () => {
  const gridSize = 3;
  const totalCells = gridSize * gridSize;
  const [clickedCells, setClickedCells] = useState([]);
  const [cellColors, setCellColors] = useState(Array(totalCells).fill('lightgray'));

  const handleClick = (index) => {
    if (!clickedCells.includes(index)) {
      const newClickedCells = [...clickedCells, index];
      setClickedCells(newClickedCells);

      const newCellColors = [...cellColors];
      newCellColors[index] = 'green';
      setCellColors(newCellColors);

      if (newClickedCells.length === totalCells) {
        changeColorsInSequence(newClickedCells);
      }
    }
  };

  const changeColorsInSequence = (sequence) => {
    sequence.forEach((cellIndex, i) => {
      setTimeout(() => {
        setCellColors((prevColors) => {
          const updatedColors = [...prevColors];
          updatedColors[cellIndex] = 'orange';
          return updatedColors;
        });
      }, i * 500); // Adjust delay as needed
    });
  };

  const renderCell = (index) => (
    <div
      key={index}
      className="col border p-4"
      style={{ backgroundColor: cellColors[index], cursor: 'pointer' }}
      onClick={() => handleClick(index)}
    />
  );

  const renderRow = (rowIndex) => (
    <div className="row" key={rowIndex}>
      {Array.from({ length: gridSize }, (_, i) => renderCell(rowIndex * gridSize + i))}
    </div>
  );

  return (
    <div className="container mt-5">
      {Array.from({ length: gridSize }, (_, i) => renderRow(i))}
    </div>
  );
};

export default Grid;
