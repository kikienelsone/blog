import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store/Store';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
