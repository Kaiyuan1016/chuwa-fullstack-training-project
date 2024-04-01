import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './features/store';
import { Provider } from 'react-redux';
import PageHeader from './components/Navbar/PageHeader';
import {jwtDecode} from 'jwt-decode';
import { setCurrentUser } from './features/userSlice';
import { BrowserRouter} from 'react-router-dom';

if (localStorage.getItem('token')) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('token'))));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PageHeader />
      <div style={{ backgroundColor: '#F1F1F1', padding:'1rem',maxWidth:'1200px',margin:'0 auto' }}>
        <App />
      </div>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
