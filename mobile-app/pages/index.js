import React from 'react'
import Router from 'next/router'
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import ReadingReceipt from "../components/receipts/ReadingReceipt";

import "../css/base.scss"

export default class extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      connecting: true,
      ecuData: {
        kilometers: '34599'
      }
    }

    this.handleSaveButton = this.handleSaveButton.bind(this);
  }

  checkUserOnWebStorage() {
    const ecuUser = window.localStorage.getItem("ecuUser")
    if (ecuUser) {
      return this.setState({ ecuUser: JSON.parse(ecuUser) })
    }
    return Router.push('/onboarding')
  }

  componentDidMount() {
    this.checkUserOnWebStorage();

    setTimeout(() => {
      this.receiveBluetoothData()
    }, 1000);
  }

  receiveBluetoothData() {
    this.setState({
      connecting: false,
      ecuData: {
        kilometers: new String(Math.round( (parseInt(this.state.ecuData.kilometers) + (1 + Math.random() * 100) % 50) * 100) / 100 ),
        consumption: new String( Math.round( (5 + (Math.random() * 100 % 5)) * 100) / 100 )
      }
    })
  }

  renderConnecting() {
    return <Loading />
  }

  viewReadings() {
    Router.push('/readings')
  }

  renderWriting() {
    return <div>
      <div className="reading-header">
      <span className="badge badge-success badge-pill float-right">Connected</span>
        <h2>Reading received</h2>
        <ReadingReceipt ecuData={this.state.ecuData} ecuUser={this.state.ecuUser} />
      </div>
      <div className="actions">
        <button
            className="btn btn-primary readings"
            onClick={this.viewReadings}>View readings</button>
        <button
          className="btn btn-primary"
          onClick={this.handleSaveButton}>Save</button>
      </div>
    </div>
  }

  handleSaveButton() {
    const { kilometers, consumption } = this.state.ecuData;

    const url = `http://localhost:8080/readings/${this.state.ecuUser.vin}`
    const data = {
      kilometers,
      consumption
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then(function(response) {
      console.log('saved');

      response.text().then((data) => {
        const dd = JSON.parse(data)
        console.log('received', dd);
        Router.push('/receipt?id='+dd.id)
      });

    }, function(error) {
      console.log('error saving');
    })
  }

  render () {

    const { connecting } = this.state;

    return (
      <Layout>
        <div className='index initial-space'>
          {connecting && this.renderConnecting()}
          {!connecting && this.renderWriting()}
        </div>
      </Layout>
    )
  }
}
