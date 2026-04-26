import { useState, useEffect, useRef } from 'react';

export function usePyodide() {
  const pyodideRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function load() {
      const py = await window.loadPyodide();
      pyodideRef.current = py;
      setLoading(false);
      setReady(true);
    }
    load();
  }, []);

  async function runCode(code) {
    if (!pyodideRef.current) return { output: '', error: 'Pyodide not loaded' };
    try {
      await pyodideRef.current.runPythonAsync(`
        import sys
        import io
        sys.stdout = io.StringIO()
      `);
      await pyodideRef.current.runPythonAsync(code);
      const output = await pyodideRef.current.runPythonAsync('sys.stdout.getvalue()');
      return { output, error: null };
    } catch (err) {
      return { output: '', error: err.message };
    }
  }

  return { runCode, loading, ready };
}