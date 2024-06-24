import React from 'react';
import BaseNode from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      label="LLM"
      inputs={[
        { name: 'system', label: 'System', type: 'text' },
        { name: 'prompt', label: 'Prompt', type: 'text' },
      ]}
      outputs={['response']}
    />
  );
};
