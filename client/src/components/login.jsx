import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Login = (props) => {
  const [email, setemail] = useState('');
  const [pwd, setpwd] = useState('');

  return (
    <div>
      <h1>Login</h1>
      <input onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email"/>
      <input onChange={(e) => setpwd(e.target.value)} type="password" placeholder="Password"/>
      <button onClick={() => console.log(email, pwd)}>Log In</button>
      <p onClick={() => props.setPage('signUp')}>Just engaged? Congrats! Create Account</p>
    </div>
  );
};

export default Login;