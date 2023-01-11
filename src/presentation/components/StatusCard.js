function StatusCard(props) {
  const { status, statsNumber, imgUrl } = props;

  return (
    <div className={"status-container "}>
      <h2>{status + " " + statsNumber}</h2>
      <img src={imgUrl} alt="" />
    </div>
  );
}

export default StatusCard;
