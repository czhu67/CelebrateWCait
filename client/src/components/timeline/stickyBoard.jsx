import React, { useState, useEffect } from 'react';

const StickyBoard = (props) => {
  // useEffect(() => {
  //   props.stickyNotes.map((note) => {
  //     // document.querySelector('.stickyNoteBoard').appendChild(parser.parseFromString(note, 'text/html').body.children[0]);
  //   })
  // }, []);

  var parser = new DOMParser();

  var createSticky = (e) => {
    if (e.target.className === 'stickyNoteBoard') {
      var note = document.createElement('div');
      note.classList.add('note');
      note.style.left = `${e.pageX - 315}px`;
      note.style.top = `${e.pageY - 150}px`;
      var div = document.createElement('div');
      note.appendChild(div);
      // edit the sticky note
      div.classList.add('stickyNote');
      div.contentEditable = true;
      div.innerText = 'Click to edit';
      div.onfocus = () => {
        if (div.innerText === 'Click to edit') {
          div.innerText = ''
        }
      };
      div.onblur = (e) => {
        if (e.target.innerText === '') {
          div.innerText = 'Click to edit';
        }
      };
      // delete the sticky note
      var close = document.createElement('p');
      close.classList.add('closeButton');
      close.innerText = '𐄂';
      close.onclick = (e) => {
        note.remove();
      };
      note.appendChild(close);
      document.querySelector('.stickyNoteBoard').appendChild(note);
    }
  }
  return (
    <div className="stickyNoteBoard" onDoubleClick={(e) => createSticky(e)}>
    </div>
  );
};

export default StickyBoard;