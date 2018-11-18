import React from 'react'
import Router from 'next/router'
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import ConfirmationReceipt from "../components/receipts/ConfirmationReceipt";

export default class extends React.Component {

  constructor (props) {
    super(props)

    this.state = { loading: true }
  }

  checkUserOnWebStorage() {
    const ecuUser = window.localStorage.getItem("ecuUser")
    if (ecuUser) {
      return this.setState(
        { ecuUser: JSON.parse(ecuUser) },
        () => { this.fetchReceiptData() }
      )
    }
    return Router.push('/onboarding')
  }

  componentDidMount() {
    this.checkUserOnWebStorage();
  }

  fetchReceiptData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const url = `http://localhost:8080/reading/${id}`

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
      ecuData: {
        blockId: dd.block || 'DUMY123',
        consumption: dd.consumption || '1222',
        createdAt: dd.createdAt || '23-3-2010',
        hash: dd.hash || '0xdsaodksasd223',
        id: id,
        kilometers: dd.kilometers || '2323',
        transactionId: dd.txHash || '0xasd232323',
        vin: dd.vin || 'A232323jksjdksdKJ'
      }
    }))
  }

  renderReadData() {
    if (this.state.loading) return

    const { vin, kilometers, consumption, hash, createdAt, transactionId, blockId } = this.state.ecuData;

    return <ConfirmationReceipt ecuData={this.state.ecuData}/>
  }

  renderLoading() {
    return <Loading />
  }

  render () {
    const { loading } = this.state;
    return (
      <Layout>
        <div className='initial-space'>
          {loading && this.renderLoading()}
          {!loading && this.renderReadData()}
        </div>
      </Layout>
    )
  }
}
