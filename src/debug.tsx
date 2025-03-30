import React from 'react';
import { createRoot } from 'react-dom/client';
import { RobotCard } from './components/ui/fixed/robot-card';
import './index.css';

// Simple component to test just the RobotCard
const DebugApp = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#c7af8c', marginBottom: '20px' }}>RobotCard Component Test</h3>
      <div>
        <RobotCard />
      </div>
    </div>
  );
};

// Render the debug app
const container = document.getElementById('root-debug') || document.getElementById('root');
if (container) {
  try {
    console.log('Rendering debug component...');
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <DebugApp />
      </React.StrictMode>
    );
    console.log('Debug component rendered successfully');
  } catch (error) {
    console.error('Failed to render debug component:', error);
    container.innerHTML = `
      <div style="padding: 20px; background: #101520; color: #ff6b6b; border-radius: 8px;">
        <h3>Debug Component Error</h3>
        <pre>${error instanceof Error ? error.stack || error.message : String(error)}</pre>
      </div>
    `;
  }
} else {
  console.error('No root element found for debug rendering');
} 