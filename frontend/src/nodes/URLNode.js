import React, { useState } from 'react';
import BaseNode from './BaseNode';

export const URLNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    url: data?.url || '',
  });

  const handleInputChange = (value, name) => {
    setNodeData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <BaseNode
      id={id}
      data={nodeData}
      label="URL"
      inputs={[
        { name: 'url', label: 'URL', type: 'text' },
      ]}
      outputs={['output']}
      onInputChange={handleInputChange}
    />
  );
};
