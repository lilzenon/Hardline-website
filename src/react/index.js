import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './components/HomePage';

// Import any additional CSS if needed
import './styles.css';

const App = () => {
  return <HomePage />;
};

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(<App />);
