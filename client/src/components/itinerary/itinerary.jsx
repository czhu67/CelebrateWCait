import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './itinerary.css';
import StickyBoard from './stickyBoard.jsx';

const Itinerary = (props) => {
  var times = Array.from(Array(13).keys());

  return (
    <div className="itinerary">
      <div className="titles">
        <div className="timeTitle">Time</div>
        <div className="eventTitle">Event</div>
        <i className="instructions">Double click to add a sticky note</i>
      </div>
      <div className="times">
        {times.map((time, key) => {
          if (time === 0) {
            return (<div className="time" key={key}>12:00 PM</div>);
          } else if (time === 12) {
            return (<div className="time" key={key}>12:00 AM</div>);
          } else {
            return (<div className="time" key={key}>{`${time}:00 PM`}</div>)
          }
        })}
      </div>
      <div className="line"></div>
      <StickyBoard stickyNotes={props.stickyNotes} setStickyNotes={props.setStickyNotes}/>
    </div>
  );
};

export default Itinerary;