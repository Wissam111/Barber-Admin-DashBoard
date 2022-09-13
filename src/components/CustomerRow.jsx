function CustomerRow(props) {
  const { appoint, dateFormat, timeFormat } = props;

  return (
    <tr className="customerow-container">
      <td>{dateFormat(appoint.start_time, "MM/DD/YYYY")}</td>
      <td>{appoint.worker.firstName + " - " + appoint.worker.lastName}</td>
      <td>
        {timeFormat(appoint.start_time) + " - " + timeFormat(appoint.end_time)}
      </td>
      <td>{appoint.customer.firstName + " - " + appoint.customer.lastName}</td>
      <td>
        <button>MoreInfo</button>
      </td>
    </tr>
  );
}

export default CustomerRow;
