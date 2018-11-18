import "../../css/receipts.scss"

const ReadingReceipt = (props) => {
  const { kilometers, consumption } = props.ecuData;
  const { vin, userName, carName, licencePlate } = props.ecuUser;
  return <div className="receipt">
    <dl>
      <dt>Vehicle</dt>
      <dd>{carName} ({licencePlate})</dd>

      <dt>VIN</dt>
      <dd>{vin}</dd>

      <dt>Consumption</dt>
      <dd>{consumption}</dd>

      <dt>Km</dt>
      <dd>{kilometers}</dd>
    </dl>
  </div>
}

export default ReadingReceipt
