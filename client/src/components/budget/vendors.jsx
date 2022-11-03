import React, { useState } from 'react';

const Vendors = (props) => {
  const [chosenVendors, setChosenVendors] = useState([]);
  const [cost, setCost] = useState(0);

  var addVendor = (vendor) => {
    let temp = JSON.parse(JSON.stringify(chosenVendors));
    if (!chosenVendors.includes(vendor)) {
      temp.push(vendor);
    } else {
      let index = temp.indexOf(vendor);
      temp.splice(index, 1);
      if (props.costAdded[vendor] !== undefined) {
        let tempCostAdded = JSON.parse(JSON.stringify(props.costAdded));
        props.setTotalCost(props.totalCost - tempCostAdded[vendor]);
        delete tempCostAdded[vendor];
        props.setCostAdded(tempCostAdded);
      }
    }
    setChosenVendors(temp);
  }

  var addCost = (vendor) => {
    if (cost !== 0) {
      let temp = JSON.parse(JSON.stringify(props.costAdded));
      temp[vendor] = cost;
      props.setCostAdded(temp);
      props.setTotalCost(props.totalCost + cost);
    } else {

    }
  }

  var editCost = (vendor) => {
    let tempCostAdded = JSON.parse(JSON.stringify(props.costAdded));
    props.setTotalCost(props.totalCost - tempCostAdded[vendor]);
    delete tempCostAdded[vendor];
    props.setCostAdded(tempCostAdded);
  }

  return (
    <div className="vendors">
      {props.vendorList.map((vendor, key) => (
        <div className="vendorContainer" key={key}>
          <div className="vendorCards" key={key}>
            <div className="vendorImg"></div>
            <div className="vendorInfo">
              <span className="vendorName">{vendor}</span>
              <button className="addVendor" onClick={() => addVendor(vendor)}>{chosenVendors.includes(vendor) ? '✓' : '+'}</button><br/>
              {chosenVendors.includes(vendor) || Object.keys(props.costAdded).includes(vendor) ?
                (props.costAdded[vendor] === undefined ? <div className="priceForm">
                  $<input onChange={(e) => setCost(Number(e.target.value) || 0)} placeholder="Price" size="12"/>
                  <button className="addPrice" onClick={() => addCost(vendor)}>Add</button>
                </div> : <div className="priceForm">{props.formatter.format(props.costAdded[vendor])}<div className="addPrice" onClick={() => editCost(vendor)}>Edit</div></div>) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Vendors;