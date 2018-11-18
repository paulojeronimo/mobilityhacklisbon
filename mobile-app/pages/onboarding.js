import React from 'react'
import Router from 'next/router'
import Layout from "../components/Layout";
import Loading from "../components/Loading";

import "../css/onboarding.scss"

export default class extends React.Component {

  constructor (props) {
    super(props)

    this.saveAndGo = this.saveAndGo.bind(this);
    this.state = { }
  }

  componentDidMount() {
    this.checkUserOnWebStorage();
  }

  checkUserOnWebStorage() {
    const ecuUser = window.localStorage.getItem("ecuUser")
    if (ecuUser) {
      return Router.push('/')
    }
  }
  saveAndGo() {
    const { carName, licencePlate, userName } = this;
    if (carName.value.length > 0 && licencePlate.value.length > 0 && userName.value.length > 0) {
      return this.letsGo()
    }
    alert('errors')
  }

  letsGo() {
    const { carName, licencePlate, userName, vin } = this

    const data = {
      carName: carName.value,
      licencePlate: licencePlate.value,
      userName: userName.value,
      vin: vin.value
    }

    window.localStorage.setItem('ecuUser', JSON.stringify(data))
    Router.push('/')
  }

  render () {
    const { loading } = this.state;
    return (
      <Layout>
        <div className="onboarding">
          <h2>Welcome to the ECU readings</h2>
          <p>With our app you'll be able to store your vehicle information on the Blockchain</p>
          <fieldset>
            <label>Your Vehicle Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Merdeces EQ"
              ref={carName => this.carName = carName}/>
            <label>Licence Plate</label>
            <input
              type="text"
              className="form-control"
              placeholder="BC C0 0L"
              ref={licencePlate => this.licencePlate = licencePlate}/>
            <label>VIN</label>
            <input
              type="text"
              className="form-control"
              placeholder="1GNEK13ZX3R298984"
              ref={vin => this.vin = vin}/>
            <label>Your Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Turanga Leela"
              ref={userName => this.userName = userName}/>
          </fieldset>
          <hr />
          <div className="actions">
            <button type="button" className="btn btn-primary" onClick={this.saveAndGo}>Start Now</button>
          </div>
        </div>
      </Layout>
    )
  }
}
