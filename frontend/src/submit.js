import React from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    console.log("Submitting pipeline with nodes:", nodes);
    console.log("Submitting pipeline with edges:", edges);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit the pipeline');
      }

      const data = await response.json();
      alert(`Pipeline submitted successfully! Result: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error submitting pipeline: ${error.message}`);
    }
  };

  return (
    <button onClick={handleSubmit}>Submit Pipeline</button>
  );
};

export default SubmitButton;
