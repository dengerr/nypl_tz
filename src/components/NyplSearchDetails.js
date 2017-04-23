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
      <div>
        <p>test</p>
        <p>{this.props.currentUuid}</p>
        <p>{this.props.imgUrl}</p>
      </div>
    )
  }
}

export default NyplSearchDetails
