import React, { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
    const [alertMessage, setAlertMessage] = useState('');

    const handleSetAlert = (message) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(''), 5000);
    };

    return (
        <div>
            <PipelineToolbar />
            <PipelineUI />
            <SubmitButton setAlert={handleSetAlert} />
            {alertMessage && <div>{alertMessage}</div>}
        </div>
    );
}

export default App;
