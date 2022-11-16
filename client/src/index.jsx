import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styling/styleSheet.css';
import axios from 'axios';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import ToDo from './components/toDo/toDo.jsx';
import Budget from './components/budget/budget.jsx';
import Itinerary from './components/itinerary/itinerary.jsx';

const App = () => {
  const [page, setPage] = useState('login');
  const [loggedIn, setLogIn] = useState(false);
  const [email, setEmail] = useState('');
  const [toDo, setToDo] = useState(['Set wedding date', 'Set budget', 'Book wedding venue', 'Get marriage license', 'Book vendors', 'Buy wedding dress']); // need to add new ones to DB
  const [done, setDone] = useState([]); // need to add to DB
  const [weddingDate, setWeddingDate] = useState(undefined);
  const [budget, setBudget] = useState(0); // need to add to DB
  const [costAdded, setCostAdded] = useState({}); // need to add to DB
  const [warning, setWarning] = useState('');
  const [stickyNotes, setStickyNotes] = useState([]); // need to add to DB
  // need another DB system for the vendors eventually (planner-side)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div>
      {loggedIn ?
        (<div>
          <div className="header">
            <div className="title">Celebrate With Cait | Getting You To "I Do"</div>
            <div className="nav" onClick={() => setPage("toDo")}>To Do</div>
            <div className="nav" onClick={() => setPage("budget")}>Budget</div>
            <div className="nav" onClick={() => setPage("itinerary")}>Itinerary</div>
            <div className="nav" onClick={() => console.log('out')}>Log Out</div>
          </div>
          {page === "toDo" ? <ToDo email={email} budget={budget} setBudget={setBudget} formatter={formatter} warning={warning} setWarning={setWarning} done={done} setDone={setDone} toDo={toDo} setToDo={setToDo} weddingDate={weddingDate} setWeddingDate={setWeddingDate}/> : null}
          {page === "budget" ? <Budget setPage={setPage} budget={budget} costAdded={costAdded} setCostAdded={setCostAdded} formatter={formatter}/> : null}
          {page === "itinerary" ? <Itinerary stickyNotes={stickyNotes} setStickyNotes={setStickyNotes}/> : null}
        </div>) : <div id="authentication">{page === "login" ? <Login setPage={setPage} setLogIn={setLogIn} setEmail={setEmail} setBudget={setBudget} setWeddingDate={setWeddingDate}/> : <SignUp setPage={setPage} setLogIn={setLogIn} setEmail={setEmail}/>}</div>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));