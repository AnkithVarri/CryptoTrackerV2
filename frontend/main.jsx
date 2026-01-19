import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './index.css'

console.log('main.jsx loaded');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found!');
    document.body.innerHTML = '<h1 style="color: red; padding: 20px;">ERROR: Root element not found!</h1>';
  } else {
    console.log('Root element found, rendering App...');
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    );
    console.log('App rendered successfully');
  }
} catch (error) {
  console.error('Error rendering app:', error);
  document.body.innerHTML = `<h1 style="color: red; padding: 20px;">ERROR: ${error.message}</h1>`;
}

