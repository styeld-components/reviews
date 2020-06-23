import React from 'react';

const Scores = (props) => (
  <div>
    <div>
      Cleanliness {props.cleanliness}
    </div>
    <div>
      Accuracy {props.accuracy}
    </div>
    <div>
      Communication {props.communication}
    </div>
    <div>
      Location {props.location}
    </div>
    <div>
      Check-in {props.checkIn}
    </div>
    <div>
      Value {props.value}
    </div>
  </div>
);

export default Scores;
