import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Modal from './modal.jsx';

const Login = (props) => {
  const [email, setemail] = useState('');
  const [pwd, setpwd] = useState('');
  const [warning, setWarning] = useState('');

  var logIn = () => {
    if (email && pwd) {
      axios.post('/login', {email, pwd}).then((data) => {
        if (data.data.indexOf('does not exist') === -1 && data.data !== 'Incorrect password. Please try again.') {
          props.setEmail(email);
          props.setLogIn(true);
          props.setPage('toDo');
          props.setBudget(data.data.budget);
          props.setDone(data.data.completedToDos);
          if (data.data.date !== null) {
            props.setWeddingDate(new Date(data.data.date));
          }
          if (data.data.toDos.length !== 0) {
            props.setToDo(data.data.toDos);
          }
          if (data.data.currentCost !== undefined) {
            props.setCostAdded(data.data.currentCost);
          }
          if (data.data.itinerary !== undefined) {
            props.setItinerary(data.data.itinerary);
          }
        } else {
          setWarning(data.data);
          document.querySelector('.password').value = '';
        }
      })
    } else {
      setWarning('Invalid email/password.');
      document.querySelector('.password').value = '';
    }
  }

  return (
    <div className="login">
      {warning !== '' ? <Modal message={`${warning}`} setWarning={setWarning}/> : null}
      <h1>Login</h1>
      <input onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email"/><br/>
      <input className="password" onChange={(e) => setpwd(e.target.value)} type="password" placeholder="Password"/><br/>
      <button onClick={logIn}>Log In</button>
      <p onClick={() => props.setPage('signUp')}>Just engaged? Congrats! <a>Create Account</a></p>
    </div>
  );
};

export default Login;