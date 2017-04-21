import React from 'react'

class NyplSearchDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      details: props.details,
    }
  }

  render(){
    return (
      <p>{this.props.currentUuid}</p>
    )
  }
}

export default NyplSearchDetails
