import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { todoSlice } from './api/apiSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApiProvider api={todoSlice}>
    <App />
  </ApiProvider>
);
