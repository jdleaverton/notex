import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css';

(() => {
  console.log('webpack worked');
})();

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
