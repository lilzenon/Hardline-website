import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './components/HomePage';
import TestVerification from './components/TestVerification';

// Import any additional CSS if needed
import './styles.css';

// Check if we're in test mode
const isTestMode = window.location.search.includes('test=verification');

const App = () => {
    return isTestMode ? < TestVerification / > : < HomePage / > ;
};

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render( < App / > );