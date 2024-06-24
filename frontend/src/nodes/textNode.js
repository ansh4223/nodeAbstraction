import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import BaseNode from './BaseNode';

const NodeContainer = styled.div`
  border: 1px solid black;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  resize: both;
  overflow: hidden;
`;

const NodeLabel = styled.div`
  font-weight: bold;
`;

const InputField = styled.textarea`
  margin-top: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  resize: none;
`;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 80 });

  const textAreaRef = useRef(null);

  useEffect(() => {
    const matchVariables = currText.match(/{{\s*[\w]+\s*}}/g);
    const uniqueVariables = [...new Set(matchVariables)];
    setVariables(uniqueVariables || []);
  }, [currText]);

  useEffect(() => {
    if (textAreaRef.current) {
      const { scrollWidth, scrollHeight } = textAreaRef.current;
      setNodeSize({
        width: Math.max(200, scrollWidth),
        height: Math.max(80, scrollHeight),
      });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <NodeContainer style={{ width: nodeSize.width, height: nodeSize.height }}>
      <NodeLabel>Text</NodeLabel>
      <InputField
        ref={textAreaRef}
        value={currText}
        onChange={handleTextChange}
        rows={1}
      />
      {variables.map((variable, index) => (
        <Handle
          key={index}
          type="target"
          position={Position.Left}
          id={`${id}-${variable.replace(/{{\s*|\s*}}/g, '')}`}
          style={{ top: `${(index + 1) * 20}px` }}
        />
      ))}
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </NodeContainer>
  );
};
