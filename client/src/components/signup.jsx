import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const SignUp = (props) => {
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [pwd, setpwd] = useState('');

  var createAccount = () => {
    var pwdCheck = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    var emailCheck = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    if (emailCheck.test(email) && pwdCheck.test(pwd)) {
      document.querySelectorAll('.form').forEach((item) => {
        item.value = '';
        setfname('');
        setlname('');
        setemail('');
        setpwd('');
      })
      axios.post('/signup', {email, pwd}).then((data) => {
        if (data.data !== 'User already exists') {
          props.setLogIn(true);
          props.setPage('toDo');
          props.setEmail(email);
        } else {
          console.log(data.data);
        }
      })
    } else {
      alert('Invalid e-mail/password');
      document.querySelector('.password').value = '';
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      {/* <input className="form" onChange={(e) => setfname(e.target.value)} placeholder="First Name"/>
      <input className="form" onChange={(e) => setlname(e.target.value)} placeholder="Last Name"/> */}
      <input className="form" onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email"/>
      <input className="form password" onChange={(e) => setpwd(e.target.value)} type="password" placeholder="Password"/>
      <button onClick={createAccount}>Sign Up</button>
      <p onClick={() => props.setPage('login')}>Existing user? <a>Log In</a></p>
    </div>
  );
};

export default SignUp;