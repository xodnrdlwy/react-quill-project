import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Join} from "./users/Join";
import {Login} from "./users/Login";
import {Modify} from "./users/Modify";
import {Add} from "./board/Add";
import {BoardList} from "./board/BoardList";
import {BoardModify} from "./board/BoardModify";
import {BoardDetail} from "./board/BoardDetail";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route index element={<App />} />

              <Route path="user">
                <Route path="join" element={<Join/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="modify" element={<Modify/>}/>
              </Route>

            <Route path="board">
                  <Route path="add" element={<Add/>}/>
                  <Route path="list" element={<BoardList/>}/>
                  <Route path="modify/:bid" element={<BoardModify/>}/>
                  <Route path="detail/:bid" element={<BoardDetail/>}/>
              </Route>
          </Routes>
      </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
