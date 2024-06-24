import React, { useState } from 'react';
import BaseNode from './BaseNode';

export const EmailNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    email: data?.email || '',
  });

  const handleInputChange = (value, name) => {
    setNodeData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <BaseNode
      id={id}
      data={nodeData}
      label="Email"
      inputs={[
        { name: 'email', label: 'Email', type: 'text' },
      ]}
      outputs={['output']}
      onInputChange={handleInputChange}
    />
  );
};
