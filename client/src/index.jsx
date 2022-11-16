import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styling/styleSheet.css';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import ToDo from './components/toDo/toDo.jsx';
import Budget from './components/budget/budget.jsx';
import Timeline from './components/timeline/timeline.jsx';

const App = () => {
  const [page, setPage] = useState('login');
  const [loggedIn, setLogIn] = useState(false);
  const [email, setEmail] = useState('');
  const [toDo, setToDo] = useState(['Set wedding date', 'Set budget', 'Book wedding venue', 'Get marriage license', 'Book vendors', 'Buy wedding dress']); // in the DB
  const [done, setDone] = useState([]); // in the DB
  const [weddingDate, setWeddingDate] = useState(undefined);
  const [budget, setBudget] = useState(0); // in the DB
  const [costAdded, setCostAdded] = useState({}); // in the DB
  const [warning, setWarning] = useState('');
  const [itinerary, setItinerary] = useState({}); // need to add to DB
  // need another DB system for the vendors eventually (planner-side)

  useEffect(() => {
    axios.post('/update', {update: 'completedToDos', email: email, data: done});
  }, [done]);

  useEffect(() => {
    axios.post('/update', {update: 'toDos', email: email, data: toDo});
  }, [toDo]);

  useEffect(() => {
    axios.post('/update', {update: 'date', email: email, data: weddingDate});
  }, [weddingDate]);

  useEffect(() => {
    axios.post('/update', {update: 'budget', email: email, data: budget});
  }, [budget]);

  useEffect(() => {
    axios.post('/update', {update: 'currentCost', email: email, data: costAdded});
  }, [costAdded]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  const logOut = (e) => {
    e.preventDefault();
    window.location.reload(false);
  }

  return (
    <div>
      {loggedIn ?
        (<div>
          <div className="header">
            <div className="title">Celebrate With Cait | Getting You To "I Do"</div>
            <div className="nav" onClick={() => setPage("toDo")}>To Do</div>
            <div className="nav" onClick={() => setPage("budget")}>Budget</div>
            <div className="nav" onClick={() => setPage("timeline")}>Timeline</div>
            <div className="nav" onClick={logOut}>Log Out</div>
          </div>
          {page === "toDo" ? <ToDo email={email} budget={budget} setBudget={setBudget} formatter={formatter} warning={warning} setWarning={setWarning} done={done} setDone={setDone} toDo={toDo} setToDo={setToDo} weddingDate={weddingDate} setWeddingDate={setWeddingDate}/> : null}
          {page === "budget" ? <Budget setPage={setPage} budget={budget} costAdded={costAdded} setCostAdded={setCostAdded} formatter={formatter}/> : null}
          {page === "timeline" ? <Timeline itinerary={itinerary} setItinerary={setItinerary}/> : null}
        </div>) : <div id="authentication">{page === "login" ? (<Login setPage={setPage} setLogIn={setLogIn} setEmail={setEmail} setBudget={setBudget} setWeddingDate={setWeddingDate} setToDo={setToDo} setCostAdded={setCostAdded} setDone={setDone}/>) : <SignUp setPage={setPage} setLogIn={setLogIn} setEmail={setEmail}/>}</div>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));