import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './toDo.css';
import Form from './form.jsx';
import Modal from '../modal.jsx';

const ToDo = (props) => {
  // key is days until wedding, value is list that needs to be added to existing list (toDo)
  // need to hardcode/set this up myself (one day create an interface for users when app is ready to sell)
  const [timeline] = useState({1: ['brush teeth', 'do makeup'], 2: ['buy shoes']});
  const [inputDate, setInputDate] = useState('');
  const [inputBudget, setInputBudget] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [lookAhead, setLookAhead] = useState(false);

  useEffect(() => {
    if (props.weddingDate !== undefined) {
      let date = new Date();
      let difference = props.weddingDate.getTime() - date.getTime();
      setCountdown(Math.ceil(difference / (1000 * 60 * 60 * 24)));
      document.getElementById('Set wedding date').style.textDecoration = 'line-through';
    }
  }, [props.weddingDate]);

  useEffect(() => {
    if (props.budget !== 0) {
      document.getElementById('Set budget').style.textDecoration = 'line-through';
    }
  }, [props.budget]);

  var firstLine = (text) => {
    let lineBreak = text.indexOf('\n');
    return text.substring(0, lineBreak);
  }

  var createDate = (e) => {
    e.preventDefault();
    let dateObject = new Date(inputDate);
    if (!isNaN(dateObject)) {
      let today = new Date();
      if (dateObject > today) {
        props.setWeddingDate(dateObject);
        let temp = JSON.parse(JSON.stringify(props.done));
        temp.push(firstLine(e.target.parentElement.parentElement.innerText));
        props.setDone(temp);
      } else {
        props.setWarning('Invalid date: date must be in the future and in MM/DD/YYYY format.');
      }
    } else {
      props.setWarning('Invalid date: date must be in the future and in MM/DD/YYYY format.');
      setInputDate(0);
      document.querySelector('.inputDate').value = '';
    }
  }

  var createBudget = (e) => {
    e.preventDefault();
    if (inputBudget > 0 ) {
      let listItem = e.target.parentElement.parentElement;
      let temp = JSON.parse(JSON.stringify(props.done));
      temp.push(firstLine(listItem.innerText));
      props.setDone(temp);
      props.setBudget(inputBudget);
    } else {
      props.setWarning('Invalid budget amount: amount must be over $0.');
      setInputBudget(0);
      document.querySelector('.inputBudget').value = '';
    }
  }

  var deleteItem = (e) => {
    e.preventDefault();
    let temp = JSON.parse(JSON.stringify(props.toDo));
    let index = e.target.parentElement.innerText.indexOf('\n');
    let words = e.target.parentElement.innerText.substring(0, index)
    temp.splice(temp.indexOf(words), 1);
    props.setToDo(temp);
  }

  var markComplete = (e) => {
    e.preventDefault();
    let noTextDeco = (e.target.style.textDecoration === '');
    let list = (e.target.className === 'list');
    let settingDate = (e.target.innerText.indexOf('Set wedding date') !== -1)
    let settingBudget = (e.target.innerText.indexOf('Set budget') !== -1);
    let alreadyDone = props.done.includes(firstLine(e.target.innerText));
    if (!settingDate && !settingBudget) {
      // mark as complete
      if (noTextDeco && list && !alreadyDone) {
        let temp = JSON.parse(JSON.stringify(props.done));
        let lineBreak = e.target.innerText.indexOf('\n');
        temp.push(firstLine(e.target.innerText));
        props.setDone(temp);
        e.target.style.textDecoration = 'line-through';
      } else if (e.target.className === 'list') { // unmark: mark as incomplete
        e.target.style.textDecoration = '';
        undo(firstLine(e.target.innerText));
      }
    }
  }

  var edit = (e, thing) => {
    e.preventDefault();
    let listItem = e.target.parentElement.parentElement;
    listItem.style.textDecoration = '';
    if (thing === 'budget') {
      setInputBudget(0);
      props.setBudget(0);
    } else {
      setInputDate(undefined);
      props.setWeddingDate(undefined);
      setCountdown(0);
    }
    undo(firstLine(listItem.innerText));
  }

  var undo = (item) => {
    let index = props.done.indexOf(item);
    let temp = JSON.parse(JSON.stringify(props.done));
    temp.splice(index, 1);
    props.setDone(temp);
  }

  return (
    <div className="toDo">
      {props.warning !== '' ? <Modal message={`${props.warning}`} setWarning={props.setWarning}/> : null}
      <div className="toDoHeader">
        <Form toDo={props.toDo} setToDo={props.setToDo} email={props.email}/>
        <div className="countdown">{countdown ? `${countdown.toLocaleString()} days to go!` : 'Let\'s get planning!'}</div>
      </div>
      <ul className="toDo">
        {props.toDo.map((item, key) => {
          var linethrough = '';
          if (props.done.includes(item)) {
            linethrough = 'line-through';
          }
          return (
            <li key={key} onClick={markComplete} style={{textDecoration: linethrough}} className="list" id={`${item}`}>{`${item} `}
              {/* if toDo item is "Set wedding date" && no wedding date is set yet, render an input and button */}
              {item === "Set wedding date" ?
                // if wedding date is already set, render an Edit word that allows the user to reset it
                (props.weddingDate === undefined ? (<div className="dateForm">
                  <input className="inputDate" placeholder="MM/DD/YYYY" onChange={(e) => setInputDate(e.target.value)}/>
                  <button onClick={createDate}>Set Date</button>
                </div>): <div className="set">{props.weddingDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}<div onClick={edit} className="edit">Edit</div></div>) : null}
              {/* if toDo item is "Set budget" && no budget is set yet, render an input and button */}
              {item === "Set budget" ?
                // if budget already exists, render an Edit word that allows the user to reset it
                (props.budget === 0 ? (<div className="budgetForm">
                  $<input className="inputBudget" placeholder="Budget" onChange={(e) => setInputBudget(Number(e.target.value) || 0)}/>
                  <button onClick={createBudget}>Set Budget</button>
                </div>) : <div className="set">{props.formatter.format(props.budget)}<div onClick={(e) => edit(e, 'budget')} className="edit">Edit</div></div>) : null}
              {item !== "Set wedding date" && item !== "Set budget" ? <div className="deleteItem" onClick={deleteItem}>𐄂</div> : null}
            </li>
          );
        })}
        <div onClick={() => setLookAhead(!lookAhead)}>See what's ahead...</div>
        {lookAhead ? <div>test</div> : null}
      </ul>
    </div>
  );
};

export default ToDo;