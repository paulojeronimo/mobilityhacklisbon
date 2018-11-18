import "../css/loading.scss"

const Loading = (props) => (
  <div className="loading-area">
    <h2>Loading</h2>
    <div className="lds-css ng-scope">
      <div style={{width:'100%', height:'100%'}} className="lds-eclipse"><div></div></div>
    </div>
    <p>
      We're connecting to the Bluetooth Interface
    </p>
  </div>
)

export default Loading
