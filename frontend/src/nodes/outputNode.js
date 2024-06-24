import React, { useState } from 'react';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    outputName: data?.outputName || id.replace('customOutput-', 'output_'),
    outputType: data?.outputType || 'Text',
  });

  const handleInputChange = (value, name) => {
    setNodeData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <BaseNode
      id={id}
      data={nodeData}
      label="Output"
      inputs={[
        { name: 'outputName', label: 'Name', type: 'text' },
        { name: 'outputType', label: 'Type', type: 'select', options: ['Text', 'Image'] },
      ]}
      outputs={['value']}
      onInputChange={handleInputChange}
    />
  );
};
