import React from 'react'
import $ from 'jquery'

class NyplSearchResultRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = props.obj
  }

  openDetails() {
    this.props.openDetails(this.props.obj)
    return
    console.log(this.props)
    $.get('/nypl/search.json', {
      uuid: this.state.uuid
    }, data => {
      let result = data.nyplAPI.response.result
      // this.setState({details: result})
      // this.props.details[0] = result
    })
  }

  render() {
    return (
      <li className="list-group-item" onClick={::this.openDetails}>{this.state.title}</li>
    )
  }
}

export default NyplSearchResultRow
