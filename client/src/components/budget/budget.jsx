import React, { useState } from 'react';
import './budget.css';
import Vendors from './vendors.jsx';

const Budget = (props) => {
  const [vendors] = useState({DJ: [
    {name: 'Taylor Swift', photo: "https://media.vanityfair.com/photos/602c3ec3b9f9b86e12a660c0/16:9/w_1280,c_limit/VF1421_Taylor_Swift_Tout.jpg"},
    {name: 'DJ Khaled', photo: "https://pbs.twimg.com/profile_images/1129254673209339905/hMI9TU58_400x400.png"},
    {name: 'Diplo', photo: "https://media.npr.org/assets/img/2017/11/20/diplo-2016-alexei-hay-2_wide-43e8194133f367cedf750e8114e119c8ce982473.jpg"},
    {name: 'Harry Styles', photo: "https://www.rollingstone.com/wp-content/uploads/2019/08/R1331_FEA_Harry_Styles_Fwm.jpg?w=800"},
    {name: 'Zedd', photo: "https://www.billboard.com/wp-content/uploads/media/zedd-bb19-jdge-2017-feat-billboard-1240.jpg?w=1240"},
    {name: 'Calvin Harris', photo: "https://variety.com/wp-content/uploads/2013/08/calvin-harris-top-earning-dj.jpg"}], Photography: [{name: '1', photo: ''}, {name: '2', photo: ''}, {name: '3', photo: ''}, {name: 'say cheese!', photo: ''}], Videography: [{name: '1', photo: ''}, {name: '2', photo: ''}, {name: '3', photo: ''}, {name: 'action!', photo: ''}], Catering: [{name: 'McDonald\'s', photo: "https://i.insider.com/6334125c9ac0610018e7ff1d?width=700"}, {name: 'Shake Shack', photo:'https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_300,q_100,fl_lossy,dpr_2.0,c_fit,f_auto,h_300/npp3at7u5pmstkogyelq'}]});
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