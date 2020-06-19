import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'neat'
    };
  }

  render() {
    return(
      <div>
        <h3>{this.state.value}</h3>
      </div>
    );
  }
}

export default App;
