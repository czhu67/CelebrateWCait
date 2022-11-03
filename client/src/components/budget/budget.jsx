import React, { useState } from 'react';
import './budget.css';
import Vendors from './vendors.jsx';

const Budget = (props) => {
  const [vendors] = useState({DJ: ['ready', 'set', 'DANCE!', 'boots', 'and', 'cats'], Photography: [1, 2, 3, 'say cheese!'], Videography: [3, 2, 1, 'action!'], Catering: ['McDonald\'s', 'I\'m lovin\' it']});
  // uses the "first" type of vendor in the object's list of vendors
  const [vendorCategory, setVendorCategory] = useState(Object.keys(vendors)[0]);
  const [totalCost, setTotalCost] = useState(Object.values(props.costAdded).reduce((a, b) => a + b, 0));

  var vendorList = vendors[vendorCategory];

  return (
    <div className="budget">
      {props.budget === 0 ? <div className="noBudget">Set a budget in the <b onClick={() => props.setPage('toDo')}><u><i>To Do</i></u></b> tab to start</div> :
        <div>
            {totalCost > props.budget ? <div className="noBudget">You are over budget! Cut down some costs or increase your budget.<br/>Budget: ${props.budget} Current total: ${totalCost}</div> :
              <div className="budgetHeader">
                <div className="progressBar">
                  <div className="progressBarBottom"></div>
                  <div className="progressBarTop" style={{width: `${72 * totalCost / props.budget}%`}}></div>
                </div>
                <div className="budgetLabel">
                  <div className="budgetNum">{`${props.formatter.format(totalCost)}/${props.formatter.format(props.budget)}`}</div>
                  <div className="budgetNum">{`${Math.round((isFinite(totalCost/props.budget) ? totalCost/props.budget : 0) * 100)}%`}</div>
                </div>
              </div>
            }
          <div className="vendorSection">
            <ul className="vendorTypes">
              <div className="categories"><b>Categories</b></div>
              {Object.keys(vendors).map((vendorType, key) => {
                return (<li key={key} className="vendorList" onClick={() => setVendorCategory(vendorType)}>{vendorType === vendorCategory ? <u>{vendorType}</u>: vendorType}</li>)})}
            </ul>
            <Vendors vendors={vendors} vendorList={vendorList} totalCost={totalCost} setTotalCost={setTotalCost} costAdded={props.costAdded} setCostAdded={props.setCostAdded} formatter={props.formatter}/>
          </div>
        </div>
      }
    </div>
  );
};

export default Budget;