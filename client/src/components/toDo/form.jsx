import React, { useState } from 'react';

const Form = (props) => {
  const [inputText, setInputText] = useState('');

  var addItem = () => {
    if (inputText !== '') {
      let temp = JSON.parse(JSON.stringify(props.toDo));
      temp.push(inputText);
      props.setToDo(temp);
      document.querySelector('.inputToDo').value = '';
    }
  };

  return (
    <div className="form">
      <input className="inputToDo" placeholder="New Item" onChange={(e) => setInputText(e.target.value)}></input>
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default Form;