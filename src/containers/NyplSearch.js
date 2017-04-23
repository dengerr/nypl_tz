import React from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import Grid  from 'react-bootstrap/lib/Grid'
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem  from 'react-bootstrap/lib/NavItem'
import '../lib/bootstrap.css'

import NyplSearchResultRow from '../components/NyplSearchResultRow'
import NyplSearchDetails from '../components/NyplSearchDetails'
import {bindActionCreators} from "redux"
import * as searchActions from '../actions/NyplSearchActions'

class NyplSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      q: "cats",
      result: [],
      details: ['default'],
      currentUuid: null,
      imgUrl: null,
    }

  }

  search() {
    this.setState({result: []})
    $.get('/nypl/search.json', {
      q: this.state.q,
    }, data => {
      let result = data.nyplAPI.response.result || []
      this.setState({result: result})
    })
  }

  updateQuery(e) {
    this.setState({q: e.target.value})
  }

  openDetails(obj) {
    $.get('/nypl/details.json', {
      apiItemDetailURL: obj.apiItemDetailURL,
      uuid: obj.uuid
    }, data => {
      let result = data.nyplAPI.response
      console.log(data, result)
      this.setState({
        details: result,
        imgUrl: result.root_captures.capture[0].itemLink.$,
      })
    })
  }

  render() {
    return (
      <div>

        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <span>NYPL Example</span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
        <Grid>
          <input type="text" value={this.state.q} onChange={::this.updateQuery}/>
          <button onClick={::this.search}>Search</button>
          <div className="row">
            <div className="col-xs-6">
              <ul className="list-group">
                {this.state.result.map((object, i) => <NyplSearchResultRow obj={object} key={i} openDetails={::this.openDetails} />)}
              </ul>
            </div>
            <div className="col-xs-6">
              <p>{this.state.imgUrl}</p>
            </div>
          </div>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    q: state.searchQuery,
    result: state.searchResults,
    details: state.searchDetails,
    currnetUuid: state.currentUuid,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NyplSearch)
