import React, { useState } from 'react';
import BaseNode from './BaseNode';

export const NumberNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    number: data?.number || 0,
  });

  const handleInputChange = (value, name) => {
    setNodeData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <BaseNode
      id={id}
      data={nodeData}
      label="Number"
      inputs={[
        { name: 'number', label: 'Number', type: 'text' },
      ]}
      outputs={['output']}
      onInputChange={handleInputChange}
    />
  );
};
