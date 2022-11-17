import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './timeline.css';
// import StickyBoard from './stickyBoard.jsx';

const Timeline = (props) => {
  var columns = 3;
  //    # of hours in timeline ↓
  var times = Array.from(Array(16 * columns).keys());
  var startTime = 9; // start time of the day

  useEffect(() => {
    for (let id in props.itinerary) {
      document.getElementById(id).innerText = props.itinerary[id];
    }
  }, []);

  var logEdit = (e) => {
    let temp = JSON.parse(JSON.stringify(props.itinerary));
    temp[e.target.id] = e.target.innerText;
    props.setItinerary(temp);
  }

  return (
    <div className="itinerary">
      <div id="titles">
        <div className="title time">Time</div>
        <div className="title">Event</div>
        <div className="title">Notes</div>
        {times.map((time, key) => {
          let num = Math.floor(time / columns);
          if (time % columns === 0) {
            if (num + startTime > 12) {
              startTime -= 12;
            }
            if (time === times.length - columns) {
              return (<div className="time lastRow" key={key}>{`${num + startTime}:00`}</div>)
            } else {
              return (<div className="time" key={key}>{`${num + startTime}:00`}</div>)
            }
          } else if (time % columns === 1) {
            if (time > times.length - columns) {
              return (<div id={`${num + startTime}Event`} className="cell lastRow" contentEditable="true" onBlur={logEdit} key={key}></div>)
            } else {
              return (<div id={`${num + startTime}Event`} className="cell event" contentEditable="true" onBlur={logEdit} key={key}></div>)
            }
          } else {
            if (time > times.length - columns) {
              return (<div id={`${num + startTime}Note`} className="cell lastRow" contentEditable="true" onBlur={logEdit} key={key}></div>)
            } else {
              return (<div id={`${num + startTime}Note`} className="cell note" contentEditable="true" onBlur={logEdit} key={key}></div>)
            }
          }
        })}
      </div>
    </div>
  );
};

export default Timeline;