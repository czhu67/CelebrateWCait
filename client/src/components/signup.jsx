import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const SignUp = (props) => {
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [pwd, setpwd] = useState('');

  return (
    <div>
      <h1>Sign Up</h1>
      <input onChange={(e) => setfname(e.target.value)} placeholder="First Name"/>
      <input onChange={(e) => setlname(e.target.value)} placeholder="Last Name"/>
      <input onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email"/>
      <input onChange={(e) => setpwd(e.target.value)} type="password" placeholder="Password"/>
      <button onClick={() => console.log(fname, lname, email, pwd)}>Sign Up</button>
      <p onClick={() => props.setPage('login')}>Existing user? Log In</p>
    </div>
  );
};

export default SignUp;