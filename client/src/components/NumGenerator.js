import React from 'react';

class NumGenerator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        min: 10,
        max: 60,
        number: 1
      }
    }
  
    componentDidMount() {
     this.setState({ number: this.generateNumber(this.state.min, this.state.max)})
    }
    
    generateNumber = (min, max) => {
      return Math.floor(Math.random()*(max-min+1)+min)
    }
    
    render() {
      return (
          <span>{ this.state.number }</span>
      );
    }
  }

  export default NumGenerator