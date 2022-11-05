import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styling/styleSheet.css';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import ToDo from './components/toDo/toDo.jsx';
import Budget from './components/budget/budget.jsx';
import Itinerary from './components/itinerary/itinerary.jsx';

const App = () => {
  const [page, setPage] = useState('toDo');
  const [toDo, setToDo] = useState(['Set wedding date', 'Set budget', 'Book wedding venue', 'Get marriage license', 'Book vendors', 'Buy wedding dress']); // need to add to DB
  const [done, setDone] = useState([]); // need to add to DB
  const [weddingDate, setWeddingDate] = useState(undefined);
  const [budget, setBudget] = useState(0); // need to add to DB
  const [costAdded, setCostAdded] = useState({}); // need to add to DB
  const [warning, setWarning] = useState('');
  const [stickyNotes, setStickyNotes] = useState([]); // need to add to DB
  // need another DB for the vendors

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div>
      <div className="header">
        <div className="title">Celebrate With Cait | Getting You To "I Do"</div>
        <div className="nav" onClick={() => setPage("toDo")}>To Do</div>
        <div className="nav" onClick={() => setPage("budget")}>Budget</div>
        <div className="nav" onClick={() => setPage("itinerary")}>Itinerary</div>
      </div>
      {page === "login" ? <Login setPage={setPage}/> : null}
      {page === "signUp" ? <SignUp setPage={setPage}/> : null}
      {page === "toDo" ? <ToDo budget={budget} setBudget={setBudget} formatter={formatter} warning={warning} setWarning={setWarning} done={done} setDone={setDone} toDo={toDo} setToDo={setToDo} weddingDate={weddingDate} setWeddingDate={setWeddingDate}/> : null}
      {page === "budget" ? <Budget setPage={setPage} budget={budget} costAdded={costAdded} setCostAdded={setCostAdded} formatter={formatter}/> : null}
      {page === "itinerary" ? <Itinerary stickyNotes={stickyNotes} setStickyNotes={setStickyNotes}/> : null}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));