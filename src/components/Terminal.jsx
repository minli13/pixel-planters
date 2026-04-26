import React, { useEffect } from 'react'
import { useState } from 'react'
import { useGarden } from '../helpers/GardenContext'

const Terminal = ({ code, run, onRunComplete }) => {
    const { runCode, loading } = useGarden();
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('run', run, 'code', code);
        if (!run || !code) return;
        async function execute() {
            const result = await runCode(code);
            setOutput(result.output);
            setError(result.error);
            onRunComplete(); // notify level component that run is complete
        }
        execute();
    }, [run, code]);

    // useEffect(() => {
    //     if (ready && onReady) onReady(); // notify level component that pyodide is ready
    // }, [ready]);


    return (
        <div className='terminal'>
            <div>
                {loading && <pre style={{color: 'green', whiteSpace: 'pre-wrap'}}>Running...</pre>}
                {code && <pre style={{color: 'green', whiteSpace: 'pre-wrap'}}>{code}</pre>}
                {error && <pre style={{color: 'red', whiteSpace: 'pre-wrap'}}>{error}</pre>}
                {output && <pre style={{color: 'blue', whiteSpace: 'pre-wrap'}}>{output}</pre>}
                {!loading && !error && !output && (
                    <p style={{ color: 'green'}}>Output will appear here...</p>
                )}
            </div>
            
        
        </div>
    )
}

export default Terminal