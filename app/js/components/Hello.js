import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Neuron!</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <Hello/>,
  document.getElementById("app")
)
