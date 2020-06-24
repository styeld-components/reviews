import React from 'react';

const Scores = (props) => (
  <tbody>
    <tr>
      <td className="scoreCol1">
        Cleanliness
        <span className="scoreCell">
          {props.cleanliness}
        </span>
        <div id="scoreBar">
          <div id="scoreRating" style={{ width: JSON.stringify(((Number(props.cleanliness)) / 5) * 100) + '%' }} />
        </div>
      </td>
      <td className="scoreCol2">
        Accuracy
        <span className="scoreCell">
          {props.accuracy}
        </span>
        <div id="scoreBar">
          <div id="scoreRating" style={{ width: JSON.stringify(((Number(props.accuracy)) / 5) * 100) + '%' }} />
        </div>
      </td>
    </tr>
    <tr>
      <td className="scoreCol1">
        Communication
        <span className="scoreCell">
          {props.communication}
        </span>
        <div id="scoreBar">
          <div id="scoreRating" style={{ width: JSON.stringify(((Number(props.communication)) / 5) * 100) + '%' }} />
        </div>
      </td>
      <td className="scoreCol2">
        Location
        <span className="scoreCell">
          {props.location}
        </span>
        <div id="scoreBar">
          <div id="scoreRating" style={{ width: JSON.stringify(((Number(props.location)) / 5) * 100) + '%' }} />
        </div>
      </td>
    </tr>
    <tr>
      <td className="scoreCol1">
        Check-in
        <span className="scoreCell">
          {props.checkIn}
        </span>
        <div id="scoreBar">
          <div id="scoreRating" style={{ width: JSON.stringify(((Number(props.checkIn)) / 5) * 100) + '%' }} />
        </div>
      </td>
      <td className="scoreCol2">
        Value
        <span className="scoreCell">
          {props.value}
        </span>
        <div id="scoreBar">
          <div id="scoreRating" style={{ width: JSON.stringify(((Number(props.value)) / 5) * 100) + '%' }} />
        </div>
      </td>
    </tr>
  </tbody>
);

export default Scores;
