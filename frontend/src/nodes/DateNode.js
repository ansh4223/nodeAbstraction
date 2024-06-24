import React, { useState } from 'react';
import BaseNode from './BaseNode';

export const DateNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    date: data?.date || new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (value, name) => {
    setNodeData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <BaseNode
      id={id}
      data={nodeData}
      label="Date"
      inputs={[
        { name: 'date', label: 'Date', type: 'text' },
      ]}
      outputs={['output']}
      onInputChange={handleInputChange}
    />
  );
};
