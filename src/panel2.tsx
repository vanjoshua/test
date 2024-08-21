import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <h1>Hello, World!</h1>;
};

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
