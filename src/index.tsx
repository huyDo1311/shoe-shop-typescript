import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Provider } from 'react-redux';
import {store} from './redux/configStore'
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryBrowser } from 'react-router-dom';
// import { Route } from 'react-router';
import HomeTemplate from './templates/HomeTemplate';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import { history } from './util/config';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <Provider store={store}>
    <HistoryBrowser  history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate/>}>
          <Route index element={<Home/>}/>
          <Route path='detail'>
            <Route path=':id' element={<Detail/>}/>
          </Route>
        </Route>
      </Routes>
    </HistoryBrowser>
    
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
