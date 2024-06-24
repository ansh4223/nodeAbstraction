import React from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import { useStore } from '../store';

const NodeContainer = styled.div`
  width: 200px;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
`;

const NodeLabel = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const NodeField = styled.div`
  margin-bottom: 10px;
`;

const BaseNode = ({ id, data, label, inputs, outputs }) => {
  const { updateNodeField } = useStore();

  const handleInputChange = (e, name) => {
    updateNodeField(id, name, e.target.value);
  };

  return (
    <NodeContainer>
      <NodeLabel>{label}</NodeLabel>
      {inputs && inputs.map((input, index) => (
        <NodeField key={index}>
          <label>{input.label}:</label>
          <input
            type={input.type}
            value={data[input.name] || ''}
            onChange={(e) => handleInputChange(e, input.name)}
          />
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${input.name}`}
            style={{ top: `${(index + 1) * 20}px` }}
          />
        </NodeField>
      ))}
      {outputs && outputs.map((output, index) => (
        <Handle
          key={index}
          type="source"
          position={Position.Right}
          id={`${id}-${output}`}
          style={{ top: `${(index + 1) * 20}px` }}
        />
      ))}
    </NodeContainer>
  );
};

export default BaseNode;
