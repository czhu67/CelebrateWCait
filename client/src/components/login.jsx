import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Login = (props) => {
  const [email, setemail] = useState('');
  const [pwd, setpwd] = useState('');

  var logIn = () => {
    if (email && pwd) {
      axios.post('/login', {email, pwd}).then((data) => {
        if (data.data !== 'Invalid e-mail/password') {
          props.setEmail(email);
          props.setLogIn(true);
          props.setPage('toDo');
          if (data.data.date !== null) {
            props.setWeddingDate(new Date(data.data.date));
          }
          props.setBudget(data.data.budget);
          if (data.data.toDos.length !== 0) {
            props.setToDo(data.data.toDos);
          }
          props.setCostAdded(data.data.currentCost);
          props.setDone(data.data.completedToDos);
        } else {
          console.log(data.data);
        }
      })
    } else {
      console.log('Invalid e-mail/password');
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <input onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email"/><br/>
      <input onChange={(e) => setpwd(e.target.value)} type="password" placeholder="Password"/><br/>
      <button onClick={logIn}>Log In</button>
      <p onClick={() => props.setPage('signUp')}>Just engaged? Congrats! <a>Create Account</a></p>
    </div>
  );
};

export default Login;