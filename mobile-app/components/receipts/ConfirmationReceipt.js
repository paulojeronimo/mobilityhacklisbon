import "../../css/receipts.scss"
import Router from 'next/router'

export default class extends React.Component {

  checkConfirmation() {
    const { vin, hash, blockId } = this.props.ecuData;
    return  <div className='confirmation-badge'>
      <img src="/static/ecu-ok-badge.png" alt="Confirmed" />
    </div>
  }

  confirmationUrl() {
    const { id } = this.props.ecuData;
    return `http://site.com?id=${id}`
  }
  confirmationBadge() {
    const { id } = this.props.ecuData;
    return `<a class="ecu-badge" href="http://site.com?id=${id}">Data vonfirmation</a> <script async src="https://site.com/widgets.js" charset="utf-8"></script>`
  }

  shareComponent() {
    return <div className="share-area">
      <h2>Share this reading</h2>
      <fieldset>
        <label>URL</label>
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={this.confirmationUrl()} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Copy</button>
          </div>
        </div>
        <label>Badge</label>
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={this.confirmationBadge()} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Copy</button>
          </div>
        </div>
      </fieldset>
    </div>
  }

  readAgain() {
    Router.push('/')
  }

  render() {
    const {
      vin,
      kilometers,
      consumption,
      hash,
      createdAt,
      transactionId,
      blockId
    } = this.props.ecuData;

    const txHref = `https://rinkeby.etherscan.io/tx/${transactionId}`
    const blockHref = `https://rinkeby.etherscan.io/block/${blockId}`


    return <div className="receipt">
      {this.checkConfirmation()}
      <br/>
      <dl>
        <dt>VIN</dt>
        <dd>{vin}</dd>

        <dt>Consumption</dt>
        <dd>{consumption}</dd>

        <dt>Km</dt>
        <dd>{kilometers}</dd>

        <dt>Validation Hash</dt>
        <dd>{hash}</dd>

        <dt>Created At</dt>
        <dd>{createdAt}</dd>

        <dt>Transation Address</dt>
        <dd><a href={txHref}>{transactionId}</a></dd>

        <dt>Block Address</dt>
        <dd><a href={blockHref}>{blockId}</a></dd>
      </dl>
      <hr />
      {this.shareComponent()}
      <hr />
      <div className="actions">
        <button type="button" className="btn btn-success" onClick={this.readAgain}>Read again</button>
      </div>
    </div>
  }
}
