import React from 'react'
import Router from 'next/router'
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import moment from 'moment';

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      readings: []
    }
  }


  checkUserOnWebStorage() {
    const ecuUser = window.localStorage.getItem("ecuUser")
    if (ecuUser) {
      return this.setState(
        { ecuUser: JSON.parse(ecuUser) },
        () => { this.fetchListing(this.state.ecuUser) }
      )
    }
    return Router.push('/onboarding')
  }

  fetchListing(ecuUser) {
    const url = `http://localhost:8080/readings/${ecuUser.vin}`

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(dd => this.setState({
      loading: false,
      readings: dd
    }))
  }

  componentDidMount() {
    this.checkUserOnWebStorage();
  }

  renderLoading() {
    return <Loading />
  }

  renderTableBody() {
    const { readings } = this.state;
    if (readings.length == 0) {
      return(
        <tr>
          <th colSpan="3">No readings yet !</th>
        </tr>
      )
    }

    return readings.map((item) => (
      <tr>
        <td>{moment(item.timestamp, moment.ISO_8601).format('DD-MM-YY HH:mm')}</td>
        <td>{item.kilometers}</td>
      </tr>
    ))
  }
  renderListing() {
    return <table className="table">
    <thead>
      <tr>
        <th>DATE</th>
        <th>KM</th>
      </tr>
    </thead>
    <tbody>
      {this.renderTableBody()}
    </tbody>
  </table>
  }

  viewIndex() {
    Router.push('/')
  }

  render () {
    const { loading } = this.state;
    return (
      <Layout>
        <h2>Past Readings</h2>
        <br/>
        <div className='readings initial-space'>
          {loading && this.renderLoading()}
          {!loading && this.renderListing()}
        </div>
        <br/>
        <div>
          <button
            className="btn btn-primary"
            onClick={this.viewIndex}>Home</button>
        </div>
      </Layout>
    )
  }
}
