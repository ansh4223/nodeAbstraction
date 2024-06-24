import React, { useState } from 'react';
import BaseNode from './BaseNode';

export const BooleanNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    boolean: data?.boolean || 'false',
  });

  const handleInputChange = (value, name) => {
    setNodeData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <BaseNode
      id={id}
      data={nodeData}
      label="Boolean"
      inputs={[
        { name: 'boolean', label: 'Boolean', type: 'select', options: ['true', 'false'] },
      ]}
      outputs={['output']}
      onInputChange={handleInputChange}
    />
  );
};
