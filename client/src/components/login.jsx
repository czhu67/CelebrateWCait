import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Login = (props) => {
  const [email, setemail] = useState('');
  const [pwd, setpwd] = useState('');

  var logIn = () => {
    if (email && pwd) {
      axios.post('/login', {email, pwd}).then((data) => {
        console.log(data.data);
        if (data.data !== 'Invalid e-mail/password') {
          props.setEmail(email);
          props.setLogIn(true);
          props.setPage('toDo');
          props.setWeddingDate(new Date(data.data.date));
          props.setBudget(data.data.budget);
        }
      })
    } else {
      console.log('invalid');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email"/>
      <input onChange={(e) => setpwd(e.target.value)} type="password" placeholder="Password"/>
      <button onClick={logIn}>Log In</button>
      <p onClick={() => props.setPage('signUp')}>Just engaged? Congrats! <a>Create Account</a></p>
    </div>
  );
};

export default Login;